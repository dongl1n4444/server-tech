module.exports = {
    "extends": "google",
    "parserOptions": {
        "ecmaVersion": 2017
    },
    "env": {
        "es6": true
    },
    "rules": {
        "comma-dangle": ["error", "never"],
        "new-cap": [2, {"capIsNew": false}]
    }
};