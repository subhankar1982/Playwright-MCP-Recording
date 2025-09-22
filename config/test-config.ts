export interface TestConfig {
  baseUrl: string;
  credentials: {
    username: string;
    password: string;
  };
  initialCredentials?: {
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
    description: string;  // misc10 field
    department: string;   // misc11 field
    extension: string;    // misc18 field
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
  organizationData: {
    description: string;
    org1: string;
    org2: string;
    phoneNumber: string;
    altDescription: string;
    greeting: string;
    miscText: string;
    grammar: string;
  };
  organizationSearchData: {
    searchDescription: string;
    expectedDescription: string;
    expectedPhoneNumber: string;
    expectedGreeting: string;
    expectedOrg2: string;
  };
  userSearchUpdateData: {
    searchQuery: string;
    targetUser: string;
    fieldToUpdate: string;
    checkboxSelector: string;
  };
  keywordData: {
    value: string;
    searchTerm: string;
  };
}

export const config: TestConfig = {
  baseUrl: 'http://10.211.63.208/cmg.dm/',
  credentials: {
    username: 'niceadmin',
    password: 'aastra'
  },
  initialCredentials: {
    username: 'niecadmin',
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
    lastName: 'Mitra',
    firstName: 'Shrila',
    phone: '553484385438342',
    cordless: '8765535333',
    title: 'CFO',
    description: 'hello Mitel',
    department: 'AI',
    extension: '876'
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
  },
  organizationData: {
    description: 'AI Testing for MX-ONE',
    org1: '27',
    org2: '64',
    phoneNumber: '9830936989',
    altDescription: 'this is AI testing for the RnD department',
    greeting: 'hello welcome to AI testing in the MX-ONE RnD',
    miscText: 'for the testing purpose only',
    grammar: 'AI GenAI for testing'
  },
  organizationSearchData: {
    searchDescription: 'AI Testing for MX-ONE',
    expectedDescription: 'AI Testing for MX-ONE',
    expectedPhoneNumber: '9830936989',
    expectedGreeting: 'hello welcome to AI testing in the MX-ONE RnD',
    expectedOrg2: '64'
  },
  userSearchUpdateData: {
    searchQuery: '*',
    targetUser: 'Dey',
    fieldToUpdate: 'exch_inclfree|Calendar synchronization Show appointments marked as "Free"? - checkbox||checkbox|',
    checkboxSelector: '#kryssbox'
  },
  keywordData: {
    value: 'Ciaz',
    searchTerm: 'Ciaz'
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
    initialCredentials: {
      username: process.env.INITIAL_TEST_USERNAME || baseConfig.initialCredentials?.username || 'niecadmin',
      password: process.env.INITIAL_TEST_PASSWORD || baseConfig.initialCredentials?.password || 'aastra',
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
      description: process.env.USER_DESCRIPTION || baseConfig.userData.description,
      department: process.env.USER_DEPARTMENT || baseConfig.userData.department,
      extension: process.env.USER_EXTENSION || baseConfig.userData.extension,
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
    },
    organizationData: {
      description: process.env.ORG_DESC || baseConfig.organizationData.description,
      org1: process.env.ORG1 || baseConfig.organizationData.org1,
      org2: process.env.ORG2 || baseConfig.organizationData.org2,
      phoneNumber: process.env.ORG_PHONE_NUMBER || baseConfig.organizationData.phoneNumber,
      altDescription: process.env.ORG_ALT_DESC || baseConfig.organizationData.altDescription,
      greeting: process.env.ORG_GREETING || baseConfig.organizationData.greeting,
      miscText: process.env.ORG_MISC_TEXT || baseConfig.organizationData.miscText,
      grammar: process.env.ORG_GRAMMAR || baseConfig.organizationData.grammar,
    },
    organizationSearchData: {
      searchDescription: process.env.ORG_SEARCH_DESC || baseConfig.organizationSearchData.searchDescription,
      expectedDescription: process.env.ORG_SEARCH_EXPECTED_DESC || baseConfig.organizationSearchData.expectedDescription,
      expectedPhoneNumber: process.env.ORG_SEARCH_EXPECTED_PHONE || baseConfig.organizationSearchData.expectedPhoneNumber,
      expectedGreeting: process.env.ORG_SEARCH_EXPECTED_GREETING || baseConfig.organizationSearchData.expectedGreeting,
      expectedOrg2: process.env.ORG_SEARCH_EXPECTED_ORG2 || baseConfig.organizationSearchData.expectedOrg2,
    },
    userSearchUpdateData: {
      searchQuery: process.env.USER_SEARCH_QUERY || baseConfig.userSearchUpdateData.searchQuery,
      targetUser: process.env.USER_SEARCH_TARGET || baseConfig.userSearchUpdateData.targetUser,
      fieldToUpdate: process.env.USER_SEARCH_FIELD || baseConfig.userSearchUpdateData.fieldToUpdate,
      checkboxSelector: process.env.USER_SEARCH_CHECKBOX || baseConfig.userSearchUpdateData.checkboxSelector,
    },
    keywordData: {
      value: process.env.KEYWORD_VALUE || baseConfig.keywordData.value,
      searchTerm: process.env.KEYWORD_SEARCH_TERM || baseConfig.keywordData.searchTerm,
    }
  };
}