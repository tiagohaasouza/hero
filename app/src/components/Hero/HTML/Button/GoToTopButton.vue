<!--
* Copyright (C) Logos - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Written by Tiago Souza tiagohaasouza@gmail.com
* If you purchased this software, see the license.txt file contained in this source code for more information and possible exceptions.
-->
<script lang="ts">
import { defineComponent } from 'vue';
import { useGoTo } from 'vuetify';

export default defineComponent({
	name: 'ScrollToTopFab',
	data() {
		return {
			isNearBottom: false,
			goTo: useGoTo(),
		};
	},
	methods: {
		checkScroll() {
			const scrollPosition = window.scrollY + window.innerHeight;
			const bottomPosition = document.documentElement.scrollHeight - 200; // Ajuste conforme necessário
			this.isNearBottom = scrollPosition >= bottomPosition;
		},
		scrollToTop() {
			this.goTo(0, { duration: 500, easing: 'easeInOutCubic' });
		},
	},
	mounted() {
		window.addEventListener('scroll', this.checkScroll);
		this.checkScroll(); // Verificar o estado inicial
	},
	beforeUnmount() {
		window.removeEventListener('scroll', this.checkScroll);
	},
});
</script>

<style scoped lang="less"></style>

<template>
	<v-fab
		v-if="isNearBottom"
		color="primary"
		icon="mdi-arrow-up"
		class="me-4"
		location="bottom end"
		size="64"
		absolute
		app
		appear
		@click="scrollToTop"
	></v-fab>
</template>
