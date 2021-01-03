<template>
	<section class="section">
		<h1 class="title">
			{{ metadata.title }}
			<span class="tag">{{ metadata.version }}</span>
		</h1>
		<h2 class="subtitle">{{ metadata.description }}</h2>

		<div class="markdown-body" v-html=metadata.readme></div>
		 <!-- <div v-html=$md.render(example()) class="markdown-body"></div> -->
		 <!-- https://raw.githubusercontent.com/FaCuZ/zabbix-rpc/HEAD -->
	</section>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex'

	export default {
		layout: 'score',
		scrollToTop: true,
		computed: {
			...mapGetters('npms', ['metadata']),
		},
		methods: {
			...mapActions("npms", ['change']),
		},
		created() {
			this.change(this.$route.params.name)

			// let markdownIt = require('markdown-it');
			// let markdownItReplaceLink = require('markdown-it-replace-link');
			// let markdownItOptions = {
			// 	html: true,
			// 	replaceLink: function (link, env) {
			// 		console.log('replaceLink', link, env)

			//         return "http://me.com/" + link;

			// 		//return link.replace(/\.\//, 'blebleblablabala')//.replace(/.md$/, '/');
			// 	}
			// };
			// let mdLibrary = markdownIt(markdownItOptions).use(markdownItReplaceLink);

			// console.log(mdLibrary.render(this.metadata.readme))
		},
  }
</script>


<style scoped>
/* src="@/assets/styles/highlight.min.css">*/
	#donutChart {
		margin: 0 auto;
		padding: 0%;
		text-align: center;
		display: block;
		margin-left: auto;
		margin-right: auto;
		width: 150px;
	}

	.progress-list {
		min-height: 150px;
		padding: 20px;
	}
	.progress-line {
		margin-bottom: 15px;
	}

	.field {
		align-items: center !important;
	}

	.title {
		text-transform: capitalize;
	}

	.block-score {
		padding: 1rem;
		padding-bottom: 4rem;
	}

	.block-title {
		padding: 1rem;
		background-color: #F5F5F5;
		border-radius: 0px 0px 5px 5px;
	}

	.section {
		padding: 0rem 1.5rem !important;
		background-color: #FAFAFA;
		min-height: 100vh;
		padding-bottom: 60px !important;

	}
</style>
