<template>
	<v-form @submit.prevent="renameFiles">
		<v-text-field
			v-model="inputFolder"
			label="Pasta de Entrada"
			placeholder="Selecione a pasta dos arquivos"
		></v-text-field>
		<v-text-field
			v-model="fileNamePattern"
			label="Padrão de Nome"
			placeholder="Ex: image-{n}.jpg"
		></v-text-field>
		<v-btn block type="submit" color="primary">Renomear Arquivos</v-btn>
	</v-form>
</template>

<script>
export default {
	data() {
		return {
			inputFolder: '',
			fileNamePattern: 'image-{n}.jpg',
		};
	},
	methods: {
		renameFiles() {
			// Chamada à API para renomear os arquivos
			console.log({
				inputFolder: this.inputFolder,
				fileNamePattern: this.fileNamePattern,
			});
		},
	},
};
</script>
