<template>
	<v-form @submit.prevent="compressImages">
		<v-text-field
			v-model="inputFolder"
			label="Pasta de Entrada"
			placeholder="Selecione a pasta de imagens para compressão"
		></v-text-field>
		<v-btn block type="submit" color="primary">Comprimir Imagens</v-btn>
	</v-form>
</template>

<script>
export default {
	data() {
		return {
			inputFolder: '',
		};
	},
	methods: {
		compressImages() {
			// Chamada à API para comprimir as imagens
			console.log({
				inputFolder: this.inputFolder,
			});
		},
	},
};
</script>
