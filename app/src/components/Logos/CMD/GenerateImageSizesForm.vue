<template>
	<v-form @submit.prevent="generateSizes">
		<v-text-field
			v-model="inputFolder"
			label="Pasta de Entrada"
			placeholder="Selecione a pasta de imagens"
		></v-text-field>
		<v-text-field
			v-model="outputFolder"
			label="Pasta de Saída"
			placeholder="Selecione a pasta para salvar os novos tamanhos"
		></v-text-field>
		<v-btn block type="submit" color="primary">Gerar Tamanhos</v-btn>
	</v-form>
</template>

<script>
export default {
	data() {
		return {
			inputFolder: '',
			outputFolder: '',
		};
	},
	methods: {
		generateSizes() {
			// Chamada à API para gerar tamanhos de imagem
			console.log({
				inputFolder: this.inputFolder,
				outputFolder: this.outputFolder,
			});
		},
	},
};
</script>
