<template>

	<div class="badge evenly-vm tm-l">

		<label
			for="file-upload"
			class="button button--blue"
		>
			IMPORT FILE
		</label>

		<input
			id="file-upload"
			ref="file-upload"
			type="file"
			accept='.json'
			@change="import_onClick"
		>

		<button
			class="button button--blue"
			@click="export_onClick"
		>SAVE</button>

	</div>

</template>


<script>
import fs from '@/extra/filesaver.js';

export default {

	methods: {

		import_onClick() {

			const input = this.$refs['file-upload'];

			const reader = new FileReader();

			reader.onload = () => {

				const stringifyed = reader.result;

				try {

					const itens = JSON.parse(stringifyed);
					window.EventVue.$emit('imported-itens', itens);

				} catch (error) {

					console.error(error);
					alert('Not a valid file!');
				}
			};

			reader.onerror = () => {

				alert('Something went wrong');
			};

			if (input.value.length) {

				const singleFile = input.files.length === 1;

				if (singleFile) reader.readAsText(input.files[0]);
				else alert('Please select only one file!');
			}

		},

		export_onClick() {

			const callback = itens => {

				const textToSave = JSON.stringify(itens);

				const fileName = 'addlist.json';

				const blob = new Blob([textToSave], {
					type: 'application/json;charset=utf-8'
				});

				fs.saveAs(blob, fileName);
			};

			window.EventVue.$emit('retrieve-itens', callback);
		},
	}
}
</script>

<style scoped>
div {
	padding: 32px;
}

input[type="file"] {
	display: none;
}

label {
	/* NOTE:: A label tem mais 4 px do que o button */
	padding: 10px 32px;
}

label:hover {
	background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1));
}
</style>