<script>
import { defineComponent } from 'vue';

export default defineComponent({
	components: {},
	props: {
		name: { type: String, default: 'default' },
		theme: { type: Object, default: () => ({ colors: { primary: '', secondary: '' } }) },
	},
	data() {
		return {
			backgroundColor: '',
			secondaryColor: '',
		};
	},
	mounted() {
		if (this.theme.colors) {
			this.backgroundColor = this.theme.colors.primary || '';
			this.secondaryColor = this.theme.colors.secondary || '';
		}
	},
	methods: {
		getThemeType(name) {
			if (name.toLowerCase().includes('light')) {
				return 'Light';
			} else if (name.toLowerCase().includes('dark')) {
				return 'Dark';
			}
			return '';
		},
		getTitleWithoutThemeType(name) {
			return name.replace(/Light|Dark/gi, '').trim();
		},
	},
});
</script>

<style scoped lang="less">
.theme-preview-thumbnail {
	display: flex;
	flex-direction: column;
	align-items: center;
	border: 1px solid v-bind(backgroundColor);
	transition: border-color 0.3s ease;
	width: 170px;
}

.theme-preview-thumbnail:hover {
	border-color: v-bind(secondaryColor);
}

.color-box {
	width: 16px;
	height: 16px;
	margin: 4px;
	display: inline-block;
	position: relative;
	cursor: pointer;
	border-radius: 50%;
}

.colors-container {
	display: flex;
	justify-content: center;
	align-items: center;
	list-style-type: none;
	padding: 0;
	margin: 0;
}

.colors-container li {
	display: inline-block;
	margin: 4px;
}
</style>

<template>
	<v-card class="mx-auto elevation-2 theme-preview-thumbnail" variant="outlined">
		<v-card-title class="d-flex justify-space-between">
			<span>{{ getTitleWithoutThemeType(name) }}</span>
			<v-chip class="ml-2" small>{{ getThemeType(name) }}</v-chip>
		</v-card-title>

		<v-divider />

		<div class="colors d-flex justify-center">
			<v-container>
				<ul class="colors-container">
					<li v-for="(color, key) in theme.colors" :key="key">
						<v-tooltip :key="key">
							<template #activator="{ props }">
								<div
									v-bind="props"
									:data-color-name="key"
									class="color-box"
									:style="{ backgroundColor: color }"
								></div>
							</template>
							<span>{{ key }}</span>
						</v-tooltip>
					</li>
				</ul>
			</v-container>
		</div>
	</v-card>
</template>
