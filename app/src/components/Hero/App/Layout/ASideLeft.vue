<!--
* Copyright (C) Logos - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Written by Tiago Souza tiagohaasouza@gmail.com
* If you purchased this software, see the license.txt file contained in this source code for more information and possible exceptions.
-->
<script>
import { defineComponent } from 'vue';
import avatar from '@assets/images/avatar.png';
import logo from '@assets/images/logo/logo-3.png';
import { useUserStore } from '@stores/user';
//import { navigateByPath } from '@/router';
import Logo from '@/components/Hero/App/Layout/Logo.vue';
import app from '@app';

export default defineComponent({
	components: { Logo },
	props: {},
	data() {
		return {
			backgroundCounter: 10,
			backgroundImage: '',
			rail: false,
			logo,
			avatar,
			userStore: useUserStore(),
			isOpened: true,
		};
	},
	methods: {
		async navigateTo(path) {
			await app.router.navigateByPath(path);
			//await navigateByPath(path);
		},
		onClick(e) {
			this.backgroundCounter = (this.backgroundCounter + 1) % 28;

			if (e.target?.classList.contains('list-container-overlay')) this.updateBackground();
		},
		updateBackground() {
			this.backgroundImage = `url('/assets/backgrounds/aside/${this.backgroundCounter}.png')`;
		},
		open() {
			this.isOpened = true;
		},
		close() {
			this.isOpened = false;
		},
		isActive(route) {
			return this.$route.path === route;
		},
	},
	computed: {
		userName() {
			return `${this.userStore.getName} ${this.userStore.getSurname}`;
		},
		userRole() {
			return this.userStore.getRole || 'user';
		},
	},
	created() {},
	mounted() {
		this.updateBackground();
	},
	beforeUnmount() {},
	unmounted() {},
});
</script>

<style scoped lang="less">
.list-container {
	background-image: v-bind(backgroundImage);
	background-size: contain;
	background-repeat: no-repeat;
	background-position: top left;
	background-attachment: fixed;
	width: 100%;
	height: 100%;
	position: relative;
}

.list-container-overlay {
	//background-color: rgba(255, 255, 255, 0.8);
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}

.v-list-item:active,
.v-list-item.v-list-item--active {
	pointer-events: none !important;
	user-select: none !important;
	cursor: default !important;
}

.logo-link {
	text-decoration: none;
}
</style>

<template>
	<div class="aside-left-container">
		<v-navigation-drawer
			v-model="isOpened"
			app
			class="navigation-drawer"
			v-bind="$attrs"
			:rail="rail"
			@click="onClick"
		>
			<template v-slot:prepend>
				<router-link to="/" class="logo-link">
					<Logo class="logo" />
				</router-link>
			</template>

			<div class="list-container">
				<div class="list-container-overlay background-overlay"></div>
				<!--
				<router-link to="/" class="logo-link">

					<Logo class="logo" />

				</router-link>
				-->
				<v-divider />

				<v-list density="compact" nav slim class="navigation-list">
					<v-list-subheader>{{ $t('user.label', 2) }}</v-list-subheader>

					<v-list-item
						@click="navigateTo('/')"
						:active="isActive('/')"
						link
						prepend-icon="mdi-view-dashboard"
						:title="$t('user.dashboard')"
					/>

					<v-list-group fluid>
						<template #activator="{ props: activatorProps }">
							<v-list-item
								v-bind="activatorProps"
								prepend-icon="mdi-book-open-page-variant"
								:subtitle="$t('book.read.label', 2)"
								:title="$t('book.label', 2)"
							/>
						</template>

						<v-list-item
							@click="navigateTo('/books')"
							:active="isActive('/books')"
							link
							prepend-icon="mdi-book-open-variant"
							title="A ordem de Melquisedeque"
						/>
					</v-list-group>

					<v-list-group fluid>
						<template #activator="{ props: activatorProps }">
							<v-list-item
								v-bind="activatorProps"
								prepend-icon="mdi-account-circle"
								:subtitle="$t('user.manageAccount')"
								:title="$t('user.account.label')"
							/>
						</template>

						<v-list-item
							@click="navigateTo('/downloads')"
							:active="isActive('/downloads')"
							link
							prepend-icon="mdi-circle-small"
							:title="$t('user.downloads.label', 2)"
						/>
						<v-list-item
							@click="navigateTo('/subscriptions')"
							:active="isActive('/subscriptions')"
							link
							prepend-icon="mdi-circle-small"
							:title="$t('user.subscriptions.label', 2)"
						/>
						<v-list-item
							@click="navigateTo('/history')"
							:active="isActive('/history')"
							link
							prepend-icon="mdi-circle-small"
							:title="$t('user.history')"
						/>
					</v-list-group>

					<!-- Charts -->
					<v-list-group fluid>
						<template #activator="{ props: activatorProps }">
							<v-list-item
								v-bind="activatorProps"
								prepend-icon="mdi-chart-areaspline"
								:title="$t('chart.label', 2)"
							/>
						</template>

						<v-list-item
							@click="navigateTo('/charts/chart-js')"
							:active="isActive('/charts/chart-js')"
							link
							prepend-icon="mdi-circle-small"
							title="Charts JS"
						/>
						<v-list-item
							@click="navigateTo('/charts/apex-charts')"
							:active="isActive('/charts/apex-charts')"
							link
							prepend-icon="mdi-circle-small"
							title="Apex Charts"
						/>
					</v-list-group>

					<v-list-subheader>{{ $t('social.label', 2) }}</v-list-subheader>
					<v-list-item link prepend-icon="mdi-account-group" :title="$t('social.friends.label', 2)">
						<template #append>
							<v-badge content="39" inline />
						</template>
					</v-list-item>
					<v-list-item
						@click="navigateTo('/notifications')"
						:active="isActive('/notifications')"
						link
						prepend-icon="mdi-bell-badge"
						:title="$t('notification.label', 2)"
					/>
					<v-list-subheader>{{ $t('commerce.label', 2) }}</v-list-subheader>
					<v-list-item
						@click="navigateTo('/sales')"
						:active="isActive('/sales')"
						link
						prepend-icon="mdi-currency-usd"
						:title="$t('commerce.sales.label', 2)"
					/>
					<v-list-item
						@click="navigateTo('/projections')"
						:active="isActive('/projections')"
						link
						prepend-icon="mdi-trending-up"
						:title="$t('commerce.projections.label', 2)"
					/>
				</v-list>
			</div>

			<template #append>
				<v-divider />
				<v-list-item
					@click="navigateTo('/logout')"
					:active="isActive('/logout')"
					append-icon="mdi-logout"
					density="compact"
					nav
					:prepend-avatar="userStore.getAvatar || avatar"
					:subtitle="$t(`user.role.${userRole}.label`, 1)"
					:title="userName"
				>
					<template #append>
						<v-btn density="comfortable" icon size="small" variant="text">
							<v-icon>mdi-logout</v-icon>
						</v-btn>
					</template>
				</v-list-item>
			</template>
		</v-navigation-drawer>
	</div>
</template>
