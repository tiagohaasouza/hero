<script>
import { defineComponent } from 'vue';
import SearchWindow from '@components/Hero/App/Layout/Header/SearchWindow.vue';

export default defineComponent({
	components: { SearchWindow },
	props: {},
	data() {
		return {
			query: '',
			showModal: false,
		};
	},
	methods: {
		onInputClick(e) {
			this.showModal = true;
		},
	},
	computed: {},
	created() {},
	mounted() {},
	beforeUnmount() {},
	unmounted() {},
});
</script>

<style scoped lang="less">
/* Remove padding from the card and set background color for card actions */
.card-no-padding {
	padding: 0;
}
.card-actions-bg {
	background-color: var(--v-theme-surface); /* Match the input background */
}
</style>

<template>
	<v-form class="header-search-form">
		<v-text-field
			flat
			variant="solo"
			v-model="query"
			:label="$t('search')"
			single-line
			hide-details
			prepend-inner-icon="mdi-magnify"
			class="mx-4 search-field header-search-input"
			@click="onInputClick"
		/>
	</v-form>

	<v-dialog max-width="500" v-model="showModal">
		<template v-slot:default="{ isActive }">
			<SearchWindow />
		</template>
	</v-dialog>
</template>
