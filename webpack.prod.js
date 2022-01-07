"use strict";

const webpack = require("webpack");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = function() {
  console.log("BUILDING PRODUCTION");

  return webpackMerge(commonConfig(), {

    plugins: [

      new UglifyJsPlugin({
        test: /\.js($|\?)/i,
        sourceMap: true,
        uglifyOptions: {
          mangle: {
            keep_fnames: true,
          },
          compress: {
            warnings: false,
          },
          output: {
            beautify: false,
          },
        },
      }),
    ]
  });
};