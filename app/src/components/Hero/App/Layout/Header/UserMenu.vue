<script>
import { defineComponent } from 'vue';
import avatar from '@/assets/images/avatar.png';
import UserStatusMenu from '@components/Hero/App/Layout/Header/UserStatusMenu.vue';
import { useUserStore } from '@stores/user';

export default defineComponent({
	components: { UserStatusMenu },
	data() {
		return {
			userStore: useUserStore(),
			avatar: avatar,
		};
	},
	computed: {
		userName() {
			return `${this.userStore.getName} ${this.userStore.getSurname}`;
		},
		userRole() {
			return this.userStore.getRole || 'user';
		},
		statusColor() {
			switch (this.userStore.getStatus) {
				case 'online':
					return 'success';
				case 'offline':
					return 'grey';
				case 'away':
					return 'warning';
				case 'busy':
					return 'error';
				default:
					return 'grey';
			}
		},
	},
});
</script>

<style scoped lang="less">
.main-menu {
}

.main-list {
	min-width: 250px;
}

.user-card {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 16px;
}

.user-info {
	text-align: center;
	margin-top: 8px;
}

.user-avatar {
	border: 2px solid var(--v-primary-base);
}

.divider {
	margin: 8px 0;
}
</style>

<template>
	<v-menu offset-y class="main-menu">
		<template #activator="{ props }">
			<v-btn icon class="me-2" v-bind="props" aria-haspopup="true">
				<v-badge :color="statusColor" location="bottom end" overlap dot>
					<v-avatar :image="userStore.getAvatar || avatar" variant="outlined" class="user-avatar" />
				</v-badge>
				<v-tooltip activator="parent" location="bottom">{{ $t('user.menu.userMenu') }}</v-tooltip>
			</v-btn>
		</template>

		<v-list density="comfortable" nav class="main-list">
			<v-list-item tabindex="0">
				<v-card class="user-card" flat>
					<v-avatar
						:image="userStore.getAvatar || avatar"
						size="80"
						variant="outlined"
						class="user-avatar"
					/>
					<div class="user-info">
						<div class="user-name">{{ userName }}</div>
						<div class="user-role">{{ $t(`user.role.${userRole}.label`, 1) }}</div>
					</div>
				</v-card>
			</v-list-item>

			<v-divider class="divider" />

			<UserStatusMenu tabindex="0" />

			<v-divider class="divider" />

			<v-list-item link prepend-icon="mdi-account" :title="$t('profile.label', 1)" tabindex="0" />
			<v-list-item link prepend-icon="mdi-cog" :title="$t('settings.label', 2)" tabindex="0" />
			<v-list-item
				link
				prepend-icon="mdi-currency-usd"
				:title="$t('pricing.label', 2)"
				tabindex="0"
			/>
			<v-list-item link prepend-icon="mdi-help-circle" :title="$t('faq')" tabindex="0" />

			<v-divider class="divider" />

			<v-list-item tabindex="0">
				<Button prepend-icon="mdi-logout" variant="outlined" block>
					{{ $t('logout') }}
				</Button>
			</v-list-item>
		</v-list>
	</v-menu>
</template>
