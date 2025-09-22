import { test, expect } from '@playwright/test';
import { getConfig } from '../config/test-config';
import { TestHelpers } from '../config/test-helpers';

const config = getConfig(process.env.TEST_ENV);

test('Comprehensive keyword create, search, and delete test', async ({ page }) => {
  const helpers = new TestHelpers(page, config);
  
  // Perform complete keyword create, search, and delete flow with parameterized data
  await helpers.keywordCreateSearchDeleteFlow(config.keywordData);
  
  // Logout
  await helpers.logout();
});