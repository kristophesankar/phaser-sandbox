const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");
module.exports = {
  entry: {
    app: "./src/index.js",
    "production-dependencies": ["phaser"]
  },

  output: {
    path: path.resolve(__dirname, "build"),
    filename: "app.bundle.js"
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, "src"),
        use: {
          loader: "babel-loader",
          options: {
            presets: ["env"]
          }
        }
      }
    ]
  },

  plugins: [
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, "index.html"),
        to: path.resolve(__dirname, "build")
      },
      {
        from: path.resolve(__dirname, "assets/images", "**", "*"),
        to: path.resolve(__dirname, "build")
      },
      {
        from: path.resolve(__dirname, "assets/css", "**", "*"),
        to: path.resolve(__dirname, "build")
      }
    ]),
    new webpack.DefinePlugin({
      "typeof CANVAS_RENDERER": JSON.stringify(true),
      "typeof WEBGL_RENDERER": JSON.stringify(true)
    })
  ],

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          filename: "production-dependencies.bundle.js"
        }
      }
    }
  },

  devServer: {
    contentBase: path.resolve(__dirname, "build")
  }
};
