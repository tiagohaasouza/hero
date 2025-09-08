<!--
* Copyright (C) Logos - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Written by Tiago Souza tiagohaasouza@gmail.com
* If you purchased this software, see the license.txt file contained in this source code for more information and possible exceptions.
-->
<script>
import { defineComponent } from 'vue';
import Logo from '@components/Hero/App/Layout/Logo.vue';

export default defineComponent({
	components: { Logo },
	props: {},
	data() {
		return {};
	},
	methods: {},
	computed: {},
	created() {},
	mounted() {},
	beforeUnmount() {},
	unmounted() {},
});
</script>

<style scoped lang="less"></style>

<template>
	<v-app-bar sticky>
		<v-spacer />

		<Logo />

		<v-spacer />

		<router-link to="/">
			<v-btn text>Home</v-btn>
		</router-link>

		<router-link to="/about">
			<v-btn text>About</v-btn>
		</router-link>

		<v-spacer />
	</v-app-bar>
</template>
