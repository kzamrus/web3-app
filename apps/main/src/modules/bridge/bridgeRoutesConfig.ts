import { TChainId } from 'modules/api';
import { ROOT_PATH } from 'modules/common/const';
import { useQueryParams } from 'modules/common/hooks/useQueryParams';
import { createRouteConfig } from 'modules/common/utils/createRouteConfig';
import { createSearchParams } from 'react-router-dom';

const PATH = `${ROOT_PATH}bridge/`;

export const bridgeRoutesConfig = createRouteConfig(
  {
    main: {
      path: PATH,
      generatePath: () => PATH,
    },
    bridgeFinish: {
      path: `${PATH}finish`,
      generatePath: () => `${PATH}finish`,
    },
    bridgeProgress: {
      path: `${PATH}progress`,
      generatePath: ({
        txHash,
        chainId,
      }: {
        txHash: string;
        chainId: TChainId;
      }) => {
        const searchParams = createSearchParams({
          txHash,
          chainId: chainId.toString(),
        });
        return `${PATH}progress?${searchParams.toString()}`;
      },
      useParams: () => {
        const queryParams = useQueryParams();

        return {
          txHash: queryParams.get('txHash') ?? undefined,
          chainId: queryParams.get('chainId') ?? undefined,
        };
      },
    },
  },
  PATH,
);
