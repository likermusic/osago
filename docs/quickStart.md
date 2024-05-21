## Quick Start

### `Set up npm auth if you yet to do it`

First of all go to https://github.com/settings/tokens and make new access token with all "repo" checkboxes and "read:packages" checkbox included.
Save that token as you'll need it just in few moments and you wont be able to see him again.

Then execute following commands:

```
rm ~/.npmrc
npm login --registry=https://npm.pkg.github.com --scope=@sravni
> Username: {your_username}
> Password: {your_token}
> Email: {your_е-mail}
```

login and password are domain/ActiveDirectory ones without the email, for example
'vasily.pupkin'.

OR

You can execute this if you have not logged already:

```
./npm-ci-set-up-auth.sh -t {your_token_here}
```

**Clone repo and install**

```
git clone git@github.com:sravni/<repo-name>.git <directory-name>
cd <directory-name>
yarn
```

### `env`

Create .env file in root. Copy settings from .env.example file and paste in .env.

Client data: https://vault.yc.dev.infra.sravni-team.ru/ui/vault/secrets/secrets/show/osago/osago-frontend/auth


Method: OIDC

Role: OSAGO


![image](https://github.com/sravni/osagoinsurance-frontend/assets/95238714/19be23f6-2742-4870-bc03-a33d5c64fb80)


### `API types`

Updated type generation for the server by running shell scripts
`yarn updateApiTypes`

### `yarn dev`

Runs the project in development mode.
You can view your application at `http://localhost:9001/osago/`

The page will reload if you make edits.

### `yarn build`

Builds the app for production to the build folder.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

### `yarn start`

Runs the compiled app in production.

You can again view your application at `http://localhost:9001`

### `rs`

If your application is running, and you need to manually restart your server, you do not need to completely kill and rebundle your application. Instead you can just type `rs` and press enter in terminal.

## Environment Variables

### Build-time Variables

**The following environment variables are embedded during the build time.**

| Name                            | Description                  | Default                           |
| :------------------------------ | :--------------------------- | :-------------------------------- |
| `process.env.SERVICE_NAME`      | Service name                 | `sravni-service`                  |
| `process.env.PORT`              | Server port                  | `9001`                            |
| `process.env.ENV`               | Runtime environment          | `development`                     |
| `process.env.NODE_ENV`          | Environment                  | `development`                     |
| `process.env.IMAGE_VERSION`     | Build version                | `dev`                             |
| `process.env.WEB_PATH`          | Web http path                | `localhost:9001`                  |
| `process.env.REDIS`             | Redis path                   | `//localhost:6379`                |
| `process.env.CONSUL`            | Consul path                  | `consul.master.qa.sravni-team.ru` |
| `process.env.JAEGER_AGENT_HOST` | Jaeger tracing host          | `jaeger-agent.default`            |
| `process.env.JAEGER_AGENT_PORT` | Jaeger tracing port          | `6832`                            |
| `process.env.APIGATEWAY`        | apigateway service path      |                                   |
| `process.env.GATEWAY`           | node.js gateway service path |                                   |
| `process.env.PUBLIC`            | node.js public gateway path  |                                   |
| `process.env.LOCATIONS`         | locations service path       |                                   |

You can create your own custom build-time environment variables.

[Return to main README](../README.md)
