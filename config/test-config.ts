export interface TestConfig {
  baseUrl: string;
  credentials: {
    username: string;
    password: string;
  };
  timeouts: {
    default: number;
    long: number;
    slow: number;
    step: number;
  };
  slowMode: {
    enabled: boolean;
    multiplier: number;
  };
  testData: {
    searchQuery: string;
  };
  userData: {
    lastName: string;
    firstName: string;
    phone: string;
    cordless: string;
    title: string;
  };
  advancedSearchData: {
    field1: string;
    field2: string;
    operator3: string;
    field3: string;
    operator4: string;
    field4: string;
    changeField: string;
    dateValue: string;
  };
}

export const config: TestConfig = {
  baseUrl: 'http://10.211.63.208/cmg.dm/',
  credentials: {
    username: 'niceadmin',
    password: 'aastra'
  },
  timeouts: {
    default: 300,
    long: 500,
    slow: 200,
    step: 100
  },
  slowMode: {
    enabled: true,
    multiplier: 1.2
  },
  testData: {
    searchQuery: '*'
  },
  userData: {
    lastName: 'dey-biswas',
    firstName: 'Swhetanshu',
    phone: '9874338',
    cordless: '4354565678',
    title: 'CTO'
  },
  advancedSearchData: {
    field1: '1visitorhostenabled|1|Allow visitor|checkbox',
    field2: '1search_office|1|CMG Web Search|checkbox',
    operator3: '1',
    field3: '1bso_license_3001|1|CMG Speech Office|checkbox',
    operator4: '1',
    field4: '1visitorhostenabled|1|Allow visitor|checkbox',
    changeField: 'actdate|Act Date|10|date|Activation date',
    dateValue: '17'
  }
};

// Environment-specific configurations
export const environments = {
  development: {
    ...config,
    baseUrl: 'http://10.211.63.208/cmg.dm/'
  }
};

// Get configuration based on environment
export function getConfig(env: string = 'development'): TestConfig {
  const baseConfig = environments[env as keyof typeof environments] || environments.development;
  
  // Override with environment variables if available
  return {
    ...baseConfig,
    baseUrl: process.env.BASE_URL || baseConfig.baseUrl,
    credentials: {
      username: process.env.TEST_USERNAME || baseConfig.credentials.username,
      password: process.env.TEST_PASSWORD || baseConfig.credentials.password,
    },
    timeouts: {
      default: parseInt(process.env.DEFAULT_TIMEOUT || '') || baseConfig.timeouts.default,
      long: parseInt(process.env.LONG_TIMEOUT || '') || baseConfig.timeouts.long,
      slow: parseInt(process.env.SLOW_TIMEOUT || '') || baseConfig.timeouts.slow,
      step: parseInt(process.env.STEP_TIMEOUT || '') || baseConfig.timeouts.step,
    },
    slowMode: {
      enabled: process.env.SLOW_MODE === 'false' ? false : (baseConfig.slowMode?.enabled ?? true),
      multiplier: parseFloat(process.env.SLOW_MODE_MULTIPLIER || '') || baseConfig.slowMode?.multiplier || 1.5,
    },
    testData: {
      searchQuery: process.env.SEARCH_QUERY || baseConfig.testData.searchQuery,
    },
    userData: {
      lastName: process.env.USER_LASTNAME || baseConfig.userData.lastName,
      firstName: process.env.USER_FIRSTNAME || baseConfig.userData.firstName,
      phone: process.env.USER_PHONE || baseConfig.userData.phone,
      cordless: process.env.USER_CORDLESS || baseConfig.userData.cordless,
      title: process.env.USER_TITLE || baseConfig.userData.title,
    },
    advancedSearchData: {
      field1: process.env.ADV_SEARCH_FIELD1 || baseConfig.advancedSearchData.field1,
      field2: process.env.ADV_SEARCH_FIELD2 || baseConfig.advancedSearchData.field2,
      operator3: process.env.ADV_SEARCH_OP3 || baseConfig.advancedSearchData.operator3,
      field3: process.env.ADV_SEARCH_FIELD3 || baseConfig.advancedSearchData.field3,
      operator4: process.env.ADV_SEARCH_OP4 || baseConfig.advancedSearchData.operator4,
      field4: process.env.ADV_SEARCH_FIELD4 || baseConfig.advancedSearchData.field4,
      changeField: process.env.ADV_SEARCH_CHANGE_FIELD || baseConfig.advancedSearchData.changeField,
      dateValue: process.env.ADV_SEARCH_DATE_VALUE || baseConfig.advancedSearchData.dateValue,
    }
  };
}
