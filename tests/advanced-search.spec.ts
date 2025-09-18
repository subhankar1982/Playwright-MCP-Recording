import { test, expect } from '@playwright/test';
import { getConfig } from '../config/test-config';
import { TestHelpers } from '../config/test-helpers';

const config = getConfig(process.env.TEST_ENV);

test('Advanced search and bulk update', async ({ page }) => {
  const helpers = new TestHelpers(page, config);
  
  // Login to the application
  await helpers.loginFlow();
  
  // Perform complete advanced search flow
  await helpers.advancedSearchPage.performCompleteAdvancedSearchFlow(config.advancedSearchData);
  
  // Logout
  await helpers.logout();
});
