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
  await helpers.userCreationPage.fillUserDetails({
    lastName: 'dey',
    firstName: 'Swhetanshu',
    phone: '98748',
    cordless: '43565678',
    title: 'CFO'
  });
  
  // Save the record
  await helpers.userCreationPage.saveRecord();
  
  // Search for the created user
  await helpers.userCreationPage.searchUser('dey');
  
  // Logout
  await helpers.logout();
});
