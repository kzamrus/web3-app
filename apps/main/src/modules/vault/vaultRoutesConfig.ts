import { ROOT_PATH } from 'modules/common/const';
import { createRouteConfig } from 'modules/common/utils/createRouteConfig';

const PATH = `${ROOT_PATH}vault/`;
const WITHDRAW_PATH = `${PATH}withdraw/`;
const WITHDRAW_STATUS_PATH = `${PATH}withdraw/status`;
const WITHDRAW_CANCEL_PATH = `${PATH}withdraw/cancel`;

const DEPOSIT_PATH = `${PATH}deposit/`;
const DEPOSIT_STATUS_PATH = `${PATH}deposit/status`;

export const vaultRoutesConfig = createRouteConfig(
  {
    main: {
      path: PATH,
      generatePath: () => PATH,
    },

    withdraw: {
      path: WITHDRAW_PATH,
      generatePath: () => WITHDRAW_PATH,
    },

    withdrawStatus: {
      path: WITHDRAW_STATUS_PATH,
      generatePath: () => WITHDRAW_STATUS_PATH,
    },

    withdrawCancel: {
      path: WITHDRAW_CANCEL_PATH,
      generatePath: () => WITHDRAW_CANCEL_PATH,
    },

    deposit: {
      path: DEPOSIT_PATH,
      generatePath: () => DEPOSIT_PATH,
    },

    depositStatus: {
      path: DEPOSIT_STATUS_PATH,
      generatePath: () => DEPOSIT_STATUS_PATH,
    },
  },
  PATH,
);
