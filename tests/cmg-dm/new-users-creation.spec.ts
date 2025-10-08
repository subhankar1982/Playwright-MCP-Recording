import { test, expect } from '@playwright/test';
import { getConfig } from '../../config/cmg-dm/test-config';
import { TestHelpers } from '../../config/cmg-dm/test-helpers';

const config = getConfig(process.env.TEST_ENV);

test('Comprehensive user creation test', async ({ page }) => {
  const helpers = new TestHelpers(page, config);
  
  // Perform complete user creation flow with parameterized data
  await helpers.userCreationFlow(config.userData);
  
  // Logout
  await helpers.logout();
});
