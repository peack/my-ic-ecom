module.exports = {
  root: true,
  extends: ['@payloadcms', 'plugin:@next/next/recommended'],
  ignorePatterns: ['**/payload-types.ts'],
  plugins: ['prettier'],
  rules: {
    'import/no-default-export': 'off',
  },
}
