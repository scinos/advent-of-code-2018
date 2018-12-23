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
        'plugin:prettier/recommended',
        'plugin:mocha/recommended'
    ],
}