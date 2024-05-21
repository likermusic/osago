import logger from '@sravni/server-utils/lib/logger';
import { md5 } from 'hash-wasm';

import type { Auto } from '../../../types/api/auto';
import { getRegNumberToken, decodeRegNumberToken } from '../../services/auto';
import {
  getBrands,
  getCarEnginePowers,
  getCarInfo,
  getCarModification,
  getManufactureYears,
  getModels,
} from '../../services/autoInfo';
import { getCarInfoDictionaries } from '../../services/autoInfo/getCarInfoDictionaries/getCarInfoDictionaries';
import { getCookie, readPartnerCookie, readUTMCookie } from '../../utils/analytics';
import { getParamsFromKoaContext } from '../../utils/getParamsFromContext';

export const getCarModels = async (ctx: App.ExtendedContext) => {
  const { brandId } = getParamsFromKoaContext<{ brandId: string }>(ctx);

  ctx.body = await getModels(brandId);
};

export const getCarBrands = async (ctx: App.ExtendedContext) => {
  ctx.body = await getBrands();
};

export const getCarDictionaries = async (ctx: App.ExtendedContext) => {
  const params = getParamsFromKoaContext<Auto.TAutoInfoDictionaryRequest>(ctx);

  ctx.body = await getCarInfoDictionaries(params);
};

export const getCarManufactureYears = async (ctx: App.ExtendedContext) => {
  const { modelId } = getParamsFromKoaContext<{ modelId: string }>(ctx);

  ctx.body = await getManufactureYears(modelId);
};

export const getCarPowers = async (ctx: App.ExtendedContext) => {
  const { modelId, year, brandId } = getParamsFromKoaContext<{ brandId: string; modelId: string; year: string }>(ctx);

  ctx.body = await getCarEnginePowers(brandId, modelId, year);
};

export const getCarModificationController = async (ctx: App.ExtendedContext) => {
  const { modelId, year, brandId, power } = getParamsFromKoaContext<{
    brandId: string;
    modelId: string;
    year: number;
    power: number;
  }>(ctx);

  ctx.body = await getCarModification(brandId, modelId, year, power);
};

export const generateEmptyCarInfoResult = (carNumber: string) => ({
  carNumber,
  modifications: [],
  power: 0,
  year: 0,
});

const NO_HASH_IN_REQUEST_ERROR = 'IN_auto/v1/info_NO_HASH_IN_REQUEST_ERROR';
const HASH_NOT_EQUAL_ERROR = 'IN_auto/v1/info_HASH_NOT_EQUAL_ERROR';

export const getCarInfoController = async (ctx: App.ExtendedContext) => {
  const partnerCookies = readPartnerCookie(getCookie(ctx));
  const { carNumber, hash: hashFromRequest } = ctx.request.body;

  if (!hashFromRequest) {
    ctx.body = generateEmptyCarInfoResult(carNumber);

    logger.error({
      message: NO_HASH_IN_REQUEST_ERROR,
      meta: {
        carNumber,
        hashFromRequest,
      },
      request_url: 'OSAGOGATEWAY/auto/v1/info/query',
    });

    return;
  }

  const saltAutoInfo = process.env.SALT_AUTO_INFO;
  const hash = await md5(`${carNumber}${saltAutoInfo}`);

  if (hashFromRequest !== hash) {
    ctx.body = generateEmptyCarInfoResult(carNumber);

    logger.error({
      message: HASH_NOT_EQUAL_ERROR,
      meta: {
        carNumber,
        hashFromRequest,
        hash,
      },
      request_url: 'OSAGOGATEWAY/auto/v1/info/query',
    });

    return;
  }

  ctx.body = await getCarInfo({
    partnerUtm: {
      ...partnerCookies,
      source: getCookie(ctx)('partnerUtmSource') ?? partnerCookies.source,
    },
    type: 'number',
    userAgent: ctx.request.headers['user-agent'],
    utm: readUTMCookie(getCookie(ctx)),
    value: carNumber,
  });
};

export async function regNumberToken(ctx: App.ExtendedContext): Promise<void> {
  const { regNumber } = ctx.query;

  ctx.body = await getRegNumberToken(regNumber);
}

export async function regNumberTokenInfo(ctx: App.ExtendedContext): Promise<void> {
  const { carNumberToken } = ctx.request.body;

  const partnerUtm = readPartnerCookie(getCookie(ctx));
  const utm = readUTMCookie(getCookie(ctx));
  const partnerUtms = {
    ...partnerUtm,
    source: getCookie(ctx)('partnerUtmSource') ?? partnerUtm.source,
  };
  const userAgent = ctx.request.headers['user-agent'];

  const params = await decodeRegNumberToken({
    regNumberToken: carNumberToken,
    utm,
    partnerUtm: partnerUtms,
    userAgent,
  });

  /**
   * так как из ручки по декодированию прилетает какой-то мусор,
   * то берем оттуда только номер и идем в автокод за данными для тачки
   * */
  ctx.body = await getCarInfo({
    partnerUtm: partnerUtms,
    type: 'number',
    userAgent,
    utm,
    value: params?.carNumber ?? '',
  });
}
