import {
  Backdrop,
  Box,
  CircularProgress,
  Container,
  Paper,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useBridgeInProgressStyles } from './useBridgeInProgressStyles';
import { useTranslation } from 'modules/i18n';
import { translation } from './translation';
import { useMemo, useState } from 'react';
import { ProgressStage } from './types';
import { default as SpinnerIcon } from '../../icons/spinner-icon.svg?react';
import { default as WaitIcon } from '../../icons/wait-icon.svg?react';
import { default as SuccessIcon } from '../../icons/success-icon.svg?react';
import { JumpTx } from './JumpTx';
import { useSelector } from 'react-redux';
import { selectBridgeState } from 'modules/bridge/store/bridgeSlice';
import { ConnectionChecker } from 'modules/bridge/components/ConnectionChecker';
import { ProgressAction } from 'modules/bridge/components/ProgressAction';
import { Section } from 'modules/common/components/Section';
import { useBridgeInProgress } from './useBridgeInProgress';
import { ZERO } from 'modules/common/const';
import { BridgeDetails } from 'modules/bridge/components/BridgeDetails/BridgeDetails';
import { TChainId } from 'modules/api';
import { bridgeRoutesConfig } from 'modules/bridge/bridgeRoutesConfig';
import { SUPPORTED_CHAINS, generateTxUrl } from 'modules/bridge/const';

const processItems: {
  key: ProgressStage;
  value: string;
  step: number;
  noTx?: boolean;
  hidden?: boolean;
}[] = [
  { key: 'send', value: 'Send', step: 1 },
  { key: 'switch-network', value: 'Switch network', step: 2, noTx: true },
  { key: 'claim', value: 'Claim', step: 3 },
  { key: 'finish', value: 'Finish', step: 4, hidden: true },
];

export function BridgeInProgress({}: {}): JSX.Element {
  const { classes } = useBridgeInProgressStyles({});
  const { keys, t } = useTranslation(translation);
  const [loading] = useState(false);
  const bridgeState = useSelector(selectBridgeState);
  const { bridgeData, depositDone } = useBridgeInProgress({});
  const theme = useTheme();
  const onlyMediumScreen = useMediaQuery(theme.breakpoints.down('md'));

  const { chainId, txHash } = bridgeRoutesConfig.bridgeProgress.useParams();

  const fromChain = SUPPORTED_CHAINS.find(
    chain => chain.chainId === Number(chainId),
  );

  const toChain = useMemo(
    () => SUPPORTED_CHAINS.find(chain => chain.chainId === bridgeData?.chainId),
    [bridgeData],
  );

  const amount = bridgeData?.totalAmount ?? ZERO;

  const current = useMemo(
    () => processItems.find(item => item.key === bridgeState.progress)!,
    [bridgeState],
  );

  return (
    <Section centered>
      <Container className={classes.container}>
        <Box className={classes.root}>
          <h1 className={classes.title}>
            {t(current.key === 'finish' ? keys.success : keys.title)}
          </h1>

          <Paper elevation={0} sx={{ padding: 0 }}>
            <BridgeDetails
              sx={{ mt: onlyMediumScreen ? 3 : 5.5 }}
              fromChain={Number(chainId) as TChainId}
              toChain={bridgeData?.chainId as TChainId}
              amount={amount}
            />

            <Box sx={{ mt: onlyMediumScreen ? 2 : 6.25 }}>
              <ul className={classes.progress}>
                {processItems.map(item => (
                  <li
                    key={item.key}
                    {...(item.hidden && { style: { display: 'none' } })}
                  >
                    <span>{item.value}</span>
                    {current.key === item.key &&
                      (() => {
                        if (!depositDone && item.key === 'send' && fromChain) {
                          return (
                            <JumpTx
                              isWaiting={true}
                              url={generateTxUrl[fromChain.abbr]?.(txHash)}
                            />
                          );
                        }

                        return <SpinnerIcon className={classes.spinner} />;
                      })()}
                    {current.step < item.step && <WaitIcon className="wait" />}
                    {current.step > item.step &&
                      (item.noTx ? (
                        <SuccessIcon />
                      ) : (
                        <JumpTx
                          url={(() => {
                            if (fromChain && item.key === 'send') {
                              return generateTxUrl[fromChain.abbr]?.(txHash);
                            } else if (toChain && item.key === 'claim') {
                              return generateTxUrl[toChain.abbr]?.(
                                bridgeState.claimedTxHash,
                              );
                            }
                          })()}
                        />
                      ))}
                  </li>
                ))}
              </ul>
            </Box>

            <ConnectionChecker sx={{ mt: onlyMediumScreen ? 2 : 8 }}>
              <ProgressAction
                sx={{ mt: onlyMediumScreen ? 2 : 8 }}
                stage={bridgeState.progress}
              />
            </ConnectionChecker>
          </Paper>

          <Backdrop
            sx={{ color: theme => theme.palette.common.white }}
            open={loading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </Box>
      </Container>
    </Section>
  );
}
