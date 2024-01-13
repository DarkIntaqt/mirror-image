module.exports = {
   root: true,
   parser: '@typescript-eslint/parser',
   parserOptions: {
      ecmaVersion: 2023,
      sourceType: 'module',
   },
   extends: [
      'plugin:@typescript-eslint/recommended',
      'plugin:prettier/recommended',
   ],
   rules: {
      '@typescript-eslint/no-explicit-any': 'off',
   },
};