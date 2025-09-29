import { test, expect } from '@playwright/test';
import { getConfig } from '../../config/cmg-dm/test-config';
import { TestHelpers } from '../../config/cmg-dm/test-helpers';

const config = getConfig(process.env.TEST_ENV);

test('Organization search and verification test', async ({ page }) => {
  const helpers = new TestHelpers(page, config);
  
  // Login to the application
  await helpers.loginFlow();
  
  // Search for and verify the newly created organization
  await helpers.organizationPage.searchOrganization(config.organizationSearchData);
  
  // Logout
  await helpers.logout();
});
