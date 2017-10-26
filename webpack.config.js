const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: [
    'react-hot-loader/patch',
    './src/main.js'
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new Dotenv({
      path: './.env' // Path to .env file (this is the default) 
    })
  ],
  module: {
		rules: [
			{
				test: /\.css$/,
				use: [{loader: "style-loader"}, {loader: "css-loader"}]
			},
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['react', 'env']
					}
				}
			},
			{
				test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				use: [{loader: 'url-loader?limit=10000&mimetype=application/font-woff'}]
			},
			{
				test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				use: [{ loader: 'file-loader' }]
			}
		]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  }
};

