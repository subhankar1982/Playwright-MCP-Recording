import { test, expect } from '@playwright/test';
import { getConfig } from '../config/test-config';
import { TestHelpers } from '../config/test-helpers';

const config = getConfig(process.env.TEST_ENV);

test('New user creation', async ({ page }) => {
  const helpers = new TestHelpers(page, config);
  
  // Login to the application
  await helpers.loginFlow();
  
  // Navigate to new record creation
  await helpers.userCreationPage.navigateToNewRecord();
  
  // Fill user details using page object
  await helpers.userCreationPage.fillUserDetails(config.userData);
  
  // Save the record
  await helpers.userCreationPage.saveRecord();
  
  // Search for the created user (using lastName from config)
  await helpers.userCreationPage.searchUser(config.userData.lastName);
  
  // Logout
  await helpers.logout();
});
