const path = require('path');
const pathToPhaser = path.join(__dirname, '/node_modules/phaser/');
const phaser = path.join(pathToPhaser, 'dist/phaser-arcade-physics.min');
const JavaScriptObfuscator = require('webpack-obfuscator');
module.exports = {
	entry: './src/app.ts',
	devtool: 'source-map',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'game.js',
	},
	module: {
		rules: [
			{ test: /\.ts$/, loader: 'ts-loader', exclude: '/node_modules/' },
			{ test: /phaser\.js$/, loader: 'expose-loader?Phaser' }
		]
	},
    plugins: [
        new JavaScriptObfuscator ({
            rotateUnicodeArray: false
        }, ['phaser.min.js'])
    ],
	devServer: {
		contentBase: path.resolve(__dirname, './'),
		publicPath: '/dist/',
		host: '127.0.0.1',
		port: 8080,
		open: true
	},
	resolve: {
		extensions: ['.ts', '.js'],
		alias: {
			phaser: phaser
		  }
	}
};