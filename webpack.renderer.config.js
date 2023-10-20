const rules = require('./webpack.rules');

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
});
rules.push({
  test: /\.sass$/,
  exclude: /node_modules/,
  use: [
    {
      loader: 'style-loader',
    },
    {
      loader: 'css-loader',
      options: {
        sourceMap: true,
      },
    },
    {
      loader: 'sass-loader',
      options: {
        sourceMap: true,
      },
    },
  ],
})
// rules.push({
//   test:/\.sass$/,
//   use:[{ loader: 'style-loader' }, { loader: 'sass-loader' }]
// })

module.exports = {
  // Put your normal webpack config below here
  module: {
    rules,
  },
};
