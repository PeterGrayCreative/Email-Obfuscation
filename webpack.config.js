const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const htmlWebpackPlugin = new HtmlWebpackPlugin({
    template: path.join(__dirname, "examples/src/example.html"),
    filename: "./index.html"
});
module.exports = {
    entry: path.join(__dirname, "examples/src/index.js"),
    module: {
        rules: [
            {
                test: /\.js(x)$/,
                use: "babel-loader",
                exclude: /node_modules/
                query: {
                  presets: ['es2015', 'stage-0', 'react'],
                  plugins: [
                      'transform-class-properties',
                  ],
              },
            }
        ]
    },
    plugins: [htmlWebpackPlugin],
    resolve: {
        extensions: [".js", ".jsx"]
    },
    devServer: {
        port: 3001
    }
};