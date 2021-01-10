<template>
	<div>
		<div
			class="table"
			ref="table"
		>
			<header @mousedown="onMouseDown">

				<div class="w-48"></div>
				<div
					ref="th-id"
					:style="{ width: styleColWidth('id')}"
				>

					<div class="train">
						<div class="fat fake-drag">Id</div>
						<div class="drag">•</div>
					</div>

				</div>

				<div
					ref="th-description"
					:style="{ width: styleColWidth('description')}"
				>
					<div class="train">
						<div class="fat fake-drag">Description</div>
						<div class="drag">•</div>
					</div>

				</div>
				<div
					ref="th-value"
					:style="{ width: styleColWidth('value')}"
				>
					<div class="train">
						<div class="fat fake-drag">Value</div>
						<div class="drag">•</div>
					</div>

				</div>

			</header>
			<ul>
				<li
					:key="index"
					v-for="(item, index) in itens"
				>
					<div class="w-48">

						<div
							class="remove"
							@click="remove_onClick(index)"
						>&#10008;</div>
					</div>

					<div
						:style="{ width: styleColWidth('id')}"
						class="cell"
					>
						<input
							class="rtl"
							v-model="item.id"
							type="text"
						>
					</div>
					<div
						:style="{ width: styleColWidth('description')}"
						class="cell"
					>
						<input
							v-model="item.description"
							type="text"
						>
					</div>
					<div
						:style="{ width: styleColWidth('value')}"
						class="cell"
					>
						<input
							v-model="item.value"
							type="text"
							:class="['rtl',{'input-fail': validationFail(item)}]"
							inputmode="decimal"
							@click="selectText"
						>
					</div>
					<div
						class="w-100 evenly-vm cell"
						v-show="bigWidth"
					>

						<button
							class="icon-button"
							@click="swapUp_onClick({item, index})"
						>
							<icon name='arrow-up' />
						</button>
						<button
							class="icon-button"
							@click="swapDown_onClick({item, index})"
						>
							<icon name='arrow-down' />
						</button>

					</div>

				</li>

				<div
					:style="{direction: 'rtl'}"
					:class="['tm-m', styleSum]"
				>
					{{sumValues}}
				</div>

			</ul>
		</div>
	</div>
</template>

<script>

