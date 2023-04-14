const path = require("path");
const resolve = (dir) => path.resolve(__dirname, dir);
const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      // https://github.com/DocSpring/craco-less
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              // "@primary-color": "#1DA57A",
            },
            javascriptEnabled: true,
          }
        }
      }
    }
  ],
  // https://craco.js.org/docs/configuration/webpack/
  webpack: {
    alias: {
      "@": resolve("src"),
      "components": resolve("src/components"),
    },
  }
}