<template>
		<b-sidebar
			position="fixed"
			fullheight
			mobile="hide"
			reduce
			type="is-dark"
			:can-cancel=canCancel
			open
			class="sidebar-menu"
			:key=this.$route.params.name
		>
		<div class="p-1">
			<div class="block img-logo">
				<NuxtLink to="/">
					<img src="~/assets/img/logo.png" alt="MPQ"/>
				</NuxtLink>
			</div>

			<b-menu class="is-custom-mobile">
				<b-menu-list>
					<div v-for="(item, index) in items" :key="index">
						<b-tooltip :label="item.label" position="is-right">
							<n-link class="menu-n-link" :to="item.to">
								<b-icon :icon="item.icon"></b-icon>
							</n-link>
						</b-tooltip>
					</div>
				</b-menu-list>

			</b-menu>
			<b-menu class="is-custom-mobile menu-bottom">
				<b-menu-list>

					<b-tooltip :label="colorMode()" position="is-right">
						<b-menu-item icon="white-balance-sunny"	@click="$colorMode.preference = nextColorMode()"></b-menu-item>
					</b-tooltip>
				</b-menu-list>
			</b-menu>
		</div>
	</b-sidebar>
</template>

<script>
	export default {
		data () {
			return {
				colors: ['System', 'Light', 'Dark', 'Sepia', 'Contrast'],
				color: 1,
				canCancel: [],
				items: [{
					to: '/package/' + this.$route.params.name,
					label: 'Dashboard',
					icon: 'chart-pie'
				},{
					to: '/package/'+ this.$route.params.name +'/info',
					label: "Information",
					icon: "text-box-outline"
				},{
					to: '/package/'+ this.$route.params.name +'/vs',
					label: "Compare",
					icon: "file-compare"
				},{
					to: '/package/'+ this.$route.params.name +'/downloads',
					label: "Downloads",
					icon: "chart-areaspline"
				}

					/*
				,{
					to: '/package/'+ this.$route.params.name +'/dependence',
					label: "Dependence",
					icon: "package-variant"
				}

				,{
					to: '/',
					label: "Search",
					icon: "magnify"
				},{
					to: '/',
					label: "Export",
					icon: "export-variant"
				}*/
				]
			}
		},
		methods: {
			colorMode(){
				return 'Color mode: '+ this.colors[this.color]
			},
			nextColorMode(){
				this.color++
				if(this.color>=5) this.color = 1

				return this.colors[this.color].toLowerCase()
			},
			getClasses (color) {
				// Does not set classes on ssr when preference is system (because we don't know the preference until client-side)
				if (this.$colorMode.unknown) return {}

				return {
					preferred: color === this.$colorMode.preference,
					selected: color === this.$colorMode.value
				}
			}
		}

	}
</script>

<style lang="scss">
	.p-1 {
		padding: 1em;
	}
	.sidebar-menu {
		z-index: 9000;
	}
	.sidebar-page {
		display: flex;
		flex-direction: column;
		width: 100%;
		min-height: 100%;
		// min-height: 100vh;
		.sidebar-layout {
			display: flex;
			flex-direction: row;
			min-height: 100%;
			// min-height: 100vh;
		}
	}

	.b-sidebar .sidebar-content {
		width: 240px;
		overflow: visible !important;
		//min-height: 100vh;
		.menu-list a:hover {
			background-color: #4d4d4d;
		}
		.menu-list a.is-active,
		.menu-list a.is-active:hover {
			background-color: #1ca5b8;
			color: black;
		}
		.menu-label {
			color: #eaeaea;
		}
		.menu-list a {
			color: #d7d7d7;
			font-size: 25px;
			text-align: center;
			padding: 0.5em 0.95em;
		}
		.img-logo {
			-webkit-filter: invert(1);
			filter: invert(1);
			margin: 7px;
			margin-top: 7px;
			margin-top: 11px;
		}

		.menu-bottom{
			position: absolute;
			bottom: 5px;
			text-align: center;
			width: 72px;
		}

		.tooltip-content {
			margin-left: -3px;
			border-radius: 0px 4px 4px 0px !important;
		}

		.b-tooltip {
			width: 100%;
		}

	}

	.navbar-header {
		background-color: #eee; // #fafbfc;
		box-shadow: 0 0.46875rem 2.1875rem rgba(8, 10, 37, 0.03),
			0 0.9375rem 1.40625rem rgba(8, 10, 37, 0.03),
			0 0.25rem 0.53125rem rgba(8, 10, 37, 0.05),
			0 0.125rem 0.1875rem rgba(8, 10, 37, 0.03);
	}

	.main-content-score {
		margin-left: 150px;
		min-height: 100vh;
		width: 100%;
		margin-right: 70px;
		max-width: 1200px;
	}

	@media screen and (max-width: 1100px) {
		.main-content-score {
			margin-left: 80px;
			width: 100%;
			margin-right: 0px;
		}
	}

	@media screen and (max-width: 770px) {
		.main-content-score {
			margin-left: 0px;
			width: 100%;
			margin-right: 0px;
		}
	}
	/*
	@media screen and (max-width: 1023px) {
		.b-sidebar {
			.sidebar-content {
				&.is-mini-mobile {
					&:not(.is-mini-expand),
					&.is-mini-expand:not(:hover) {
						.menu-list {
							li {
								a {
									span:nth-child(2) {
										display: none;
									}
								}
								ul {
									padding-left: 0;
									li {
										a {
											display: inline-block;
										}
									}
								}
							}
						}
						.menu-label:not(:last-child) {
							margin-bottom: 0;
						}
					}
				}
			}
		}
	}*/
	/*
	@media screen and (min-width: 1024px) {
		.b-sidebar {
			.sidebar-content {
				&.is-mini-mobile {
					width: 72px;
					&:not(.is-mini-expand),
					&.is-mini-expand:not(:hover) {
						.menu-list {
							li {
								a {
									span:nth-child(2) {
										display: none;
									}
								}
								ul {
									padding-left: 0;
									li {
										a {
											display: inline-block;
										}
									}
								}
							}
						}
						.menu-label:not(:last-child) {
							margin-bottom: 0;
						}
					}
				}
			}
		}
		.main-content-score {
			margin-left: 70px;
			min-height: 100vh;
			width: 100%;
			margin-right: 70px;
			max-width: 1200px;
		}
	}
	*/
</style>
