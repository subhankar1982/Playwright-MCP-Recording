import { test, expect } from '@playwright/test';
import { getConfig } from '../config/test-config';
import { TestHelpers } from '../config/test-helpers';

const config = getConfig(process.env.TEST_ENV);

test('Organization deletion test', async ({ page }) => {
  const helpers = new TestHelpers(page, config);
  
  // Login to the application
  await helpers.loginFlow();
  
  // Delete organization with parameterized data
  await helpers.organizationPage.deleteOrganization(config.organizationData.description);
  
  // Logout
  await helpers.logout();
});