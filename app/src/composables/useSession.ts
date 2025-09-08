/**
 * Copyright (C) Logos - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Tiago Souza tiagohaasouza@gmail.com
 * If you purchased this software, see the license.txt file contained in this source code for more information and possible exceptions.
 */
import { ref, computed } from 'vue';
import axios from 'axios';
import { useStorage } from '@vueuse/core';

interface SessionTokens {
	accessToken: string;
	refreshToken: string;
}

let refreshTimer: ReturnType<typeof setTimeout> | null = null;

function parseExp(token: string): number | null {
	try {
		const payload = JSON.parse(atob(token.split('.')[1] || ''));
		if (payload && payload.exp) {
			return payload.exp * 1000;
		}
	} catch (_err) {
		// ignore
	}
	return null;
}

function scheduleRefresh(expiresAt: number | null, fn: () => void) {
	if (refreshTimer) {
		clearTimeout(refreshTimer);
	}
	if (!expiresAt) {
		return;
	}
	const timeout = expiresAt - Date.now() - 60000;
	refreshTimer = setTimeout(() => fn(), Math.max(timeout, 0));
}

export function useSession() {
	const accessToken = useStorage<string | null>('accessToken', null);
	const refreshToken = useStorage<string | null>('refreshToken', null);
	const expiresAt = ref<number | null>(parseExp(accessToken.value || ''));

	const isAuthenticated = computed(() => Boolean(accessToken.value));

	scheduleRefresh(expiresAt.value, refresh);

	async function login(tokens: SessionTokens) {
		accessToken.value = tokens.accessToken;
		refreshToken.value = tokens.refreshToken;
		expiresAt.value = parseExp(tokens.accessToken);
		scheduleRefresh(expiresAt.value, refresh);
	}

	function logout() {
		accessToken.value = null;
		refreshToken.value = null;
		expiresAt.value = null;
		if (refreshTimer) {
			clearTimeout(refreshTimer);
			refreshTimer = null;
		}
	}

	async function refresh() {
		if (!refreshToken.value) {
			logout();
			return;
		}
		try {
			const { data } = await axios.post<SessionTokens>('/auth/refresh', {
				refreshToken: refreshToken.value,
			});
			accessToken.value = data.accessToken;
			refreshToken.value = data.refreshToken;
			expiresAt.value = parseExp(data.accessToken);
			scheduleRefresh(expiresAt.value, refresh);
		} catch (_err) {
			logout();
		}
	}

	return {
		accessToken,
		refreshToken,
		expiresAt,
		isAuthenticated,
		login,
		logout,
		refresh,
	};
}
