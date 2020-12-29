export default {
	// Target (https://go.nuxtjs.dev/config-target)
	target: 'static',

	// Global page headers (https://go.nuxtjs.dev/config-head)
	head: {
	title: 'MPQ',
	meta: [
		{ charset: 'utf-8' },
		{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
		{ hid: 'description', name: 'description', content: '' }
	],
	link: [
		{ rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }
	]
	},

	// Global CSS (https://go.nuxtjs.dev/config-css)
	css: ['@/assets/styles/main.scss', '@/assets/styles/bulma.scss', '~/assets/styles/Insight.css'],

	loading: {
		color: '#1CA5B8',
		height: '4px'
	},

	// Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
	plugins: [],

	// Auto import components (https://go.nuxtjs.dev/config-components)
	components: true,

	// Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
	buildModules: ['@nuxtjs/color-mode'],

	// Modules (https://go.nuxtjs.dev/config-modules)
	modules: [
		'nuxt-buefy', // https://go.nuxtjs.dev/buefy
		'@nuxt/content', // https://go.nuxtjs.dev/content
	],

	// Content module configuration (https://go.nuxtjs.dev/config-content)
	content: {},

	// Build Configuration (https://go.nuxtjs.dev/config-build)
	build: {}
}
