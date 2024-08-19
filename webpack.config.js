const path = require("path");

module.exports = {
  entry: ["./client/index.js"],
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "bundle.js",
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react"],
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i, // Matches image files
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[path][name].[ext]", // Keeps the original file name
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
          "postcss-loader", // Ensure postcss-loader is included
        ],
      },
    ],
  },
};
