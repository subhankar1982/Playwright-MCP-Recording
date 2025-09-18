import { test, expect } from '@playwright/test';
import { getConfig } from '../config/test-config';
import { TestHelpers } from '../config/test-helpers';

const config = getConfig(process.env.TEST_ENV);

test('Organization creation test', async ({ page }) => {
  const helpers = new TestHelpers(page, config);
  
  // Login to the application
  await helpers.loginFlow();
  
  // Create new organization with parameterized data
  await helpers.organizationPage.createOrganization(config.organizationData);
  
  // Logout
  await helpers.logout();
});