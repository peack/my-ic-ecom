module.exports = {
  root: true,
  extends: ['@payloadcms', 'plugin:@next/next/recommended'],
  ignorePatterns: ['**/payload-types.ts'],
  plugins: ['prettier', 'import'],
  rules: {
    'import/no-default-export': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
  },
}
