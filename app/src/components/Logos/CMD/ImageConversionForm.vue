<template>
	<v-form @submit.prevent="convertImages">
		<v-text-field
			v-model="inputFolder"
			label="Pasta de Entrada"
			placeholder="Selecione a pasta de imagens"
		></v-text-field>
		<v-text-field
			v-model="outputFolder"
			label="Pasta de Saída"
			placeholder="Selecione a pasta para salvar as imagens convertidas"
		></v-text-field>
		<v-select v-model="format" :items="['webp', 'avif']" label="Formato de Saída"></v-select>
		<v-text-field
			v-model="size"
			label="Tamanho de Redimensionamento"
			placeholder="Tamanho da Imagem (deixe em branco para não redimensionar)"
		></v-text-field>
		<v-btn block type="submit" color="primary">Converter Imagens</v-btn>
	</v-form>
</template>

<script>
export default {
	data() {
		return {
			inputFolder: '',
			outputFolder: '',
			format: 'webp',
			size: '',
		};
	},
	methods: {
		convertImages() {
			// Aqui você faz a chamada à API ou WebSocket para processar a conversão
			console.log({
				inputFolder: this.inputFolder,
				outputFolder: this.outputFolder,
				format: this.format,
				size: this.size || 'original',
			});
		},
	},
};
</script>
