import { ROOT_PATH } from 'modules/common/const';
import { useQueryParams } from 'modules/common/hooks/useQueryParams';
import { createRouteConfig } from 'modules/common/utils/createRouteConfig';
import { createSearchParams } from 'react-router-dom';

const PATH = `${ROOT_PATH}unstake/`;
const STATUS_PATH = `${PATH}status/`;

interface IUnstakeStatusParams {
  txHash: string;
  network: string;
  amount?: string;
}

export const unstakeRoutesConfig = createRouteConfig(
  {
    main: {
      path: PATH,
      generatePath: () => PATH,
    },

    status: {
      path: STATUS_PATH,
      generatePath: (props: IUnstakeStatusParams) => {
        const searchParams = createSearchParams({ ...props });
        return `${STATUS_PATH}?${searchParams.toString()}`;
      },
      useParams: () => {
        const queryParams = useQueryParams();

        return {
          txHash: queryParams.get('txHash') ?? undefined,
          network: queryParams.get('network') ?? undefined,
          amount: queryParams.get('amount') ?? undefined,
        };
      },
    },
  },
  PATH,
);
