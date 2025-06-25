module.exports = {
  extends: ['react-app', 'react-app/jest', 'plugin:prettier/recommended'],
  plugins: ['import'],
  rules: {
    eqeqeq: ['error', 'always'],
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal'],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'no-console': 'error',
    'no-unused-vars': [
      'error',
      {
        ignoreRestSiblings: true,
        args: 'none',
        vars: 'all',
      },
    ],
    'prefer-const': [
      'error',
      {
        destructuring: 'all',
      },
    ],
  },
}
