import { test, expect } from '@playwright/test';
import { getConfig } from '../../config/cmg-cm/contact-profiles-config';
import { ContactProfilesTestHelpers } from '../../config/cmg-cm/contact-profiles-test-helpers';

const config = getConfig(process.env.TEST_ENV);

test('Contact Profiles - Complete CRUD workflow', async ({ page }) => {
  const helpers = new ContactProfilesTestHelpers(page, config);
  
  // Perform complete contact profiles workflow with parameterized data
  await helpers.completeContactProfilesWorkflow();
});