import BigNumber from 'bignumber.js';

export default {
  baseFee: new BigNumber('1332016350'),
  low: {
    maxPriorityFeePerGas: new BigNumber('1000000'),
    maxFeePerGas: new BigNumber('1599419620'),
  },
  medium: {
    maxPriorityFeePerGas: new BigNumber('2000000'),
    maxFeePerGas: new BigNumber('1600419620'),
  },
  high: {
    maxPriorityFeePerGas: new BigNumber('5000000'),
    maxFeePerGas: new BigNumber('1603419620'),
  },
  instant: {
    maxPriorityFeePerGas: new BigNumber('10000000'),
    maxFeePerGas: new BigNumber('3206839240'),
  },
};
