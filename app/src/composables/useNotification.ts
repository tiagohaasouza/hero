import { ref } from 'vue';
import { toast, ToastOptions } from 'vue3-toastify';

type NotificationType = 'success' | 'error' | 'warning' | 'info';

interface QueueItem {
	message: string;
	type: NotificationType;
	duration: number;
	options?: ToastOptions;
}

const queue = ref<QueueItem[]>([]);
const active = ref(false);

function showNext(): void {
	if (active.value || queue.value.length === 0) return;
	active.value = true;
	const { message, type, duration, options } = queue.value.shift()!;
	toast(message, {
		type,
		autoClose: duration,
		onClose: () => {
			active.value = false;
			showNext();
		},
		...options,
	});
}

function enqueue(message: string, {
	type = 'info',
	duration = 3000,
	options,
}: Partial<Omit<QueueItem, 'message'>> = {}): void {
	queue.value.push({ message, type, duration, options });
	showNext();
}

function success(message: string, duration?: number, options?: ToastOptions): void {
	enqueue(message, { type: 'success', duration, options });
}

function error(message: string, duration?: number, options?: ToastOptions): void {
	enqueue(message, { type: 'error', duration, options });
}

function warning(message: string, duration?: number, options?: ToastOptions): void {
	enqueue(message, { type: 'warning', duration, options });
}

export function useNotification() {
	return { notify: enqueue, success, error, warning, queue };
}
