module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/essential'
  ],
  plugins: ['html'],
  rules: {
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'prefer-promise-reject-errors': 'off',
    'prefer-const': ['error', {
      destructuring: 'all',
    }],
    'import/no-extraneous-dependencies': 'off',
    'import/no-named-default': 'off',
    camelcase: 'off',
    'vue/return-in-computed-property': 'off',
    'vue/require-default-prop': 'off',
    'vue/attributes-order': 'off',
    'vue/no-v-html': 'off',
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
  },
};
