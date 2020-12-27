<template>
	<section class="section">
		<div class="logo">
			<img src="~assets/img/logo.png" alt="MPQ" height="280" class="logo-img">
			Fast and detailed npm packages analyzer
		</div>
		<b-field>
			<b-autocomplete class="search-index" clearable placeholder="Select a package" icon="magnify"
				v-model="name"
				keep-first
				:data="filteredDataArray"
				@select="option => openPackage(option)">

				<template slot="empty">No results found</template>
			</b-autocomplete>
		</b-field>
	</section>
</template>

<script>
export default {
		data() {
			return {
				data: [
					'axios',
					'express',
					'zabbix-rpc',
					'zabbix',
					'Ember',
					'jQuery',
					'Meteor',
					'Polymer',
					'React',
					'RxJS'
				],
				name: '',
				selected: null
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
				this.$router.push('/package/' + option.toLowerCase())
			}
		},
	}
</script>

<style scoped>
.logo-img{
	height: 105px;
	display: block;
	margin-left: auto;
	margin-right: auto;
	margin-top: 40px;
	margin-bottom: 5px;
}

.logo{
	text-align: center;
	margin-bottom: 30px;
	font-size: 20px;
}

.search-index{
	width: 600px;
	display: block;
	margin-left: auto;
	margin-right: auto;
}
</style>