export default {

	data() {

		const breakPoint = this.$root.fns.mobileBreakPoint();

		const bigWidth = () => window.innerWidth > breakPoint;

		return {

			itens: [],

			col: {
				id: { width: bigWidth() ? 100 : 50 },
				description: { width: bigWidth() ? 200 : 150 },
				value: { width: bigWidth() ? 75 : 100 }
			},

			mouse: {
				startPointX: 0,
				startWidth: 0,
				isPressed: false,
				thElHover: null,
				colName: '',
				lastFitWidth: 0
			},
		};
	},

	methods: {

		thElHover(dragNode) {

			const colNames = ['th-id', 'th-description', 'th-value'];

			const rec = node => {

				const found = colNames.find(x => this.$refs[x] === node);

				if (found) return node;

				else return rec(node.parentNode);
			};

			return rec(dragNode);
		},

		colName(dragNode) {

			const colNames = ['id', 'description', 'value'];

			return colNames.find(x => this.$refs[`th-${x}`] === dragNode);
		},

		onMouseDown(e) {

			if (!e.target.classList.contains('drag')) return;

			const hoverEl = this.thElHover(e.target);

			this.mouse.isPressed = true;
			this.mouse.startPointX = e.clientX;
			this.mouse.thElHover = hoverEl;
			this.mouse.colName = this.colName(hoverEl);

			const rectangle = this.mouse.thElHover.getBoundingClientRect();
			this.mouse.startWidth = rectangle.width;
		},

		onMouseMove(e) {

			if (!this.mouse.isPressed) return;

			const diffX = this.mouse.startPointX - e.clientX;

			const newWidth = this.mouse.startWidth - diffX

			const { colName } = this.mouse;

			// Diferença de largura da coluna actual com o novo valor
			const diffWidth = newWidth - this.col[colName].width;

			const rectangle = this.$refs['table'].getBoundingClientRect();

			const pageMaxWidth = this.$root.fns.pageMaxWidth();

			const widthAvailable = window.innerWidth < pageMaxWidth
				? window.innerWidth
				: window.innerWidth - pageMaxWidth / 2

			if (rectangle.right + diffWidth >= widthAvailable) {

				this.mouse.isPressed = false;
				return;
			}

			this.mouse.thElHover.width = newWidth;

			this.col[colName].width = newWidth;
		},

		remove_onClick(index) {

			this.$delete(this.itens, index);

			if (this.itens.length === 0) this.addRow();
		},

		onMouseUp() {

			this.mouse.isPressed = false;
		},

		addRow() {

			this.itens.push(this.model());
		},

		swapUp_onClick({ index }) {

			const isFirst = index === 0;
			if (isFirst) return;

			const a = index;
			const b = index - 1;

			[this.itens[a], this.itens[b]] = [this.itens[b], this.itens[a]];

			this.$forceUpdate();
		},

		swapDown_onClick({ index }) {

			const isLast = index === this.itens.length - 1;
			if (isLast) return;

			const a = index;
			const b = index + 1;

			[this.itens[a], this.itens[b]] = [this.itens[b], this.itens[a]];

			this.$forceUpdate();
		},

		validationFail(item) {

			const n = Number(item.value);

			return !(n === 0 || n);
		},


		styleColWidth(colName) {

			const choose = {

				'id': 50,
				'description': 150,
				'value': 75
			};

			const min = choose[colName];

			const value = Math.max(this.col[colName].width, min);

			return `${value}px`;
		},

		selectText(e) {

			e.currentTarget.select();
		}
	},

	computed: {

		incrementLast() {

			const lastitem = this.itens.slice(-1)[0];

			const lastId = Number(lastitem?.id ?? 0);

			return lastId + 1;
		},

		model() {
			// NOTE:: Função para ter nova referencia
			return () => ({ id: this.incrementLast, description: '', value: 0 });
		},

		sumValues() {

			const sum = (acc, cur) => acc + Number(cur.value);

			return this.itens.reduce(sum, 0);
		},

		bigWidth() {

			const breakPoint = this.$root.fns.mobileBreakPoint();

			return window.innerWidth > breakPoint;
		},

		styleSum() {

			return this.bigWidth ? 'rm-108' : 'rm-m';
		}
	},

	created() {

		this.itens.push(this.model());
		this.itens.push(this.model());

		document.addEventListener('mouseup', this.onMouseUp);
		document.addEventListener('mousemove', this.onMouseMove);

		window.EventVue.$on('retrieve-itens', callback => {

			callback(this.itens);
		});

		window.EventVue.$on('imported-itens', itens => {

			this.itens = itens;
		});
	},

	mounted() { }

}
</script>

<style scoped>
.table {
	/* Para a soma total ficar alinhada e ter medidas de rectangulo */
	display: inline-block;
	/* border: 1px solid lightgray; */
}

header {
	display: flex;
	text-align: center;
	background-color: green;
	padding: 12px 0px;
	color: white;
	border-radius: 8px 8px 0px 0px;
}

li {
	display: flex;
	border-bottom: 1px solid lightgrey;
}

li:nth-of-type(odd) {
	/* border-bottom: 20px solid green; */
	background-color: whitesmoke;
}

li:last-of-type {
	/* li:last-child - Não funcionava */
	border-bottom: 2px solid green;
}

.cell {
	border-left: 1px dotted lightgray;
}

.w-48 {
	width: 48px;
}
.w-100 {
	width: 100px;
}

.remove {
	font-size: 20px;
	color: red;
	padding: 8px 16px;
	height: 100%;
	width: 100%;
	cursor: pointer;
	/* border: 1px solid gray; */
}

.remove:hover {
	background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1));
}
.remove:active {
	/* filter: brightness(1.75); */
	background-color: lightgray;
}

input {
	padding: 4px 8px;
	/* border: 1px solid gray; */
	border: 0;
	height: 100%;
	width: 100%;
	background: transparent;
}

.input-fail {
	border: 5px dotted red;
}

.drag {
	font-size: 32px;
	line-height: 0.75;
	position: relative;
	right: -6px;
	/* background-color: lightgray; */
	width: 12px;
	height: 20px;
	cursor: col-resize;
	color: whitesmoke;
}

/* Para compensar a largura do darg e o texto ficar centrado */
.fake-drag::before {
	content: "\00A0\00A0";
}

.rtl {
	text-align: right;
}
.rm-108 {
	margin-right: 108px;
}
</style>