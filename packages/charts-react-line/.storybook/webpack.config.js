'use strict';

module.exports = function (storybookBaseConfig, configType) {
  storybookBaseConfig.output.publicPath = configType === 'PRODUCTION'
    ? ''
    : 'http://localhost:3001/';

  storybookBaseConfig.module.loaders.push([
    {
      test: /\.scss$/,
      loaders: [
        'style?sourceMap',
        'css?sourceMap',
        'resolve-url?sourceMap',
        'sass?sourceMap',
      ],
    },
    {
      test: /\.woff$/,
      loader: 'url-loader',
      query: {
        name: 'fonts/[hash].[ext]',
        limit: 5000,
        mimetype: 'application/font-woff',
      },
    },
    {
      test: /\.(eot|svg|ttf|woff2)$/,
      loader: 'file',
      query: {
        name: 'fonts/[hash].[ext]',
      },
    },
    {
      test: /\.(csv|dsv)$/,
      loader: 'dsv',
    },
  ]);

  return storybookBaseConfig;
};
