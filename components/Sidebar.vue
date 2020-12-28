<template>
		<b-sidebar
		position="fixed"
		fullheight
		mobile="hide"
		reduce="true"
		type="is-dark"
		open
	>
		<div class="p-1">
			<div class="block img-logo">
				<NuxtLink to="/">
					<img src="~/assets/img/logo.png" alt="MPQ"/>
				</NuxtLink>
			</div>

			<b-menu class="is-custom-mobile">
				<b-menu-list>
					<b-menu-item icon="account-box"></b-menu-item>
					<b-menu-item icon="home-account"></b-menu-item>
					<b-menu-item icon="link"></b-menu-item>
				</b-menu-list>
			</b-menu>
		</div>
	</b-sidebar>
</template>


<style lang="scss">
	.p-1 {
		padding: 1em;
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
		}
		.img-logo {
			-webkit-filter: invert(1);
			filter: invert(1);
			margin: 7px;
			margin-top: 7px;
			margin-top: 11px;
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
