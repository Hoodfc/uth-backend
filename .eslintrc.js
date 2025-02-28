module.exports = {
  extends: ["airbnb", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "prettier"],
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"]
    },
    "import/resolver": {
      typescript: {}
    }
  },
  rules: {
    "react/jsx-filename-extension": [
      2,
      { extensions: [".js", ".jsx", ".ts", ".tsx"] }
    ],
    "import/no-extraneous-dependencies": [
      2,
      { devDependencies: ["**/test.tsx", "**/test.ts"] }
    ],
    "@typescript-eslint/indent": [2, 2],
    "no-console": "off",
      
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        "ts": "never",
      }
   ],

   "class-methods-use-this": "off",
   "max-classes-per-file": "off",
  "semi": "off",
  "@typescript-eslint/semi": ["error"],
  "import/no-cycle": "off" 
  }

};
