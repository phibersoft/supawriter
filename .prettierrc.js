module.exports = {
  printWidth: 130,
  tabWidth: 2,
  plugins: ["@trivago/prettier-plugin-sort-imports"],
  importOrder: [
    "^\\./.*\\.scss$",
    "<THIRD_PARTY_MODULES>",
    "^@/assets",
    "^@/app",
    "^@/components",
    "^@/services",
    "^@/util",
    "^@/",
    "^@/*.scss",
    "^[./]",
  ],
  importOrderSeparation: true,
};
