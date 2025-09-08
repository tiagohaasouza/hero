<!--
* Copyright (C) Logos - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Written by Tiago Souza tiagohaasouza@gmail.com
* If you purchased this software, see the license.txt file contained in this source code for more information and possible exceptions.
-->
<script>
import { defineComponent } from 'vue';
import { randomID } from '@script/Logos/Util/dom';

export default defineComponent({
	components: {},
	props: {
		stacked: { type: Boolean, default: false },
		density: { type: String, default: 'compact' },
		alignTabs: { type: String, default: 'center' },
		bgColor: { type: String, default: 'primary' },
		sliderColor: { type: String, default: 'secondary' },
	},
	data() {
		return {
			id: randomID('tabs'),
			tab: null,
			tabIdCounter: 0,
			tabWindowIdCounter: 0,
		};
	},
	provide() {
		return {
			generateTabId: this.generateTabId,
			generateTabWindowId: this.generateTabWindowId,
		};
	},
	methods: {
		generateTabId() {
			return `${this.id}-tab-${this.tabIdCounter++}`;
		},
		generateTabWindowId() {
			return `${this.id}-tab-${this.tabWindowIdCounter++}`;
		},
	},
	mounted() {},
});
</script>

<style scoped lang="less"></style>

<template>
	<div class="tabs">
		<v-tabs
			:id="id"
			v-model="tab"
			:align-tabs="alignTabs"
			:bg-color="bgColor"
			:slider-color="sliderColor"
			:density="density"
			:stacked="stacked"
		>
			<slot name="tabs" />
		</v-tabs>

		<v-tabs-window v-model="tab">
			<slot />
		</v-tabs-window>
	</div>
</template>
