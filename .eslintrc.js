module.exports = {
    root: true,
    ignorePatterns: ["scripts/mocha/register.js", "build.ts"],
    overrides: [
        {
            files: "*.ts",
            parser: "@typescript-eslint/parser",
            plugins: [
                "@typescript-eslint"
            ],
            extends: [
                "eslint:recommended",
                "plugin:@typescript-eslint/recommended",
                "plugin:@typescript-eslint/recommended-requiring-type-checking"
            ],
            parserOptions: {
                project: ["./tsconfig.json"]
            },
            rules: {
                "max-len": [
                    "error",
                    {
                        "code": 100
                    }
                ],
                "no-console": 1,
                "no-extra-boolean-cast": 0,
                "@typescript-eslint/restrict-plus-operands": 0,
                "@typescript-eslint/explicit-module-boundary-types": 0,
                "@typescript-eslint/no-explicit-any": 0,
                "@typescript-eslint/no-floating-promises": 0,
                "@typescript-eslint/no-unsafe-call": 0,
                "@typescript-eslint/explicit-function-return-type": 2,
                "@typescript-eslint/no-unsafe-member-access": 0,
                "@typescript-eslint/no-unsafe-assignment": 0
            },
        },
    ]
}