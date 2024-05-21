/** @deprecated
 * используем пока не съедем полностью со старого локал стораджа в т.ч. с ВЛ!!!
 * вычищаем у пользователей через src/client/shared/lib/localStorageMappers/fixAndMapOldClientData.ts
 * */
export interface IClientDataState extends IClientDataCar, IClientDataPeriod {
  drivers: IClientDataDriver[];
  insurerOwner: ClientDataInsurerOwnerType;
  selectedDrivers: ClientDataSelectedDriversType;
  unlimitedDrivers: boolean;
  auto: IClientDataAuto;
  contacts: IClientDataContacts;
  lastPolicy?: IClientDataLastPolicy;
  vehicleCategory: TVehicleCategory;
  policyLink?: IClientDataPolicyLink;
  policyDraftLink?: string;
  upsaleDraftLink?: string;
  upsaleRulesLink?: string;
  promocode?: string;
}

type TCarIdentifierTypes = 'bodyNumber' | 'chassisNumber' | 'vin';

type TModification = {
  fullName: string;
  shortName: string;
};

interface ICarParameters {
  bodyNumber: string;
  brand: string;
  carIdentifier: TCarIdentifierTypes;
  chassisNumber: string;
  model: string;
  modification: TModification | null;
  power: string;
  vin: string;
  year: string;
}
interface IClientDataCar {
  bodyNumber: ICarParameters['bodyNumber'];
  brand: ICarParameters['brand'];
  brandId: number;
  carIdentifier: ICarParameters['carIdentifier'];
  chassisNumber: ICarParameters['chassisNumber'];
  model: ICarParameters['model'];
  modelId: number;
  modification: ICarParameters['modification'];
  power: ICarParameters['power'];
  vin: ICarParameters['vin'];
  year: ICarParameters['year'];
}

interface IClientDataPeriod {
  policyStartDate: string;
  recommendedPolicyStartDate: string;
}

interface IUser {
  birthDate: string;
  firstName: string;
  lastName: string;
  middleName: string;
}

interface IClientDataDriver extends IUser {
  drivingLicense: string;
  experienceStartDate: string;
  hasOldLicense: boolean;
  oldDrivingLicense?: string;
  oldLastName?: string;

  /**
   * Устарел, используем для корректного восстановления experienceStartDate
   * когда в локал сторадже только experienceStartYear так как раньше была возможность сохранить только год
   * @deprecated
   */
  experienceStartYear?: string;
}

type ClientDataInsurerOwnerType =
  | {
      insurerIsOwner: true;
      user: IClientDataUser;
    }
  | {
      insurerIsOwner: false;
      insurer: IClientDataUser;
      owner: IClientDataUser;
    };

interface ICleanAddress {
  source?: {
    data: {
      fias_level: string;
      region: string;
    };
  };
  value: string;
}

/** @deprecated **/
export interface IClientDataUser extends IClientDataBasicUser {
  address: ICleanAddress;
  addressFlat: string;
}

interface IClientDataPassport {
  passportNumber: string;
  passportObtainingDate: string;
}

interface IClientDataBasicUser extends IUser, IClientDataPassport {}
type ClientDataSelectedDriversType = boolean[];

type TCarDocument = 'epts' | 'pts' | 'sts';

interface IClientDataCarDocument {
  document: TCarDocument;
  documentObtainingDate: string;
  pts: string;
  sts: string;
  epts: string;
}

interface IClientDataAuto extends IClientDataCarDocument {
  vehicleNumber: string;
}

interface IClientDataContacts {
  email: string;
  phone: string;
}

interface IClientDataPolicyLink {
  policyNumber: string;
  archiveLink: string | null;
  policyLink: string | null;
}

interface IClientDataLastPolicy {
  endDate: string;
  companyName: string;
}
type TVehicleCategory = 'A' | 'B';
