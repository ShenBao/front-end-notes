const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
	publicPath: process.env.NODE_ENV === 'production'
		? '/mooc-mogujie/'
		: '/',
	devServer: {
		// proxy: {
		// 	'/api/*': {
		// 		target: 'https://www.easy-mock.com/mock/5fb49a3d8ab3eb27be073c08/mogujie',
		// 		changeOrigin: true,
		// 		pathRewrite: {
		// 			'^/api': ''
		// 		}
		// 	}
		// }
	},
  css: {
		loaderOptions: {
			postcss: {
				plugins: [
					require('postcss-plugin-px2rem')({
						rootValue: 75,
						exclude: /(node_module)/,
						minPixelValue: 3,
						selectorBlackList:['van']
					})
					// require('postcss-px-to-viewport')({
					// 	viewportWidth: 750,
					// 	exclude: /(node_module)/,
					// 	unitPrecision: 3,
						// selectorBlackList:['van']
					// })
				]
			},
			scss: {
				prependData: `
					@import "@/style/gobal.scss";
        `
			}
		}
	},
	// chainWebpack(config) {
	// 	config.module
	// 		.rule("svg")
	// 		.exclude.add(resolve('src/style/base/fonts'))
	// 		.end()
		
	// 	config.module
	// 		.rule('icons')
	// 		.test(/\.svg$/)
	// 		.include.add(resolve('src/style/base/fonts'))
	// 		.end()
	// 		.use('svg-sprite-loader')
	// 			.loader('svg-sprite-loader')
	// 			.options({
	// 				symbolId: 'icon-[name]'
	// 			})
	// 			.end()
	// }
}