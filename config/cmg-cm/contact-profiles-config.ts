/**
 * Centralized Test Configuration
 * All test data, URLs, timeouts, and parameters
 */

export interface ContactProfileTestData {
  name: string;
  pbxType: string;
  description: string;
  pbxSelection: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
  databaseId: string;
}

export interface TimeoutConfig {
  default: number;
  slow: number;
  step: number;
  navigation: number;
  modal: number;
}

export interface SlowModeConfig {
  enabled: boolean;
  multiplier: number;
}

export interface TestConfig {
  baseUrl: string;
  credentials: LoginCredentials;
  timeouts: TimeoutConfig;
  slowMode?: SlowModeConfig;
  contactProfile: ContactProfileTestData;
  selectors: {
    pbxTable: string;
    pbxCell: string;
    modalData1: string;
    modalData3: string;
    modalData6: string;
  };
}

/**
 * Get configuration based on environment
 */
export function getConfig(environment: string = 'default'): TestConfig {
  const config: TestConfig = {
    baseUrl: process.env.CMG_CM_BASE_URL || 'http://172.20.115.41/cmg.cm/',
    credentials: {
      username: process.env.CMG_CM_USERNAME || 'niceadmin',
      password: process.env.CMG_CM_PASSWORD || 'aastra',
      databaseId: process.env.CMG_CM_DATABASE_ID || '1'
    },
    timeouts: {
      default: parseInt(process.env.TIMEOUT_DEFAULT || '5000'),
      slow: parseInt(process.env.TIMEOUT_SLOW || '3000'),
      step: parseInt(process.env.TIMEOUT_STEP || '1000'),
      navigation: parseInt(process.env.TIMEOUT_NAVIGATION || '10000'),
      modal: parseInt(process.env.TIMEOUT_MODAL || '2000')
    },
    slowMode: {
      enabled: process.env.SLOW_MODE_ENABLED === 'true',
      multiplier: parseFloat(process.env.SLOW_MODE_MULTIPLIER || '2.0')
    },
    contactProfile: {
      name: process.env.CONTACT_PROFILE_NAME || 'AI R&D',
      pbxType: process.env.CONTACT_PROFILE_PBX_TYPE || '17',
      description: process.env.CONTACT_PROFILE_DESCRIPTION || 'test',
      pbxSelection: process.env.CONTACT_PROFILE_PBX_SELECTION || 'icp1 - Alt.ext.1misc1 -'
    },
    selectors: {
      pbxTable: process.env.SELECTOR_PBX_TABLE || '#pbxtable',
      pbxCell: process.env.SELECTOR_PBX_CELL || 'icp1 - Alt.ext.1misc1 -',
      modalData1: process.env.SELECTOR_MODAL_DATA1 || '#modalData1',
      modalData3: process.env.SELECTOR_MODAL_DATA3 || '#modalData3',
      modalData6: process.env.SELECTOR_MODAL_DATA6 || '#modalData6'
    }
  };

  // Environment-specific overrides
  switch (environment.toLowerCase()) {
    case 'dev':
    case 'development':
      config.baseUrl = process.env.CMG_CM_DEV_URL || config.baseUrl;
      config.slowMode!.enabled = true;
      break;
    case 'test':
    case 'testing':
      config.baseUrl = process.env.CMG_CM_TEST_URL || config.baseUrl;
      config.timeouts.default = Math.round(config.timeouts.default * 1.5);
      break;
    case 'prod':
    case 'production':
      config.baseUrl = process.env.CMG_CM_PROD_URL || config.baseUrl;
      config.slowMode!.enabled = false;
      break;
  }

  return config;
}
