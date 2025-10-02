import { ROOT_PATH } from 'modules/common/const';
import { createRouteConfig } from 'modules/common/utils/createRouteConfig';

const PATH = `${ROOT_PATH}swap/`;

export const swapRoutesConfig = createRouteConfig(
  {
    main: {
      path: PATH,
      generatePath: () => PATH,
    },
  },
  PATH,
);
