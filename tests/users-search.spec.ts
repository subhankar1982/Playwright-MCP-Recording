import { test, expect } from '@playwright/test';
import { getConfig } from '../config/test-config';
import { TestHelpers } from '../config/test-helpers';

const config = getConfig(process.env.TEST_ENV);

test('User search functionality', async ({ page }) => {
  const helpers = new TestHelpers(page, config);
  
  // Perform complete search flow
  await helpers.searchFlow();
  
  // Logout
  await helpers.logout();
});
