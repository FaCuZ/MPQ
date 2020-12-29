<template>
	<section class="section">
		<div class="logo">
			<img src="~assets/img/logo.png" alt="MPQ" height="280" class="logo-img">
			Fast and detailed npm packages analyzer
		</div>
		<b-field>

			<b-autocomplete
				class="search-index" clearable placeholder="Select a package" icon="magnify"
				keep-first
				:data="data"
				field="title"
				:loading="isFetching"
				@typing="getAsyncData"
				@select="option => openPackage(option)">

				<template slot-scope="props">
					<div class="media">
						<div class="media-content">
							<b class="title-search">{{ props.option.package.name }}</b> {{ props.option.package.version }}
							<br>
							<small class="description-search">
								{{ props.option.package.description }}
							</small>
						</div>
						<div class="media-right">
							Score: <b>{{ parseInt(props.option.score.final*100) }}%</b>
							<br>
							<small>
								<b>M</b>{{ parseInt(props.option.score.detail.maintenance*100) }}
								<b>P</b>{{ parseInt(props.option.score.detail.popularity*100) }}
								<b>Q</b>{{ parseInt(props.option.score.detail.quality*100) }}
							</small>
						</div>
					</div>
				</template>
				<!-- <template slot="empty">No results found</template> -->
			</b-autocomplete>
		</b-field>
	</section>
</template>

<script>
	import debounce from 'lodash/debounce'

	export default {
		layout: 'home',
		data() {
			return {
				data: [],
				name: '',
				selected: null,
				isFetching: false


			}
		},
		computed: {
			filteredDataArray() {
				return this.data.filter((option) => {
					return option
						.toString()
						.toLowerCase()
						.indexOf(this.name.toLowerCase()) >= 0
				})
			}
		},
		methods: {
			openPackage(option) {
				if(option) this.$router.push('/package/' + option.package.name.toLowerCase())
				this.data = []
			},
			getAsyncData: debounce(async function (name) {
				if (!name.length) {
					this.data = []
					return
				}
				this.isFetching = true

				const json = await fetch(`https://api.npms.io/v2/search?q=${name}+not:deprecated&size=15`)
										.then(res => res.json())
										.catch((error) => {
											this.data = []
											throw error
										})

				this.data = []
				json.results.forEach((item) => this.data.push(item))
				this.isFetching = false
			}, 500)
		},
	}
</script>

<style scoped>
	.logo-img {
		height: 105px;
		display: block;
		margin-left: auto;
		margin-right: auto;
		margin-top: 40px;
		margin-bottom: 5px;
	}

	.logo {
		text-align: center;
		margin-bottom: 30px;
		font-size: 20px;
	}

	.search-index {
		width: 600px;
		display: block;
		margin-left: auto;
		margin-right: auto;
	}

	.title-search {
		text-transform: capitalize;
	}
	.media-right {
		text-align: center;
	}

	.description-search {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		max-width: 29rem;
		display: block;
	}

</style>
