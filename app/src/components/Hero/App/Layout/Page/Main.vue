<!--
* Copyright (C) Logos - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Written by Tiago Souza tiagohaasouza@gmail.com
* If you purchased this software, see the license.txt file contained in this source code for more information and possible exceptions.
-->
<script lang="ts">
import { defineComponent } from 'vue';
import { RouterView } from 'vue-router';

export default defineComponent({
	components: { RouterView },
	data() {
		return {};
	},
	methods: {},
	created() {},
});
</script>

<style lang="less"></style>

<template>
	<v-main>
		<router-view v-slot="{ Component, route }">
			<transition :name="'scale'" mode="out-in">
				<component :is="Component" :key="route.path" />
			</transition>
		</router-view>
	</v-main>
</template>
