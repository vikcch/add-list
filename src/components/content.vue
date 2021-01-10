<template>

	<div>

		<app-trade></app-trade>

		<div class="badge center tm-l">

			<div :class="['inline', {'p-xl':bigWidth}]">

				<div class="right">

					<button
						@click="addRow_onClick"
						class="button button--green"
					>Add Row</button>

				</div>

				<app-table
					class="tm-l"
					ref="table"
				>

				</app-table>
			</div>

		</div>
	</div>
</template>

<script>
import tradeVue from './trade.vue';
import tableVue from './table.vue'
export default {
	components: {

		'app-trade': tradeVue,
		'app-table': tableVue
	},

	methods: {

		addRow_onClick() {

			this.$refs['table'].addRow();
		}
	},

	computed: {

		bigWidth() {

			const mobileBreak = this.$root.fns.mobileBreakPoint();

			return window.innerWidth > mobileBreak;
		},
	}

}
</script>

<style style>
.inline {
	display: inline-block;
}

.p-xl {
	padding: 32px;
}

.right {
	display: flex;
	justify-content: flex-end;
}
</style>