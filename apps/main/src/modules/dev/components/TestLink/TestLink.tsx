import { Link } from 'react-router-dom';

import { featureConfig } from 'modules/common/featureConfig';
import { devRouteConfig } from 'modules/dev/getDevRoutes';
import { useTestLinkStyles } from './useTestLinkStyles';

/**
 * for testing purpose only
 */
export const TestLink = (): JSX.Element => {
  const { classes } = useTestLinkStyles();

  return (
    <div className={classes.root}>
      <Link
        className={classes.menuLink}
        title="Testing only"
        to={devRouteConfig.dev.generatePath()}
      >
        🧪 Test menu
      </Link>

      {featureConfig.offlineTesting && (
        <span>⚠️ Offline testing is enabled</span>
      )}
    </div>
  );
};
