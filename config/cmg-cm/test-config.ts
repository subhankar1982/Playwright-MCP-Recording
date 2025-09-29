export interface CMGCMTestConfig {
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
}

export const config: CMGCMTestConfig = {
  baseUrl: 'http://172.20.115.41/cmg.cm/',
  credentials: {
    username: 'niceadmin',
    password: 'aastra'
  },
  timeouts: {
    default: 5000,
    long: 10000,
    slow: 3000,
    step: 1000
  }
};

// Environment-specific configurations
export const environments = {
  development: {
    ...config,
    baseUrl: 'http://172.20.115.41/cmg.cm/'
  }
};

// Get configuration based on environment
export function getConfig(env: string = 'development'): CMGCMTestConfig {
  const baseConfig = environments[env as keyof typeof environments] || environments.development;
  
  // Override with environment variables if available
  return {
    ...baseConfig,
    baseUrl: process.env.CMG_CM_BASE_URL || baseConfig.baseUrl,
    credentials: {
      username: process.env.CMG_CM_USERNAME || baseConfig.credentials.username,
      password: process.env.CMG_CM_PASSWORD || baseConfig.credentials.password,
    },
    timeouts: {
      default: parseInt(process.env.CMG_CM_DEFAULT_TIMEOUT || '') || baseConfig.timeouts.default,
      long: parseInt(process.env.CMG_CM_LONG_TIMEOUT || '') || baseConfig.timeouts.long,
      slow: parseInt(process.env.CMG_CM_SLOW_TIMEOUT || '') || baseConfig.timeouts.slow,
      step: parseInt(process.env.CMG_CM_STEP_TIMEOUT || '') || baseConfig.timeouts.step,
    }
  };
}
