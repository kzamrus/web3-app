const { buildFolderName } = require('../package.json');
const { generateStatic } = require('./generate-static.cjs');

const routes = [
  'stake',
  'stake/status',
  'claim',
  'claim-status',
  'unstake',
  'unstake/status',
  'defi',
  'bridge',
  'bridge/finish',
  'bridge/progress',
  'swap',
  'vault',
  'vault/withdraw',
  'vault/withdraw/status',
  'vault/deposit',
  'vault/deposit/status',
];

// todo: import `generateStatic` from `@ankr.com/utils` package
generateStatic(`./${buildFolderName}`, routes);
