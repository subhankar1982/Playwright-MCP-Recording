import { test, expect } from '@playwright/test';
import { getConfig } from '../../config/cmg-cm/test-config';
import { CMGCMTestHelpers } from '../../config/cmg-cm/test-helpers';

const config = getConfig(process.env.TEST_ENV);

test('CMG Configuration Manager login and logout test', async ({ page }) => {
  const helpers = new CMGCMTestHelpers(page, config);
  
  // Perform complete login, verify, and logout flow with parameterized data
  await helpers.completeLoginLogoutFlow();
});
