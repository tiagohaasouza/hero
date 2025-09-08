<script>
import { defineComponent } from 'vue';

export default defineComponent({
	props: {},
	data() {
		return {
			query: '',
			items: [
				{ title: 'Ask the AI', icon: 'mdi-creation', append: 'A I', url: '/ask-ai' },
				{ title: 'Create project', icon: 'mdi-plus', append: 'C', url: '/create-project' },
				{ title: 'Find projects', icon: 'mdi-arrow-right', url: '/find-projects' },
				{
					title: 'Create new organization',
					icon: 'mdi-arrow-right',
					append: 'C O',
					url: '/create-organization',
				},
				{ title: 'Find organizations', icon: 'mdi-arrow-right', url: '/find-organizations' },
				{ title: 'Go to settings overview', icon: 'mdi-arrow-right', url: '/settings-overview' },
				{ title: 'Manage account', icon: 'mdi-arrow-right', url: '/manage-account' },
			],
			loading: false,
		};
	},
	methods: {
		toggleLoading() {
			this.loading = !this.loading;
		},
	},
});
</script>

<style scoped lang="less"></style>

<template>
	<v-card class="card-no-padding">
		<v-progress-linear :indeterminate="loading" absolute top></v-progress-linear>

		<v-form class="header-search-form">
			<v-text-field
				v-model="query"
				:label="$t('search')"
				variant="filled"
				hide-details
				class="search-input"
				prepend-inner-icon="mdi-magnify"
			/>
		</v-form>

		<v-list class="v-list--nav v-list--slim" max-height="350" dense>
			<v-list-item
				v-for="(item, index) in items"
				:key="index"
				link
				class="v-list-item--one-line v-list-item--rounded"
				tabindex="0"
			>
				<template #prepend>
					<v-icon :icon="item.icon" size="x-small" class="me-n2"></v-icon>
				</template>

				<v-list-item-title>{{ item.title }}</v-list-item-title>

				<template #append v-if="item.append">
					<v-avatar class="bg-surface-light text-caption border border-surface-variant" size="24">{{
						item.append
					}}</v-avatar>
				</template>
			</v-list-item>

			<v-list-subheader class="mt-2">Projects</v-list-subheader>

			<v-list-item
				v-for="(item, index) in items.slice(1, 3)"
				:key="index + 3"
				link
				class="v-list-item--one-line v-list-item--rounded"
				tabindex="0"
			>
				<template #prepend>
					<v-icon :icon="item.icon" size="x-small" class="me-n2"></v-icon>
				</template>

				<v-list-item-title>{{ item.title }}</v-list-item-title>

				<template #append v-if="item.append">
					<v-avatar class="bg-surface-light text-caption border border-surface-variant" size="24">{{
						item.append
					}}</v-avatar>
				</template>
			</v-list-item>

			<v-list-subheader class="mt-2">Organizations</v-list-subheader>

			<v-list-item
				v-for="(item, index) in items.slice(3, 5)"
				:key="index + 5"
				link
				class="v-list-item--one-line v-list-item--rounded"
				tabindex="0"
			>
				<template #prepend>
					<v-icon :icon="item.icon" size="x-small" class="me-n2" />
				</template>

				<v-list-item-title>{{ item.title }}</v-list-item-title>

				<template #append v-if="item.append">
					<v-avatar class="bg-surface-light text-caption border border-surface-variant" size="24">{{
						item.append
					}}</v-avatar>
				</template>
			</v-list-item>

			<v-list-subheader class="mt-2">Settings</v-list-subheader>

			<v-list-item
				v-for="(item, index) in items.slice(5)"
				:key="index + 7"
				link
				class="v-list-item--one-line v-list-item--rounded"
				tabindex="0"
			>
				<template #prepend>
					<v-icon :icon="item.icon" size="x-small" class="me-n2" />
				</template>

				<v-list-item-title>{{ item.title }}</v-list-item-title>
			</v-list-item>
		</v-list>

		<v-card-actions class="card-actions-bg">
			<div class="ps-4 text-caption">
				<div class="v-kbd">Enter</div>
				{{ $t('to.select') }}
			</div>

			<v-spacer />

			<div class="pe-4 text-caption">
				<div class="v-kbd">Esc</div>
				{{ $t('to.close') }}
			</div>
		</v-card-actions>
	</v-card>
</template>
