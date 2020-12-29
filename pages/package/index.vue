<template>
  <h1>No package selected</h1>
</template>

<script>
	export default {
		middleware({ redirect }) {
			return redirect('/')
		}
	}
</script>
