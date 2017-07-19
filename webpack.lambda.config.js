/**
 * Webpack Configuration to package code for deployment to AWS Lambda.
 */
"use strict";

const _ = require('lodash');
const path = require('path');

const webpack = require('webpack');
const NodeExternals = require('webpack-node-externals');

module.exports = {
	bail: true, // exit on any error
	entry: {
		// Entry point is our Lambda handler function
		'testfct1': './handlers/testfct1/handler.js'
	},
	output: {
		libraryTarget: 'commonjs2',
		path: path.join(__dirname, '.webpack'),
		filename: 'handlers/[name]/handler.js', // this should match the first part of function handler in serverless.yml
	},
	target: 'node',
	resolve: {
		extensions: ['.js', '.json']
	},
	devtool: process.env.LOCAL ? 'source-map' : undefined,
	plugins: _.compact([
		new webpack.optimize.ModuleConcatenationPlugin(),
	]),
	externals: [
		// We exclude all (but selected) node modules here as the serverless-webpack
		// plugin will automatically inject them again later. This way we keep
		// development dependencies (i.e. serverless itself) out of our deployment.
		NodeExternals({})
	],
	module: {
		rules: [
			{
				// Process ES6 with Babel.
				test: /\.(js|jsx)$/,
				use: [
					{
						loader: "babel-loader",
						options: {
							presets: [ "node6", "stage-0" ],
							plugins: []
						}
					}
				],
			}
		]
	}
};
