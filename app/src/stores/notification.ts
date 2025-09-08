import { defineStore } from 'pinia';

interface Notification {
        id: number;
        title: string;
        message: string;
        type: string;
        read: boolean;
}

export const useNotificationStore = defineStore('notification', {
        state: () => ({
                notifications: [] as Notification[],
        }),
        getters: {
                unread: (state) => state.notifications.filter((n) => !n.read),
                all: (state) => state.notifications,
        },
        actions: {
                add(notification: Omit<Notification, 'read'>) {
                        this.notifications.unshift({ ...notification, read: false });
                },
                markAsRead(id: number) {
                        const notification = this.notifications.find((n) => n.id === id);
                        if (notification) notification.read = true;
                },
                remove(id: number) {
                        this.notifications = this.notifications.filter((n) => n.id !== id);
                },
                clear() {
                        this.notifications = [];
                },
        },
});

