<script lang="ts">
import { defineComponent } from 'vue';
import { useUserStore } from '@stores/user';

export default defineComponent({
	data() {
		return {
			userStore: useUserStore(),
			menu: false,
		};
	},
	methods: {
		changeStatus(status) {
			this.userStore.setStatus(status);
			this.menu = false;
		},
	},
	computed: {
		statusClass() {
			switch (this.userStore.getStatus) {
				case 'online':
					return 'bg-success';
				case 'offline':
					return 'bg-grey';
				case 'away':
					return 'bg-warning';
				case 'busy':
					return 'bg-error';
				default:
					return 'bg-grey';
			}
		},
		currentStatus() {
			return `user.status.${this.userStore.getStatus}`;
		},
	},
});
</script>

<style scoped lang="less">
.status-indicator {
	width: 10px;
	height: 10px;
	border-radius: 50%;
	display: inline-block;
	margin-right: 8px;
}

.status-text:first-letter,
.status-indicator:first-letter {
	text-transform: capitalize;
}
</style>

<template>
	<v-menu offset-y left v-model="menu">
		<template #activator="{ props }">
			<v-list-item prepend-icon="mdi-chat-processing-outline" v-bind="props" @click.stop>
				<v-tooltip activator="parent" location="top">{{ $t('user.status.label', 1) }}</v-tooltip>
				<span class="status-indicator" :class="statusClass"></span>
				<span class="status-text">{{ $t(currentStatus) }}</span>
			</v-list-item>
		</template>

		<v-list>
			<v-list-item
				@click.stop="changeStatus('online')"
				prepend-icon="mdi-checkbox-blank-circle"
				:title="$t('user.status.online')"
			>
				<template #prepend>
					<span class="status-indicator bg-success"></span>
				</template>
			</v-list-item>

			<v-list-item
				@click.stop="changeStatus('offline')"
				prepend-icon="mdi-checkbox-blank-circle-outline"
				:title="$t('user.status.offline')"
			>
				<template #prepend>
					<span class="status-indicator bg-grey"></span>
				</template>
			</v-list-item>

			<v-list-item
				@click.stop="changeStatus('away')"
				prepend-icon="mdi-checkbox-blank-circle"
				:title="$t('user.status.away')"
			>
				<template #prepend>
					<span class="status-indicator bg-warning"></span>
				</template>
			</v-list-item>

			<v-list-item
				@click.stop="changeStatus('busy')"
				prepend-icon="mdi-checkbox-blank-circle"
				:title="$t('user.status.busy')"
			>
				<template #prepend>
					<span class="status-indicator bg-error"></span>
				</template>
			</v-list-item>
		</v-list>
	</v-menu>
</template>
