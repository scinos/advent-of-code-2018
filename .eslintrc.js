module.exports = {
    root: true,
    parserOptions: {
        ecmaVersion: 2017,
    },
    plugins: [
        "mocha",
        "prettier"
    ],
    env: {
        node: true,
        mocha: true
    },
    extends: [
        'airbnb-base',
        'plugin:prettier/recommended',
        'plugin:mocha/recommended'
    ],
    rules: {
        'no-constant-condition': 'off',
        'no-restricted-syntax': 'off',
        'no-return-assign': 'off',
        'no-loop-func': 'off',
        'no-continue': 'off',
        'no-cond-assign': 'off'
    }
}