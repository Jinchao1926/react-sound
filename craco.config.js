const path = require("path");
const resolve = (dir) => path.resolve(__dirname, dir);

module.exports = {
  // https://craco.js.org/docs/configuration/webpack/
  webpack: {
    alias: {
      "@": resolve("src"),
      "components": resolve("src/components"),
    },
  }
}