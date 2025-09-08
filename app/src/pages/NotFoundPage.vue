<!--
* Copyright (C) Logos - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Written by Tiago Souza tiagohaasouza@gmail.com
* If you purchased this software, see the license.txt file contained in this source code for more information and possible exceptions.
-->
<script lang="ts">
import { defineComponent } from 'vue';
import NotFoundMoon from '@/pages/Assets/NotFoundMoon.vue';
import NotFoundNeon from '@/pages/Assets/NotFoundNeon.vue';

export default defineComponent({
	components: {
		NotFoundNeon,
		NotFoundMoon,
	},
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
	<Page name="Not Found" :full="true" :go-to-top-button="false">
		<NotFoundMoon />
	</Page>
</template>
