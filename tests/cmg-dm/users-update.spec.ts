import { test, expect } from '@playwright/test';
import { getConfig } from '../../config/cmg-dm/test-config';
import { TestHelpers } from '../../config/cmg-dm/test-helpers';

const config = getConfig(process.env.TEST_ENV);

test('Comprehensive user update test', async ({ page }) => {
  const helpers = new TestHelpers(page, config);
  
  // Navigate to the application
  await page.goto(config.baseUrl);
  
  // First login with initial credentials (parameterized)
  await helpers.loginPage.fillUsername(config.initialCredentials?.username);
  await page.getByRole('textbox', { name: 'User Name' }).press('Tab');
  await helpers.loginPage.fillPassword(config.initialCredentials?.password);
  await page.getByRole('textbox', { name: 'Password' }).press('Enter');
  await helpers.loginPage.clickLogin();
  
  // Second login with main credentials (parameterized)
  await helpers.loginPage.fillUsername();
  await page.getByRole('textbox', { name: 'User Name' }).press('Tab');
  await helpers.loginPage.fillPassword();
  await helpers.loginPage.clickLogin();
  
  // Perform complete user search and update flow with parameterized data
  await helpers.userSearchUpdateFlow(config.userSearchUpdateData);
  
  // Logout
  await helpers.logout();
});
