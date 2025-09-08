<script>
import { defineComponent } from 'vue';
import Tabs from '@components/Hero/UI/Tabular/Tab/Tabs.vue';
import Tab from '@components/Hero/UI/Tabular/Tab/Tab.vue';
import TabWindow from '@components/Hero/UI/Tabular/Tab/TabWindow.vue';

export default defineComponent({
	components: {
		Tabs,
		Tab,
		TabWindow,
	},
	data() {
		return {
			isVisible: false,
			isExpanded: false,
		};
	},
	methods: {
		toggleVisibility() {
			this.isVisible = !this.isVisible;
		},
		toggleSize() {
			this.isExpanded = !this.isExpanded;
		},
	},
});
</script>

<style scoped lang="less">
.debug-bar {
	border-top: 1px solid #ccc;
	box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: fixed;
	bottom: 0;
	left: 0;
	background-color: #fff;
	overflow: hidden;
	z-index: 1000;
	width: 30px;
	height: 30px;
}

.debug-bar-expanded {
	height: 50vh;
}

.debug-bar-visible {
	width: 100%;
}

.debug-bar-content {
	padding: 10px;
	width: 100%;
}

.debug-bar-header {
	display: flex;
	position: absolute;
	top: 5px;
	right: 5px;
	background: red;
}

.tabs {
	margin-top: 30px;
	width: 100%;
}

.tab-content {
	overflow-y: auto;
	height: calc(50vh - 60px); /* Altura ajustada para compensar os botões */
}
</style>

<template>
	<div
		class="debug-bar"
		:class="{ 'debug-bar-expanded': isExpanded, 'debug-bar-visible': isVisible }"
		@scroll.stop=""
	>
		<div class="debug-bar-header">
			<v-icon @click="toggleSize">{{ isExpanded ? 'mdi-chevron-down' : 'mdi-chevron-up' }}</v-icon>
			<v-icon @click="toggleVisibility">{{
				isVisible ? 'mdi-chevron-left' : 'mdi-chevron-right'
			}}</v-icon>
		</div>

		<div v-if="isVisible" class="debug-bar-content">
			<Tabs :stacked="true" class="tabs">
				<template #tabs>
					<Tab title="Messages" icon="mdi-message-text-outline" />
					<Tab title="Errors" icon="mdi-alert-circle-outline" />
					<Tab title="Logs" icon="mdi-format-list-bulleted" />
				</template>

				<!-- Conteúdo das abas -->
				<TabWindow>
					<div class="tab-content">
						<p>Here are your messages...</p>
					</div>
				</TabWindow>

				<TabWindow>
					<div class="tab-content">
						<p>Here are your errors...</p>
					</div>
				</TabWindow>

				<TabWindow>
					<div class="tab-content">
						<p>Here are your logs...</p>
					</div>
				</TabWindow>
			</Tabs>
		</div>
	</div>
</template>
