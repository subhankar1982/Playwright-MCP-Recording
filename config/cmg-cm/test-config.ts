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
  slowMode: {
    enabled: boolean;
    multiplier: number;
  };
  expectedData: {
    menuText: string;
  };
  systemParameters: {
    option44: {
      enabled: string;
      disabled: string;
    };
    value224: {
      initial: string;
      reset: string;
    };
    option213: {
      disabled: string;
    };
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
  },
  slowMode: {
    enabled: true,
    multiplier: 1.5
  },
  expectedData: {
    menuText: 'CMG Configuration Manager'
  },
  systemParameters: {
    option44: {
      enabled: 'ENABLED',
      disabled: 'DISABLED'
    },
    value224: {
      initial: '3',
      reset: ''
    },
    option213: {
      disabled: 'DISABLED'
    }
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
    },
    slowMode: {
      enabled: process.env.CMG_CM_SLOW_MODE === 'false' ? false : (baseConfig.slowMode?.enabled ?? true),
      multiplier: parseFloat(process.env.CMG_CM_SLOW_MODE_MULTIPLIER || '') || baseConfig.slowMode?.multiplier || 1.5,
    },
    expectedData: {
      menuText: process.env.CMG_CM_EXPECTED_MENU_TEXT || baseConfig.expectedData.menuText,
    },
    systemParameters: {
      option44: {
        enabled: process.env.CMG_CM_OPTION44_ENABLED || baseConfig.systemParameters.option44.enabled,
        disabled: process.env.CMG_CM_OPTION44_DISABLED || baseConfig.systemParameters.option44.disabled,
      },
      value224: {
        initial: process.env.CMG_CM_VALUE224_INITIAL || baseConfig.systemParameters.value224.initial,
        reset: process.env.CMG_CM_VALUE224_RESET || baseConfig.systemParameters.value224.reset,
      },
      option213: {
        disabled: process.env.CMG_CM_OPTION213_DISABLED || baseConfig.systemParameters.option213.disabled,
      }
    }
  };
}
