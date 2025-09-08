import { describe, it, expect } from 'vitest';
import { useModal } from '../useModal';

describe('useModal', () => {
	it('opens and closes modal', () => {
		const { open, close, isOpen } = useModal();
		open('test');
		expect(isOpen('test')).toBe(true);
		close('test');
		expect(isOpen('test')).toBe(false);
	});

	it('toggles modal state', () => {
		const { toggle, isOpen } = useModal();
		toggle('toggleModal');
		expect(isOpen('toggleModal')).toBe(true);
		toggle('toggleModal');
		expect(isOpen('toggleModal')).toBe(false);
	});

	it('stores arbitrary data', () => {
		const { open, getData } = useModal();
		open('withData', { foo: 'bar' });
		expect(getData<{ foo: string }>('withData')).toEqual({ foo: 'bar' });
	});
});
