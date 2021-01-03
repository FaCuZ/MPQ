export const state = () => ({
	json: { value: 'store' },
	force: 0,
	metadata: {
		title: '...',
		version: '...',
		description: '...',
		readme: '...',
	},
	score: {
		final: 0,
		maintenance: 0,
		popularity: 0,
		quality: 0,
	},
	evaluation: {
		maintenance: {
			releasesFrequency: 0,
			commitsFrequency: 0,
			openIssues: 0,
			issuesDistribution: 0,
		},
		popularity: {
			communityInterest: 0,
			downloadsCount: 0,
			downloadsAcceleration: 0,
			dependentsCount: 0,
		},
		quality: {
			carefulness: 0,
			tests: 0,
			health: 0,
			branding: 0,
		}
	}
})

export const getters = {
	json: state => state.json,
	force: state => state.force,
	metadata: state => state.metadata,
	score: state => state.score,
	evaluation: state => state.evaluation
}

export const mutations = {
	CHANGE(state, json) {
		state.json = json

		state.metadata = {
			title: json.collected.metadata.name,
			version: json.collected.metadata.version,
			description: json.collected.metadata.description,
			readme: markdown(json.collected.metadata.readme, json.collected.metadata.links.repository)


		}

		state.score = {
			final: json.score.final,
			maintenance: json.score.detail.maintenance * 100,
			popularity: json.score.detail.popularity * 100,
			quality: json.score.detail.quality * 100
		}

		state.evaluation = {
			maintenance: {
				releasesFrequency: json.evaluation.maintenance.releasesFrequency,
				commitsFrequency: json.evaluation.maintenance.commitsFrequency,
				openIssues: json.evaluation.maintenance.openIssues,
				issuesDistribution: json.evaluation.maintenance.issuesDistribution
			},
			popularity: {
				communityInterest: json.evaluation.popularity.communityInterest,
				downloadsCount: json.evaluation.popularity.downloadsCount,
				downloadsAcceleration: json.evaluation.popularity.downloadsAcceleration,
				dependentsCount: json.evaluation.popularity.dependentsCount
			},
			quality: {
				carefulness: json.evaluation.quality.carefulness,
				tests: json.evaluation.quality.tests,
				health: json.evaluation.quality.health,
				branding: json.evaluation.quality.branding
			}

		}

		state.force = json.collected.metadata.name
	}
}

export const actions = {
	async change({ commit, state }, name) {

		if(state.metadata.title !== name){
			console.log('CARGA') // NOTE

			const json = await fetch(`https://api.npms.io/v2/package/${name}`)
				.then(res => res.json())

			if(json.code && json.code === 'NOT_FOUND'){
				console.log('404: Package not found') // FIXME throw 404
				//throw({ statusCode: 404, message: 'Pk not found' })
			} else {
				commit('CHANGE', json)
			}
		}
	}
}


const mdit = require('markdown-it')
const mdRL = require('markdown-it-replace-link')
const hljs = require('highlight.js')

function markdown(text, github) {
	let options = {
		injected: true,
		html: true,
		xhtmlOut:  true,
		linkify: false, // Autoconvert URL-like text to links
		highlight: function (str, lang) {
			try {
				if (lang && hljs.getLanguage(lang)) {
						return '<pre class="hljs"><code>' +
							hljs.highlight(lang, str, true).value +
							'</code></pre>'
				}

				return '<pre class="hljs"><code>' + mdit.utils.escapeHtml(str) + '</code></pre>'
			} catch (error) {
				console.error(error)
				return '<pre class="hljs"><code>' + str + '</code></pre>'
			}

		},

		// replaceLink: function (link, env) {
		// 	console.log('replaceLink', link, env)

		// 	return github + '/blob/master/' + link
		// 	//return link.replace(/\.\//, 'blebleblablabala')//.replace(/.md$/, '/')
		// }
	}

	return mdit(options).use(mdRL).render(text)
}

