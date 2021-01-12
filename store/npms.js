export const state = () => ({
	json: { },
	force: 0,
	metadata: {
		title: '',
		version: '',
		description: '',
		repository: '',
		dependencies: [],
		devDependencies: [],
		readme: '',
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
			repository: json.collected.metadata.links.repository,
			dependencies: Object.entries(json.collected.metadata.dependencies).map(([name, version]) => ({name,version})),
			devDependencies: Object.entries(json.collected.metadata.devDependencies).map(([name, version]) => ({name,version})),
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
		if(process.client){ // NOTE carga solo si esta del lado del server. Poder del lado del cliente??
			if(state.metadata.title !== name){
				console.log('CARGA: ', process.server, 'name:', name ) // NOTE

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
}


const mdit = require('markdown-it')
const mdRL = require('markdown-it-replace-link')
const hljs = require('highlight.js')
const mdAnchor = require('@gerhobbelt/markdown-it-github-headings') // FIXME No funcionan el link

function markdown(text, github) {
	let options = {
		injected: true,
		html: true,
		xhtmlOut:  true,
		linkify: false,
		highlight: function (str, lang) {
			try {
				if (lang && hljs.getLanguage(lang)) {
						return '<pre class="hljs"><code>' + hljs.highlight(lang, str, true).value +	'</code></pre>'
				}

				return '<pre class="hljs"><code>' + mdit.utils.escapeHtml(str) + '</code></pre>'
			} catch (error) {
				console.error(error) // FIXME ver porque tira error a veces.
				return '<pre class="hljs"><code>' + str + '</code></pre>'
			}

		},
	}

	try {

		const md = new mdit(options)

		// Fix hljs code_block error.
		const proxy = (tokens, idx, options, env, self) => self.renderToken(tokens, idx, options);
		const defaultCodeBlockRenderer = md.renderer.rules.code_block || proxy;

		md.renderer.rules.code_block = function(tokens, idx, options, env, self) {
			tokens[idx].attrJoin("class", "hljs-fallback");
			return defaultCodeBlockRenderer(tokens, idx, options, env, self)
		};

		let render = md.use(mdAnchor).use(mdRL).render(text)

		// Fix github images when te path is relative.
		const regexp = /src="(.*?)"/gmi
		let matches = Array.from(render.matchAll(regexp), m => m[1])

		const pk = 'https://raw.githubusercontent.com/' + github.match(/m\/?(.*?)$/is)[1] + '/HEAD/'

		matches.forEach(img => {
			var r = new RegExp('^(?:[a-z]+:)?//', 'i')

			if(!r.test(img)) render = render.replace(img, pk + img)

		})

		return render

	} catch (error) {
		console.log(error) // NOTE
		return ''
	}

}
