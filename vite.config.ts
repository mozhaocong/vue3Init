import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { createStyleImportPlugin, AndDesignVueResolve } from 'vite-plugin-style-import'

// 代理地址
const target = 'http://mall-dev.app.htwig.com:32007'


export default defineConfig({
	css: {
		preprocessorOptions: {
			less: {
				javascriptEnabled: true,
			},
		},
	},
	plugins: [
		vue(),
		vueJsx(),
		createStyleImportPlugin({
			resolves: [AndDesignVueResolve()],
		}),
	],
	resolve: {
		alias: {
			'@': '/src',
		},
	},
	server: {
		host: '0.0.0.0',
		port: 8991,
		// 是否开启 https
		https: false,
		proxy: {
			// 代理配置
			'/v3': {
				target: target,
				changeOrigin: true,
				// rewrite: (path) => path.replace(/^\/user/, ''),
			},
		},
	},
	base: './',
})
