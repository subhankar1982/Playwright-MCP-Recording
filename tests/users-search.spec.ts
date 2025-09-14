import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://10.211.63.208/cmg.dm/');
  await page.getByRole('textbox', { name: 'User Name' }).click();
  await page.getByRole('textbox', { name: 'User Name' }).fill('niceadmin');
  await page.getByRole('textbox', { name: 'User Name' }).press('Tab');
  await page.getByRole('textbox', { name: 'Password' }).fill('aastra');
  await page.getByRole('button', { name: ' Log in' }).click();
  await page.getByRole('link', { name: 'Search record F9' }).click();
  await page.locator('[id="1lname"]').fill('*');
  await page.getByRole('button', { name: 'Search' }).click();
  await page.getByRole('link', { name: 'Log out' }).click();
});