/**
 * .eslint.js
 *
 * ESLint configuration file.
 */

module.exports = {
        root: true,
        env: {
                node: true,
        },
        extends: [
                'plugin:vue/vue3-essential',
                'eslint:recommended',
                '@vue/eslint-config-typescript',
                'plugin:vuetify/base',
                'plugin:prettier/recommended',
        ],
        plugins: ['vuetify'],
        rules: {
                'vue/multi-word-component-names': 'off',
                'vue/component-api-style': ['error', ['options']],
        },
};
