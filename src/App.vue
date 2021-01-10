<template>
	<div id="app">

		<app-header></app-header>

		<app-content></app-content>

		<app-footer></app-footer>

	</div>
</template>

<script>
import contentVue from '@/components/content.vue';
import headerVue from '@/components/header.vue';
import footerVue from '@/components/footer.vue';

import ease from '@/eases/app';

export default {
	name: 'App',
	components: {
		'app-header': headerVue,
		'app-content': contentVue,
		'app-footer': footerVue
	},
	created() {

		this.$root.fns = ease.call(this);
	}
}
</script>

<style>
#app {
	font-family: "Open Sans", Arial, Helvetica, sans-serif;
	max-width: var(--page-max-width);
	font-size: 15px;
	margin: auto;
	color: #6a737c;
}
</style>
