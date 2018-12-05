'use strict';

module.exports = {
  'extends': 'google',
  'parserOptions': {
    'ecmaVersion': 2017
  },
  'env': {
    'es6': true
  },
  'rules': {
      'comma-dangle': ['error', 'never'],
      'new-cap': [2, {'capIsNew': false}],
      'max-len': [2, {
        code: 1000,
        tabWidth: 2,
        ignoreUrls: true,
        ignorePattern: '^goog\.(module|require)',
      }],
      'require-jsdoc': [2, {
        require: {
          FunctionDeclaration: false,
          MethodDefinition: true,
          ClassDeclaration: true,
        },
      }],
  }
};