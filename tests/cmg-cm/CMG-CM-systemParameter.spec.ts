import { test, expect } from '@playwright/test';
import { getConfig } from '../../config/cmg-cm/test-config';
import { CMGCMTestHelpers } from '../../config/cmg-cm/test-helpers';

const config = getConfig(process.env.TEST_ENV);

test('CMG Configuration Manager system parameters test', async ({ page }) => {
  const helpers = new CMGCMTestHelpers(page, config);
  
  // Perform complete system parameters configuration flow with parameterized data
  await helpers.systemParametersFlow();
});