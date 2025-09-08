<script lang="ts">
import { defineComponent } from 'vue';
import app from '@app';

interface NotificationItem {
	id: number;
	title: string;
	subtitle: string;
	icon: string;
	color: string;
	time: string;
	priority: 'low' | 'medium' | 'high' | 'urgent';
}

export default defineComponent({
	data() {
		return {
			notifications: Array.from({ length: 15 }, (_, index) => ({
				id: index,
				title: `Notification ${index + 1}`,
				subtitle: 'Lorem ipsum dolor sit amet consectetur.',
				icon: index % 2 === 0 ? 'mdi-robot-outline' : 'mdi-account-circle',
				color: ['primary', 'success', 'info', 'warning', 'error'][index % 5],
				time: `${index + 1} min ago`,
				priority: ['low', 'medium', 'high', 'urgent'][index % 4] as NotificationItem['priority'],
			})),
			visibleItems: 5,
			loadedItems: 5,
			totalItems: 15,
			itemHeight: 72,
		};
	},
	methods: {
		async loadMore({
			side,
			done,
		}: {
			side: 'top' | 'bottom';
			done: (status: 'ok' | 'empty') => void;
		}): Promise<void> {
			if (this.loadedItems < this.totalItems) {
				await new Promise((resolve) => setTimeout(resolve, 2000));
				this.loadedItems += 5;
				done('ok');
			} else {
				done('empty');
			}
		},
		navigateToNotifications(): void {
			app.router.navigateByPath('/notifications');
		},
		getBadgeColor(priority: NotificationItem['priority']): string {
			switch (priority) {
				case 'low':
					return 'success';
				case 'medium':
					return 'info';
				case 'high':
					return 'warning';
				case 'urgent':
					return 'error';
				default:
					return 'grey';
			}
		},
		navigateToNotification(item: { id: number }): void {
			app.router.navigateByPath(`/notifications/${item.id}`);
		},
	},
});
</script>

<style scoped lang="less">
.truncated-text {
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	max-width: 250px;
}

.v-list-item:hover {
	background-color: #f5f5f5;
}
</style>

<template>
	<v-menu offset-y>
		<template #activator="{ props }">
			<v-btn icon v-bind="props">
				<v-badge :content="3" color="error">
					<v-icon>mdi-bell-outline</v-icon>
					<v-tooltip activator="parent" location="bottom">{{
						$t('notification.showNotifications')
					}}</v-tooltip>
				</v-badge>
			</v-btn>
		</template>

		<v-list>
			<v-list-subheader>
				<div class="d-flex align-center">
					<v-list-subheader class="flex-grow-1" style="padding: 0">
						<span class="font-weight-bold">{{ $t('notification.label', 2) }}</span>
					</v-list-subheader>
					<div>
						<v-btn color="primary" density="compact" @click="navigateToNotifications">
							{{ totalItems }}
						</v-btn>
					</div>
				</div>
			</v-list-subheader>

			<v-divider />

			<v-infinite-scroll
				:height="itemHeight * visibleItems"
				:items="notifications.slice(0, loadedItems)"
				:onLoad="loadMore"
			>
				<template v-for="(item, index) in notifications.slice(0, loadedItems)" :key="index">
					<v-list-item
						class="v-list-item--three-line"
						@click="navigateToNotification(item)"
						style="cursor: pointer"
					>
						<template #prepend>
							<v-badge
								:content="item.priority === 'urgent' ? '!' : ''"
								:color="getBadgeColor(item.priority)"
								location="bottom right"
								overlap
								dot
							>
								<v-avatar :color="item.color" size="40">
									<v-icon>{{ item.icon }}</v-icon>
								</v-avatar>
							</v-badge>
						</template>

						<div class="d-flex flex-column">
							<v-list-item-title class="font-weight-bold text-primary truncated-text">{{
								item.title
							}}</v-list-item-title>
							<v-list-item-subtitle class="truncated-text">{{
								item.subtitle
							}}</v-list-item-subtitle>
						</div>

						<template #append>
							<span class="text-body-2 text-grey">{{ item.time }}</span>
						</template>
					</v-list-item>
				</template>

				<template #empty>
					<v-alert type="warning">{{ $t('notification.allLoaded') }}</v-alert>
				</template>
			</v-infinite-scroll>

			<v-divider class="bottom-divider" />
			<div class="text-center py-5">
				<v-btn variant="outlined" color="primary" @click="navigateToNotifications">{{
					$t('notification.seeAll')
				}}</v-btn>
			</div>
		</v-list>
	</v-menu>
</template>
