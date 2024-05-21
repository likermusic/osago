## Генерация пары ключей RSA в PKCS #8 формате
- To generate a new private/public RSA keypair read this [manual](https://kb.vander.host/security/how-to-generate-rsa-public-and-private-key-pair-in-pkcs8-format/). The private key needs to be used in frontend to decrypt token:
```
openssl genrsa -out keypair.pem 2048
openssl rsa -in keypair.pem -pubout -out publickey.crt
openssl pkcs8 -topk8 -inform PEM -outform PEM -nocrypt -in keypair.pem -out pkcs8.key

// if you need to restore *.pem from *.key
openssl rsa -in pkcs8.key -text > private.pem
```

## Генерация своего JWE токена


- Сгенерировать новый gradle Java проект (можно в intellij idea)
- Добавить зависимости в gradle.build:
```
dependencies {
   testImplementation platform('org.junit:junit-bom:5.9.1')
   testImplementation 'org.junit.jupiter:junit-jupiter'
   implementation 'com.nimbusds:nimbus-jose-jwt:9.31'
   implementation 'org.bouncycastle:bcprov-jdk18on:1.76'
   implementation 'org.bouncycastle:bcpkix-jdk18on:1.76'
}
```
- Запустить программу с соответствующими парами публичный/приватный ключ. Данные для токена могут быть изменены в функции`getFilledTokenData`. В методе expirationTime можно изменить время жизни токена
```
import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.RSAEncrypter;
import com.nimbusds.jose.crypto.RSASSASigner;
import com.nimbusds.jose.crypto.bc.BouncyCastleProviderSingleton;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;

import java.math.BigInteger;
import java.security.KeyFactory;
import java.security.NoSuchAlgorithmException;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.RSAPublicKeySpec;
import java.util.Base64;
import java.util.Date;

import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.*;
import com.nimbusds.jose.jwk.*;
import com.nimbusds.jose.jwk.gen.*;
import com.nimbusds.jwt.*;


// Press Shift twice to open the Search Everywhere dialog and type `show whitespaces`,
// then press Enter. You can now see whitespace characters in your code.
public class Main {
    public static String privateKey = "-----BEGIN PRIVATE KEY-----\n" +
            "MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDbpiFteLunic25\n" +
            "APUhchJlPBypA+t6TbbfDXBIHm9ozQTpQ7I6Ju/8gu22FJ+kBC9SpZnEM4OSWMNl\n" +
            "xjcXe7uLBwtqIOfkbAL41KMRZwI2jcoN5nGH++//tmIsOlK5wo8IR9Nj6SF5RM+j\n" +
            "kiesgFbLnjhZQibPpSAfniZhZyGHkg1joZH+7Ly+2nE7E4eQLN0xlMz0WpXcpGig\n" +
            "9aQOKkjcRttrT3/HRz3Vbsj0mc4tUvgEyTG2iv1YLJ8bsgDuZGEg5GxPr2hNbPlh\n" +
            "CDlo6vCwdT2qRTsYnZP3DOjb8iV0NGrmaOm9NT1qI27ONGKMWnj3o5xIPrJ3rk/E\n" +
            "JedntD4fAgMBAAECggEAe7Ru8yaiGVOFJ4KgjDugnJ9kTNRGVNVb/vekmxl5CX8e\n" +
            "GvnjcNjpJD/g/UFUP52TwWo+1b9lhJC1S6Z89J7dGwnWpejucTlb2yR2yqBHIM5u\n" +
            "U7HLkxiTLGNdmycl3DT1NWauaYCtN41HnAn+iiqlt3vepHabQSrwkp4RY54fxiey\n" +
            "UwXgQjUBStDnM8Ev/b09OHJvwmXyPPAOcWRoTWjXhXi4BZsEkGYpWz+wk2x1IUu/\n" +
            "s837WtuB6t8gZF3QGLVepbFS98qf9E21aCNcM3TL5Dc+xtsuJ2iPMkewKloi6XFM\n" +
            "qvd8K+X7o/LB8wni4MCZ7CDzb2UbcZaNZkhcFwnDYQKBgQD2UEJdm3GN8l2fYr4s\n" +
            "rh3X2TceP1+AZ1h8ldgYFbIupJqYP4to+sxU8mR8BQynPI/osj8QFuv6/ZBN+1f8\n" +
            "JFKOSHle+5hCi0mZxPGgrxmQ/wHhldex/pxcFy/wiZsLvVPKnfDHbB615Hk+JIZf\n" +
            "1tdUBQdIBD2YDPOJ4nk+EeM1uQKBgQDkSW2UoQjUN/aVlRTP8+ciKJvFLFHt6wXK\n" +
            "qIm/SGczS4yY2nw0kjpzPwBlvokx4wlv9Hb3dkOThHQ0lQm2giYxCjejsEwxtY8a\n" +
            "J+F3UULHSwBJvalUNIWzltnU+gEBMTy4AGtSm6WMbuKJgv43dU3qFeTWxF4+ulau\n" +
            "xATI93L+lwKBgQDnXcx5ESJBK4A1zxLD9Wmi7y6PAwg6HNlJbZdmSDrvBT8R896H\n" +
            "5c05ndY1iKiyDnk/Iu+JtX5EbRm3pninJ5dEf19CkSIcn6mq/wvY26EwSdkChTXu\n" +
            "xDMrbbxiPV+eT2D92g3pxO2z/cDFVpnCPJRXH8IPK6yPvtqkkk9AtpyuQQKBgQCI\n" +
            "IcVn0VO7gZfZAWrEy1R0iTTCsrg0oWb1v+VMnPd1nkK8T+WrT9vtJ4+sHKAhkJrr\n" +
            "GSPsU6jeiijlxk5heGEf81DUmugE6JjqZwfLqDijMXV9g806+osUWguSNnds55im\n" +
            "vRFC1LA2+1S53dSM67XHtsCc1cLBs0rHsvqLgQwhBwKBgQDbxTXZtYe39EylUbp2\n" +
            "OCZ1dyDnO+GX5VHHrrA8bXe21Pztik+XixSKD78+MnWJpxYN8lAWfkTbZbjoOkma\n" +
            "I/JuCuYptdnmX8sEHkXsAuP9V1+hKWCqLRrWnxBi7STSr+oi1ENuXA+3wKZqYUhJ\n" +
            "pCxbdsZFTKNBsCrB4NYN12Le5Q==\n" +
            "-----END PRIVATE KEY-----";
    public static String publicKey = "-----BEGIN PUBLIC KEY-----\n" +
            "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA26YhbXi7p4nNuQD1IXIS\n" +
            "ZTwcqQPrek223w1wSB5vaM0E6UOyOibv/ILtthSfpAQvUqWZxDODkljDZcY3F3u7\n" +
            "iwcLaiDn5GwC+NSjEWcCNo3KDeZxh/vv/7ZiLDpSucKPCEfTY+kheUTPo5InrIBW\n" +
            "y544WUImz6UgH54mYWchh5INY6GR/uy8vtpxOxOHkCzdMZTM9FqV3KRooPWkDipI\n" +
            "3Ebba09/x0c91W7I9JnOLVL4BMkxtor9WCyfG7IA7mRhIORsT69oTWz5YQg5aOrw\n" +
            "sHU9qkU7GJ2T9wzo2/IldDRq5mjpvTU9aiNuzjRijFp496OcSD6yd65PxCXnZ7Q+\n" +
            "HwIDAQAB\n" +
            "-----END PUBLIC KEY-----";
    private static class PersonalData {
        public String firstName;
        public String lastName;
        public String middleName;
        public String gender;
        public String citizenship;
        public String passportNumber;
        public String passportIssuerCode;
        public String passportIssueDate;
        public String passportIssuer;
        public String birthDate;
        public String birthPlace;
        public String registrationAddress;
        public String actualAddress;
        public String phone;
        public String email;
        public String inn;
        public String snils;
    }
    private static class TokenData {
        public String clientId;
        public PersonalData personalData;
    }

    static RSAKey rsaJWK;
    static RSAPublicKey rsaPublicJWK;
    static RSAPrivateKey rsaPrivateJWK;
    static {
        try {
            rsaJWK = new RSAKeyGenerator(2048)
                    .keyID("123")
                    .generate();
            //rsaPublicJWK = rsaJWK.toRSAPublicKey();
            //rsaPrivateJWK = rsaJWK.toRSAPrivateKey();
            rsaPublicJWK = RSAKey.parseFromPEMEncodedObjects(publicKey).toRSAKey().toRSAPublicKey();
            rsaPrivateJWK = RSAKey.parseFromPEMEncodedObjects(privateKey).toRSAKey().toRSAPrivateKey();
        } catch (JOSEException e) {
            throw new RuntimeException(e);
        }
    }

    public static SignedJWT signByPrivateKey(TokenData tokenDataRequest) throws JOSEException {
        JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder()
                .audience("urn:example:audience")
                .issuer("'urn:example:issuer")
                //.subject(serviceProperties.getCabPrivateClaimSub())
                // тут можно изменить срок жизни токена сейчас 10 минут
                .expirationTime((new Date(new Date().getTime() + 10 * 60 * 1000)))
                .claim("tokenData", tokenDataRequest)
                .build();

        System.out.println("JSON object\n" + jwtClaimsSet.toPayload());
        PrivateKey privateKey = rsaPrivateJWK;
        JWSSigner signer = new RSASSASigner(privateKey);
        signer.getJCAContext().setProvider(BouncyCastleProviderSingleton.getInstance());
        SignedJWT signedJWT = new SignedJWT(new JWSHeader(JWSAlgorithm.PS256), jwtClaimsSet);
        signedJWT.sign(signer);
        System.out.println("JWT signed successful\n" + signedJWT);
        //log.debug("JWT signed successful");
        return  signedJWT;
    }

    public static String encryptByPublicKey(SignedJWT signedJWT) throws JOSEException {
        JWEHeader header = new JWEHeader.Builder(JWEAlgorithm.RSA_OAEP_256, EncryptionMethod.A128CBC_HS256)
                .contentType("JWT")
                .build();
        RSAPublicKey publicKey = rsaPublicJWK;
        RSAEncrypter encrypter = new RSAEncrypter(publicKey);
        JWEObject jweObject = new JWEObject(header, new Payload(signedJWT));
        jweObject.encrypt(encrypter);
        //log.debug("JWE encrypt successful");
        System.out.println("JWE encrypt successful");
        return jweObject.serialize();
    }

    public static String getKey(BigInteger modulus, BigInteger exponent) throws InvalidKeySpecException, NoSuchAlgorithmException {
        KeyFactory f = KeyFactory.getInstance("RSA");
        BigInteger modulusInner = new BigInteger(String.valueOf(modulus), 16);
        BigInteger exp = new BigInteger(String.valueOf(exponent), 16);
        RSAPublicKeySpec spec = new RSAPublicKeySpec(modulusInner, exp);
        PublicKey pub = f.generatePublic(spec);
        byte[] data = pub.getEncoded();

        return new String(Base64.getEncoder().encode(data));
    }

    public static TokenData getFilledTokenData() {
        TokenData data = new TokenData();
        data.personalData = new PersonalData();

        data.clientId = "919191";
        data.personalData.firstName = "Григорий";
        data.personalData.lastName = "Перельман";
        data.personalData.middleName = "Яковлевич";
        data.personalData.gender = "m";
        data.personalData.citizenship = "643";
        data.personalData.passportNumber = "4507123456";
        data.personalData.passportIssueDate = "2011-06-21";
        data.personalData.passportIssuer = "Отделением УФМС России по Санкт-Петербургу в Московском р-не гор. Санкт-Петербурга";
        data.personalData.passportIssuerCode = "780-047";
        data.personalData.birthDate = "1966-06-13";
        data.personalData.birthPlace = "гор Ленинград";
        data.personalData.registrationAddress = "г Санкт-Петербург, ул Мира, д 69, кв 1";
        data.personalData.actualAddress = "г Санкт-Петербург, ул Мира, д 69, кв 1";
        data.personalData.phone = "79851234567";
        data.personalData.email = "perelman@mail.ru";
        data.personalData.inn = "123456789012";
        data.personalData.snils = "123-456-789 00";

        return data;
    }

    public static void main(String[] args) throws JOSEException, InvalidKeySpecException, NoSuchAlgorithmException {
        TokenData data = getFilledTokenData();

        SignedJWT signedKey = signByPrivateKey(data);
        String jwe = encryptByPublicKey(signedKey);

        //System.out.println("rsaPrivateJWK\n" + rsaPrivateJWK.toString());
        //System.out.println("rsaPublicJWK\n" + rsaPublicJWK.toString());
        System.out.println("public key string\n" + getKey(rsaPublicJWK.getModulus(), rsaPublicJWK.getPublicExponent()));
        System.out.println("private key string\n" + getKey(rsaPrivateJWK.getModulus(), rsaPrivateJWK.getPrivateExponent()));
        System.out.println("jwe\n" + jwe);
    }
}

```
