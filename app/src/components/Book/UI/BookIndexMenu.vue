<script>
import { defineComponent } from 'vue';

export default defineComponent({
	props: {
		menuData: {
			type: Array,
			required: true,
		},
		chapterIcon: {
			type: String,
			default: 'mdi-book-open-page-variant',
		},
		textIcon: {
			type: String,
			default: 'mdi-notebook',
		},
	},
	methods: {
		isActive(route) {
			return this.$route.path === route;
		},
	},
});
</script>

<style scoped>
a {
	text-decoration: none;
	color: inherit;
	display: flex;
	align-items: center;
}
</style>

<template>
	<v-layout>
		<v-navigation-drawer class="navigation-drawer-full-width" theme="dark" permanent>
			<v-list color="transparent">
				<v-list-item v-for="(item, index) in menuData" :key="index">
					<!-- Se o item não tiver 'data', renderize v-list-item com o link -->
					<template v-if="!item.data || item.data.length === 0">
						<v-list-item :id="item.slug" :active="isActive(item.href)" :prepend-icon="chapterIcon">
							<a :href="item.href">{{ item.title }}</a>
						</v-list-item>
					</template>

					<!-- Se o item tiver 'data', renderize um v-list-group -->
					<template v-else>
						<v-list-group>
							<template #activator="{ props: activatorProps }">
								<v-list-item
									v-bind="activatorProps"
									:id="item.slug"
									:active="isActive(item.href)"
									:prepend-icon="chapterIcon"
								>
									{{ item.title }}
								</v-list-item>
							</template>

							<!-- Renderize os subitens -->
							<v-list-item
								v-for="(subitem, subIndex) in item.data"
								:key="subIndex"
								:id="subitem.slug"
								:active="isActive(subitem.href)"
							>
								<a :href="subitem.href">{{ subitem.title }}</a>
							</v-list-item>
						</v-list-group>
					</template>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>
		<v-main style="height: 100vh"></v-main>
	</v-layout>
</template>
