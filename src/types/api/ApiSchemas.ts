import type { OSAGOGATEWAY_V2_COMPONENTS_API } from '../../generatedDTO';

export declare namespace ApiSchemas {
  //  из свагера просто так не взять, пришлось делать через Capitalize
  export type IAlert = TAlertModelCustom;
  type IOfferTag = TTagModelCustom;
  export type IUpperTag = TUpperTagModelCustom;

  export type TOfferWithCustomTagsAndAlerts = Omit<
    OSAGOGATEWAY_V2_COMPONENTS_API['schemas']['Sravni.OsagoGateway.Service.Core.Polling.Offer'],
    'tags' | 'upperTags' | 'company' | 'alerts'
  > &
    ICustomPropositionTypes;

  type TOmitedOrderInfo = Omit<
    OSAGOGATEWAY_V2_COMPONENTS_API['schemas']['Sravni.OsagoGateway.Service.Orders.Models.OrderInfo'],
    'tags' | 'upperTags' | 'orderStatus' | 'alerts' | 'alert' | 'offer'
  >;

  export type TOrderInfoWithCustomTagsAndAlerts = ICustomOrderInfoTypes & TOmitedOrderInfo;

  interface ICustomPropositionTypes {
    company: ICompanyWithCustomHidden;
    tags?: ApiSchemas.IOfferTag[];
    upperTags?: ApiSchemas.IUpperTag[];
    alerts?: ApiSchemas.IAlert[];
  }

  type ICustomOrderInfoTypes = {
    orderStatus: Capitalize<
      OSAGOGATEWAY_V2_COMPONENTS_API['schemas']['Sravni.OsagoGateway.Service.Orders.Models.OrderStatus']
    >;
    tags?: ApiSchemas.IOfferTag[];
    upperTags?: ApiSchemas.IOfferTag[];
    alerts?: ApiSchemas.IAlert[];
    alert?: ApiSchemas.IAlert;
    offer: TOfferWithCustomTagsAndAlerts;
  };

  type ICompanyWithCustomHidden = Omit<
    OSAGOGATEWAY_V2_COMPONENTS_API['schemas']['Sravni.OsagoGateway.Service.Core.Polling.CompanyInfo'],
    'hidden'
  > &
    IHiddenWithCustomAlertsAndPrice;

  interface IHiddenWithCustomAlertsAndPrice {
    hidden: Omit<
      OSAGOGATEWAY_V2_COMPONENTS_API['schemas']['Sravni.OsagoGateway.Service.Core.Polling.HiddenInfo'],
      'alerts' | 'price'
    > &
      ICustomAlerts &
      IPriceWithCustomFormula;
  }

  interface IPriceWithCustomFormula {
    price: Omit<
      OSAGOGATEWAY_V2_COMPONENTS_API['schemas']['Sravni.OsagoGateway.Service.Core.Polling.PriceRow'],
      'formulaRows'
    > &
      IFormulaRowsWithCustomColor;
  }

  interface IFormulaRowsWithCustomColor {
    formulaRows: Array<
      Omit<OSAGOGATEWAY_V2_COMPONENTS_API['schemas']['Sravni.OsagoGateway.Service.Core.Polling.InternalRow'], 'color'> &
        ICustomColor
    >;
  }

  interface ICustomColor {
    color: Capitalize<OSAGOGATEWAY_V2_COMPONENTS_API['schemas']['Sravni.OsagoGateway.Service.Core.Polling.ColorType']>;
  }
  interface ICustomAlerts {
    alerts: TAlertModelCustom[];
  }

  type TTagModelCustom = Omit<
    OSAGOGATEWAY_V2_COMPONENTS_API['schemas']['Sravni.OsagoGateway.Service.Core.Polling.Tag'],
    'type' | 'color' | 'colorVariant'
  > &
    ICapitalizedType &
    ICapitalizedColor &
    ICapitalizedColorVariant;

  type TUpperTagModelCustom = Omit<
    OSAGOGATEWAY_V2_COMPONENTS_API['schemas']['Sravni.OsagoGateway.Service.Core.Polling.UpperTag'],
    'type' | 'color' | 'colorVariant'
  > &
    ICapitalizedType &
    ICapitalizedColor &
    ICapitalizedColorVariant;

  type TAlertModelCustom = Omit<
    OSAGOGATEWAY_V2_COMPONENTS_API['schemas']['Sravni.OsagoGateway.Service.Core.Polling.AlertModel'],
    'alert' | 'action'
  > &
    ICapitalizedActions &
    ICapitalizedAlert;

  interface ICapitalizedType {
    type?: Capitalize<
      OSAGOGATEWAY_V2_COMPONENTS_API['schemas']['Sravni.OsagoGateway.Service.Core.Polling.OfferTagType']
    >;
  }
  interface ICapitalizedColor {
    color?: Capitalize<OSAGOGATEWAY_V2_COMPONENTS_API['schemas']['Sravni.OsagoGateway.Service.Core.Polling.ColorType']>;
  }
  interface ICapitalizedColorVariant {
    colorVariant?: Capitalize<
      OSAGOGATEWAY_V2_COMPONENTS_API['schemas']['Sravni.OsagoGateway.Service.Core.Polling.ColorVariant']
    >;
  }

  interface ICapitalizedActions {
    action?: Capitalize<
      OSAGOGATEWAY_V2_COMPONENTS_API['schemas']['Sravni.OsagoGateway.Service.Core.Polling.AlertAction']
    >;
  }

  interface ICapitalizedAlert {
    alert?: Capitalize<OSAGOGATEWAY_V2_COMPONENTS_API['schemas']['Sravni.OsagoGateway.Service.Core.Polling.ColorType']>;
  }
}
