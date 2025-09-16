export interface TestConfig {
  baseUrl: string;
  credentials: {
    username: string;
    password: string;
  };
  timeouts: {
    default: number;
    long: number;
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
}

export const config: TestConfig = {
  baseUrl: 'http://10.211.63.208/cmg.dm/',
  credentials: {
    username: 'niceadmin',
    password: 'aastra'
  },
  timeouts: {
    default: 3000,
    long: 5000
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
    }
  };
}
