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
	props: {
		title: { type: String, required: true, default: 'A ordem de Melquisedeque' },
		author: { type: String, required: true, default: 'Autor Desconhecido' },
		totalPages: { type: Number, required: true, default: 200 },
		isbn: { type: String, required: true, default: '000-0-00-000000-0' },
		coverImage: {
			type: String,
			default:
				'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Book-icon-bible.png/800px-Book-icon-bible.png',
		},
		daysLeft: { type: Number, default: 7 },
	},
	data() {
		return {
			loading: false,
			selection: 1,
			percentage: Math.floor(Math.random() * 100),
			rating: Math.floor(Math.random() * 5),
			items: [
				{ label: 'Author', text: 'John Doe' },
				{ label: 'Total Pages', text: '350' },
				{ label: 'ISBN', text: '978-3-16-148410-0' },
				{ label: 'Publisher', text: 'Fiction House' },
				{ label: 'Publication Year', text: '2023' },
				{ label: 'Language', text: 'English' },
			],
		};
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
.no-underline {
	text-decoration: none;
}
</style>

<template>
	<router-link to="/books/aom" class="no-underline">
		<v-card :disabled="loading" :loading="loading" class="mx-auto">
			<template v-slot:loader="{ isActive }">
				<v-progress-linear
					:active="isActive"
					color="deep-purple"
					height="4"
					indeterminate
				></v-progress-linear>
			</template>
			<v-img :src="coverImage" width="100%" height="250"></v-img>
			<v-card-item class="text-center">
				<v-card-title>{{ title }}</v-card-title>
				<v-card-subtitle>{{ author }}</v-card-subtitle>
				<v-rating
					:model-value="rating"
					color="amber"
					density="compact"
					size="small"
					half-increments
					readonly
				></v-rating>
			</v-card-item>

			<v-divider class="mx-4 mb-1"></v-divider>

			<v-card-title>{{ $t('summary') }}</v-card-title>

			<v-card-text>
				<v-list>
					<v-list-item
						v-for="(item, i) in items"
						:key="i"
						:value="item"
						color="primary"
						rounded="shaped"
					>
						<template v-slot:prepend>
							<span class="mr-5"
								><strong>{{ item.label }}</strong></span
							>
						</template>

						<v-list-item-title v-text="item.text" class="text-right"></v-list-item-title>
					</v-list-item>
				</v-list>
			</v-card-text>

			<v-divider class="mx-4 mb-1"></v-divider>
			<v-card-title>Progress</v-card-title>
			<v-card-text class="text-medium-emphasis">
				<div class="text-h4 font-weight-black mb-4">{{ percentage }}%</div>
				<v-progress-linear
					bg-color="surface-variant"
					class="mb-6"
					color="primary"
					height="10"
					:model-value="percentage"
					rounded="pill"
				></v-progress-linear>
				<div>{{ daysLeft }} days left</div>
			</v-card-text>
		</v-card>
	</router-link>
</template>
