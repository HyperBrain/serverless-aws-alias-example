/**
 * Webpack Configuration to package code for deployment to AWS Lambda.
 */
"use strict";

const _ = require("lodash");

const webpack = require('webpack');
const NodeExternals = require('webpack-node-externals');
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
	entry: {
		// Entry point is our Lambda handler function
		'testfct1': './handlers/testfct1/handler.js',
		'testfct2': './handlers/testfct2/handler.js',
		'testauth': './handlers/testauth/handler.js'
	},
	output: {
		libraryTarget: 'commonjs',
		path: '.webpack',
		filename: 'handlers/[name]/handler.js', // this should match the first part of function handler in serverless.yml
	},
	target: 'node',
	resolve: {
		extensions: ['', '.js', '.jsx', '.json', '.css', '.scss']
	},
	devtool: process.env.LOCAL ? 'source-map' : undefined,
	plugins: _.compact([
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				unused: true,
				dead_code: true,
				warnings: false,
				drop_debugger: true,
			}
		}),
		new CopyWebpackPlugin([
			// Copy dynamically loaded files
			// { from: 'src/config/*.json' }
		]),
		// FIXME Not working on AWS Lambda but only locally :(
		process.env.LOCAL ? new webpack.BannerPlugin(
				'require("source-map-support").install();',
				{ raw: true, entryOnly: false }) : null
	]),
	externals: [
		// We exclude all (but selected) node modules here as the serverless-webpack
		// plugin will automatically inject them again later. This way we keep
		// development dependencies (i.e. serverless itself) out of our deployment.
		NodeExternals({
			// grommet relies of .scss which needs processing before it can
			// be deployed. Therefore we explicitly include it into our package.
			whitelist: process.env.LOCAL ? [] : [ /^grommet/ ]
		})
	],
	module: {
		loaders: [
			{
				// Process ES6 with Babel
				test: /\.(js|jsx)$/,
				loader: 'babel',
				query: {
					presets: [ "env", "stage-0", "react" ]
				}
			},
			{
				// Include JSON configuration files
				test: /\.json$/,
				loader: 'json'
			}
		]
	}
};
