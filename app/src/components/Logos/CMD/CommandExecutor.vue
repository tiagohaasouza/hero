<!--
* Copyright (C) Logos - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Written by Tiago Souza tiagohaasouza@gmail.com
* If you purchased this software, see the license.txt file contained in this source code for more information and possible exceptions.
-->
<script lang="ts">
import { defineComponent } from 'vue';

import Tabs from '@components/Hero/UI/Tabular/Tab/Tabs.vue';
import Tab from '@components/Hero/UI/Tabular/Tab/Tab.vue';
import TabWindow from '@components/Hero/UI/Tabular/Tab/TabWindow.vue';

export default defineComponent({
	components: { Tab, Tabs, TabWindow },
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
	<Tabs :stacked="true">
		<template #tabs>
			<Tab :title="$t('Conversão de Imagens', 1)" icon="" />
			<Tab :title="$t('Renomear Arquivos', 1)" icon="" />
			<Tab :title="$t('Compressão de Imagens')" icon="" />
			<Tab :title="$t('Geração de Tamanhos')" icon="" />
		</template>

		<TabWindow>
			<ImageConversionForm />
		</TabWindow>

		<TabWindow>
			<RenameFilesForm />
		</TabWindow>

		<TabWindow>
			<CompressImagesForm />
		</TabWindow>

		<TabWindow>
			<GenerateImageSizesForm />
		</TabWindow>
	</Tabs>
</template>
