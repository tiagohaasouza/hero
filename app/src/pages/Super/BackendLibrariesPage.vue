<!--
* Copyright (C) Logos - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Written by Tiago Souza tiagohaasouza@gmail.com
* If you purchased this software, see the license.txt file contained in this source code for more information and possible exceptions.
-->
<script>
import { defineComponent } from 'vue';

import PageHeader from '@components/Hero/App/Layout/Page/PageHeader.vue';
import PageBody from '@components/Hero/App/Layout/Page/PageBody.vue';
import PageFooter from '@components/Hero/App/Layout/Page/PageFooter.vue';
import LibrariesDetails from '@pages/Super/Assets/LibrariesDetails.vue';

export default defineComponent({
	components: {
		LibrariesDetails,
		PageHeader,
		PageBody,
		PageFooter,
	},
	props: {},
	data() {
		return {};
	},
	methods: {},
	mounted() {},
});
</script>

<style scoped lang="less"></style>

<template>
	<Page name="Backend Libraries" :full="false">
		<PageHeader :title="$t('library.label', 2) + ' Backend'" />

		<PageBody>
			<v-container>
				<section>
					<LibrariesDetails />
				</section>
			</v-container>
		</PageBody>

		<PageFooter />
	</Page>
</template>
