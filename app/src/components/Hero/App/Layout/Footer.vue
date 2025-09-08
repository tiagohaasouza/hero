<!--
* Copyright (C) Logos - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Written by Tiago Souza tiagohaasouza@gmail.com
* If you purchased this software, see the license.txt file contained in this source code for more information and possible exceptions.
-->
<script>
import { defineComponent } from 'vue';

export default defineComponent({
	components: {},
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

<style scoped lang="less">
.footer {
	min-height: 50px;
}

p {
	width: 100%;
	margin: 0;
	padding: 0;
	display: table;
}
</style>

<template>
	<div class="footer-container">
		<v-footer class="footer" app border elevation="2" v-bind="$attrs">
			<p class="text-disabled text-center">
				&copy; {{ new Date().getFullYear() }}
				<span class="d-none d-sm-inline-block">Hero, {{ $t('copyright.allRightsReserved') }}</span>
			</p>
		</v-footer>
	</div>
</template>
