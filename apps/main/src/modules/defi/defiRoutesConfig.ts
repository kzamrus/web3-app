import { ROOT_PATH } from 'modules/common/const';
import { createRouteConfig } from 'modules/common/utils/createRouteConfig';

const PATH = `${ROOT_PATH}defi/`;

export const defiRoutesConfig = createRouteConfig(
  {
    main: {
      path: PATH,
      generatePath: () => PATH,
    },
  },
  PATH,
);
