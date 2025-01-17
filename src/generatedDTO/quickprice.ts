/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */


export interface paths {
  "/v1/osago/calculate": {
    /** Расчет быстрой цены */
    post: {
      requestBody?: {
        content: {
          "application/json": components["schemas"]["Sravni.QuickPrice.Dto.OsagoQuickPriceQuery"];
          "text/json": components["schemas"]["Sravni.QuickPrice.Dto.OsagoQuickPriceQuery"];
          "application/*+json": components["schemas"]["Sravni.QuickPrice.Dto.OsagoQuickPriceQuery"];
        };
      };
      responses: {
        /** @description Success */
        200: {
          content: {
            "text/plain": components["schemas"]["Sravni.QuickPrice.Dto.OsagoQuickPriceResult"];
            "application/json": components["schemas"]["Sravni.QuickPrice.Dto.OsagoQuickPriceResult"];
            "text/json": components["schemas"]["Sravni.QuickPrice.Dto.OsagoQuickPriceResult"];
          };
        };
        /** @description Bad Request */
        400: {
          content: {
            "text/plain": components["schemas"]["Sravni.Micro.Errors.ErrorModel"];
            "application/json": components["schemas"]["Sravni.Micro.Errors.ErrorModel"];
            "text/json": components["schemas"]["Sravni.Micro.Errors.ErrorModel"];
          };
        };
        /** @description Server Error */
        500: {
          content: {
            "text/plain": components["schemas"]["Sravni.Micro.Errors.ErrorModel"];
            "application/json": components["schemas"]["Sravni.Micro.Errors.ErrorModel"];
            "text/json": components["schemas"]["Sravni.Micro.Errors.ErrorModel"];
          };
        };
      };
    };
  };
  "/v1/osago/calculate-simple": {
    /** Расчет быстрой цены на основе подготовленной таблицы */
    post: {
      requestBody?: {
        content: {
          "application/json": components["schemas"]["Sravni.QuickPrice.Dto.OsagoQuickPriceQuery"];
          "text/json": components["schemas"]["Sravni.QuickPrice.Dto.OsagoQuickPriceQuery"];
          "application/*+json": components["schemas"]["Sravni.QuickPrice.Dto.OsagoQuickPriceQuery"];
        };
      };
      responses: {
        /** @description Success */
        200: {
          content: {
            "text/plain": components["schemas"]["Sravni.QuickPrice.Dto.OsagoQuickPriceResult"];
            "application/json": components["schemas"]["Sravni.QuickPrice.Dto.OsagoQuickPriceResult"];
            "text/json": components["schemas"]["Sravni.QuickPrice.Dto.OsagoQuickPriceResult"];
          };
        };
        /** @description Bad Request */
        400: {
          content: {
            "text/plain": components["schemas"]["Sravni.Micro.Errors.ErrorModel"];
            "application/json": components["schemas"]["Sravni.Micro.Errors.ErrorModel"];
            "text/json": components["schemas"]["Sravni.Micro.Errors.ErrorModel"];
          };
        };
        /** @description Server Error */
        500: {
          content: {
            "text/plain": components["schemas"]["Sravni.Micro.Errors.ErrorModel"];
            "application/json": components["schemas"]["Sravni.Micro.Errors.ErrorModel"];
            "text/json": components["schemas"]["Sravni.Micro.Errors.ErrorModel"];
          };
        };
      };
    };
  };
  "/v1/osago/territorial-coefficients/{address}": {
    /** Получение коэффициента территории */
    get: {
      parameters: {
        path: {
          address: string;
        };
      };
      responses: {
        /** @description Success */
        200: {
          content: {
            "text/plain": components["schemas"]["Sravni.QuickPrice.Dto.OsagoTerritorialCoefficientResult"];
            "application/json": components["schemas"]["Sravni.QuickPrice.Dto.OsagoTerritorialCoefficientResult"];
            "text/json": components["schemas"]["Sravni.QuickPrice.Dto.OsagoTerritorialCoefficientResult"];
          };
        };
        /** @description Bad Request */
        400: {
          content: {
            "text/plain": components["schemas"]["Sravni.Micro.Errors.ErrorModel"];
            "application/json": components["schemas"]["Sravni.Micro.Errors.ErrorModel"];
            "text/json": components["schemas"]["Sravni.Micro.Errors.ErrorModel"];
          };
        };
        /** @description Server Error */
        500: {
          content: {
            "text/plain": components["schemas"]["Sravni.Micro.Errors.ErrorModel"];
            "application/json": components["schemas"]["Sravni.Micro.Errors.ErrorModel"];
            "text/json": components["schemas"]["Sravni.Micro.Errors.ErrorModel"];
          };
        };
      };
    };
  };
  "/v1/osago/base-tariffs/{companyId}/{address}": {
    /** Получение базового тарифа для заданной СК в локации */
    get: {
      parameters: {
        path: {
          companyId: number;
          address: string;
        };
      };
      responses: {
        /** @description Success */
        200: {
          content: {
            "text/plain": components["schemas"]["Sravni.QuickPrice.Dto.OsagoBaseTariffResult"];
            "application/json": components["schemas"]["Sravni.QuickPrice.Dto.OsagoBaseTariffResult"];
            "text/json": components["schemas"]["Sravni.QuickPrice.Dto.OsagoBaseTariffResult"];
          };
        };
        /** @description Bad Request */
        400: {
          content: {
            "text/plain": components["schemas"]["Sravni.Micro.Errors.ErrorModel"];
            "application/json": components["schemas"]["Sravni.Micro.Errors.ErrorModel"];
            "text/json": components["schemas"]["Sravni.Micro.Errors.ErrorModel"];
          };
        };
        /** @description Server Error */
        500: {
          content: {
            "text/plain": components["schemas"]["Sravni.Micro.Errors.ErrorModel"];
            "application/json": components["schemas"]["Sravni.Micro.Errors.ErrorModel"];
            "text/json": components["schemas"]["Sravni.Micro.Errors.ErrorModel"];
          };
        };
      };
    };
  };
  "/v1/osago/base-tariffs/{address}": {
    /** Получение базовых тарифов всех СК в локации */
    get: {
      parameters: {
        path: {
          address: string;
        };
      };
      responses: {
        /** @description Success */
        200: {
          content: {
            "text/plain": components["schemas"]["Sravni.QuickPrice.Dto.OsagoBaseTariffResult"][];
            "application/json": components["schemas"]["Sravni.QuickPrice.Dto.OsagoBaseTariffResult"][];
            "text/json": components["schemas"]["Sravni.QuickPrice.Dto.OsagoBaseTariffResult"][];
          };
        };
        /** @description Bad Request */
        400: {
          content: {
            "text/plain": components["schemas"]["Sravni.Micro.Errors.ErrorModel"];
            "application/json": components["schemas"]["Sravni.Micro.Errors.ErrorModel"];
            "text/json": components["schemas"]["Sravni.Micro.Errors.ErrorModel"];
          };
        };
        /** @description Server Error */
        500: {
          content: {
            "text/plain": components["schemas"]["Sravni.Micro.Errors.ErrorModel"];
            "application/json": components["schemas"]["Sravni.Micro.Errors.ErrorModel"];
            "text/json": components["schemas"]["Sravni.Micro.Errors.ErrorModel"];
          };
        };
      };
    };
  };
  "/v1/partner/calculate": {
    /** Расчет быстрой цены */
    post: {
      requestBody?: {
        content: {
          "application/json": components["schemas"]["Sravni.QuickPrice.Dto.OsagoQuickPriceQueryForPartners"];
          "text/json": components["schemas"]["Sravni.QuickPrice.Dto.OsagoQuickPriceQueryForPartners"];
          "application/*+json": components["schemas"]["Sravni.QuickPrice.Dto.OsagoQuickPriceQueryForPartners"];
        };
      };
      responses: {
        /** @description Success */
        200: {
          content: {
            "text/plain": components["schemas"]["Sravni.QuickPrice.Dto.OsagoQuickPriceResult"];
            "application/json": components["schemas"]["Sravni.QuickPrice.Dto.OsagoQuickPriceResult"];
            "text/json": components["schemas"]["Sravni.QuickPrice.Dto.OsagoQuickPriceResult"];
          };
        };
        /** @description Bad Request */
        400: {
          content: {
            "text/plain": components["schemas"]["Sravni.Micro.Errors.ErrorModel"];
            "application/json": components["schemas"]["Sravni.Micro.Errors.ErrorModel"];
            "text/json": components["schemas"]["Sravni.Micro.Errors.ErrorModel"];
          };
        };
        /** @description Unauthorized */
        401: {
          content: never;
        };
        /** @description Forbidden */
        403: {
          content: never;
        };
        /** @description Server Error */
        500: {
          content: {
            "text/plain": components["schemas"]["Sravni.Micro.Errors.ErrorModel"];
            "application/json": components["schemas"]["Sravni.Micro.Errors.ErrorModel"];
            "text/json": components["schemas"]["Sravni.Micro.Errors.ErrorModel"];
          };
        };
      };
    };
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    "Sravni.Micro.Errors.Error": {
      code?: string | null;
      target?: string | null;
      message?: string | null;
      attemptedValue?: string | null;
      details?: components["schemas"]["Sravni.Micro.Errors.Error"][] | null;
    };
    "Sravni.Micro.Errors.ErrorModel": {
      error?: components["schemas"]["Sravni.Micro.Errors.Error"];
    };
    /** @description Результат поиска базового тарифа СК в локации */
    "Sravni.QuickPrice.Dto.OsagoBaseTariffResult": {
      /**
       * Format: int32
       * @description Id страховой компании
       */
      companyId?: number;
      /** @description Локация */
      location?: string | null;
      /** @description Раут локации */
      route?: string | null;
      /**
       * Format: int32
       * @description Базовый тариф
       */
      baseTariff?: number;
    };
    /** @description Запрос на расчет быстрой цены ОСАГО для заданных параметров */
    "Sravni.QuickPrice.Dto.OsagoQuickPriceQuery": {
      /**
       * Format: int32
       * @description Id бренда автомобиля
       */
      brandId?: number | null;
      /**
       * Format: int32
       * @description Id модели автомобиля
       */
      modelId?: number | null;
      /**
       * Format: int32
       * @description Год выпуска автомобиля
       */
      year?: number | null;
      /**
       * Format: int32
       * @description Мощность автомобиля
       */
      enginepower?: number | null;
      /**
       * Format: int32
       * @description Опыт вождения
       */
      drivingExperience?: number | null;
      /**
       * Format: int32
       * @description Возраст водителя
       */
      age?: number | null;
      /**
       * Format: int32
       * @description Мультидрайв
       */
      isMultiDrive?: number | null;
      /** @description Локация водителя */
      locationRoute?: string | null;
      /**
       * Format: double
       * @description КБМ водителя
       */
      kbm?: number | null;
      /** @description Номер автомобиля */
      carNumber?: string | null;
      /**
       * Format: int32
       * @description Кол-во водителей
       */
      driversCount?: number | null;
      utm?: components["schemas"]["Sravni.QuickPrice.Dto.Utm"];
    };
    /** @description Запрос на расчет быстрой цены ОСАГО для заданных параметров */
    "Sravni.QuickPrice.Dto.OsagoQuickPriceQueryForPartners": {
      /**
       * Format: int32
       * @description Id бренда автомобиля
       */
      brandId?: number | null;
      /**
       * Format: int32
       * @description Id модели автомобиля
       */
      modelId?: number | null;
      /**
       * Format: int32
       * @description Год выпуска автомобиля
       */
      year?: number | null;
      /**
       * Format: int32
       * @description Мощность автомобиля
       */
      enginepower?: number | null;
      /**
       * Format: int32
       * @description Опыт вождения
       */
      drivingExperience?: number | null;
      /**
       * Format: int32
       * @description Возраст водителя
       */
      age?: number | null;
      /**
       * Format: int32
       * @description Мультидрайв
       */
      isMultiDrive?: number | null;
      /** @description Локация водителя */
      locationRoute?: string | null;
      /**
       * Format: double
       * @description КБМ водителя
       */
      kbm?: number | null;
      /** @description Номер автомобиля */
      carNumber?: string | null;
    };
    /** @description Результат расчета быстрой цены ОСАГО по заданным параметрам */
    "Sravni.QuickPrice.Dto.OsagoQuickPriceResult": {
      /**
       * Format: int32
       * @description Минимальная цена для заданных параметров
       */
      minPrice?: number;
      /**
       * Format: int32
       * @description Медианная цена для заданных параметров
       */
      medianPrice?: number;
      /**
       * Format: int32
       * @description Максимальная цена для заданных параметров
       */
      maxPrice?: number;
      /** @description Признак, что удалось рассчитать цены для заданных параметров */
      hasResult?: boolean;
    };
    /** @description Результат поиска коэффициента территории */
    "Sravni.QuickPrice.Dto.OsagoTerritorialCoefficientResult": {
      /** @description Локация */
      location?: string | null;
      /** @description Раут локации */
      route?: string | null;
      /**
       * Format: double
       * @description Коэффициент
       */
      coefficient?: number;
    };
    /** @description Utm метки */
    "Sravni.QuickPrice.Dto.Utm": {
      source?: string | null;
      medium?: string | null;
      campaign?: string | null;
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}

export type $defs = Record<string, never>;

export type external = Record<string, never>;

export type operations = Record<string, never>;
