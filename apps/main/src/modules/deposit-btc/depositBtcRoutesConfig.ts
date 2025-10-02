import { useMemo } from 'react';
import { createSearchParams } from 'react-router-dom';

import { OChainId, TChainId } from 'modules/api';
import { ROOT_PATH } from 'modules/common/const';
import { useQueryParams } from 'modules/common/hooks/useQueryParams';
import { createRouteConfig } from 'modules/common/utils/createRouteConfig';

const PATH = `${ROOT_PATH}stake/`;
const DEPOSIT_STATUS_PATH = `${PATH}status/`;

interface IDepositBtcParams {
  chain: string | number;
}

export const depositBtcRouteConfig = createRouteConfig(
  {
    main: {
      path: PATH,
      generatePath: (params?: IDepositBtcParams) => {
        if (!params) {
          return PATH;
        }

        const { chain } = params;
        const searchParams = createSearchParams({ chain: chain.toString() });
        return `${PATH}?${searchParams.toString()}`;
      },
      useParams: () => {
        const queryParams = useQueryParams();
        const chainParam = queryParams.get('chain') ?? undefined;

        const chain = useMemo(() => getValidChain(chainParam), [chainParam]);

        return {
          chain,
        };
      },
    },

    status: {
      path: DEPOSIT_STATUS_PATH,
      generatePath: (txHash: string) => {
        const searchParams = createSearchParams({ txHash });
        return `${DEPOSIT_STATUS_PATH}?${searchParams.toString()}`;
      },
      useParams: () => {
        const queryParams = useQueryParams();

        return {
          txHash: queryParams.get('txHash') ?? undefined,
        };
      },
    },
  },
  PATH,
);

function getValidChain(chain?: string): TChainId | undefined {
  if (!chain) {
    return undefined;
  }

  if (Object.values(OChainId).includes(+chain as TChainId)) {
    return +chain as TChainId;
  }

  return undefined;
}
