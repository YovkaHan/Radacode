'use strict';

const $ = require('gulp-load-plugins')();

const gulp    =   require('gulp');
const named   =   require('vinyl-named');
const path    =   require('path');
const multipipe    =   require('multipipe');
const combine = require('stream-combiner2').obj;

const webpackStream = require('webpack-stream');
const webpack = webpackStream.webpack;

module.exports = function(options) {
	let locOptions = {
		output: {
			publicPath: '/js/'
		},
		watch:  false,
		devtoll: options.isDevelopment ? 'cheap-module-inline-source-map' : null,
		module: {
			loaders: [{
				test:    /\.js$/,
				include: path.join(__dirname, 'frontend'),
				loader:  'babel?presets[]=es2015?script'
			}]
		},
		plugins: [
			new webpack.EnvironmentPlugin('NODE_ENV'),
			new webpack.NoErrorsPlugin()
		]
	};
	
	return function(){
		return multipipe(
			gulp.src(options.src),
			named(),
			webpackStream(locOptions),
			$.cached(options.name),
			$.remember(options.name),
			$.concat('all.min.js'),
			$.if(!(options.isDevelopment),$.rev()),
			$.if(!(options.isDevelopment),$.uglify()),
			gulp.dest(options.dst),
			$.if(!(options.isDevelopment), combine($.rev.manifest('webpack.json'), gulp.dest('manifest')))
		).on('error', $.notify.onError(function(err){
				return {
				title: 'Webpack_Task Error',
				message: err.message
				};
			}))
	}
};