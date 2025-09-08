/**
 * Copyright (C) Logos - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Tiago Souza tiagohaasouza@gmail.com
 * If you purchased this software, see the license.txt file contained in this source code for more information and possible exceptions.
 */
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
	state: () => ({
		name: 'Anonymous',
		surname: 'Vendetta',
		role: 'admin',
		status: 'offline',
		email: 'anonymous@gmail.com',
		avatar: '',
		preferences: {
			theme: 'light',
			language: 'pt-br',
		},
	}),
	actions: {
		setName(name: string) {
			this.name = name;
		},
		setSurname(surname: string) {
			this.surname = surname;
		},
		setRole(role: string) {
			this.role = role;
		},
		setStatus(status: string) {
			this.status = status;
		},
		setEmail(email: string) {
			this.email = email;
		},
		setAvatar(avatar: string) {
			this.avatar = avatar;
		},
		setPreferences(preferences: { theme: string; language: string }) {
			this.preferences = preferences;
		},
		updateUser(user: {
			name: string;
			surname: string;
			role: string;
			status: string;
			email: string;
			avatar: string;
			preferences: { theme: string; language: string };
		}) {
			this.name = user.name;
			this.surname = user.surname;
			this.role = user.role;
			this.status = user.status;
			this.email = user.email;
			this.avatar = user.avatar;
			this.preferences = user.preferences;
		},
	},
	getters: {
		getName: (state) => state.name,
		getSurname: (state) => state.surname,
		getRole: (state) => state.role,
		getStatus: (state) => state.status,
		getEmail: (state) => state.email,
		getAvatar: (state) => state.avatar,
		getPreferences: (state) => state.preferences,
		getTheme: (state) => state.preferences.theme,
		getLanguage: (state) => state.preferences.language,
		getFullName: (state) => `${state.name} ${state.surname}`,
		isOnline: (state) => state.status === 'online',
	},
});
