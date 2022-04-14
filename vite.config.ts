import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { createStyleImportPlugin, AndDesignVueResolve } from 'vite-plugin-style-import'

// 代理地址
const target = 'http://erp_test.admin.htwig.com'

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
			'/erp_test': {
				target: target,
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/erp_test/, ''),
			},
		},
	},
	base: './',
})
