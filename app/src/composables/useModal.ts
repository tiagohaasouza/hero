import { reactive } from 'vue';

export interface ModalState<T = unknown> {
	isOpen: boolean;
	data?: T;
}

const modals = reactive<Record<string, ModalState>>({});

export function useModal() {
	function open<T = unknown>(name: string, data?: T) {
		if (!modals[name]) {
			modals[name] = { isOpen: false };
		}
		modals[name].isOpen = true;
		(modals[name] as ModalState<T>).data = data;
	}

	function close(name: string) {
		if (!modals[name]) return;
		modals[name].isOpen = false;
		modals[name].data = undefined;
	}

	function toggle<T = unknown>(name: string, data?: T) {
		modals[name]?.isOpen ? close(name) : open(name, data);
	}

	function isOpen(name: string): boolean {
		return !!modals[name]?.isOpen;
	}

	function getData<T = unknown>(name: string): T | undefined {
		return modals[name]?.data as T | undefined;
	}

	return { modals, open, close, toggle, isOpen, getData };
}
