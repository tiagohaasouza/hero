/**
 * Copyright (C) Logos - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Tiago Souza tiagohaasouza@gmail.com
 * If you purchased this software, see the license.txt file contained in this source code for more information and possible exceptions.
 */
import BookError from '@script/Book/Error/BookError';
import Timer from '@script/Logos/Timer/Timer';
import BookIndex from '@script/Book/Content/BookIndex';
import BookMeta from '@script/Book/Meta/BookMeta';
import IndexedDBImages from '@script/Logos/DataBase/IndexedDBImages';
import BookPage from '@script/Book/Content/BookPage';
import { TPageMetrics } from '@script/Book/type';
import BookSize from '@script/Book/Content/BookSize';

/**
 * BookContent
 *
 * @description Class BookContent
 * @class BookContent
 * @extends
 * @implements
 * @constructor
 */

export default class BookContent {
	#elements: Element[] = [];
	#containerWidth: number = 0;
	#containerHeight: number = 0;
	#wrappers: HTMLElement[] = [];
	#currentWrapper: HTMLElement | null = null;
	#pagesElement: HTMLElement | null = null;
	#counter: number = 0;

	constructor(
		elements: Element[],
		containerDimensions: { width: string | number; height: string | number },
		pagesElement: HTMLElement,
	) {
		this.#elements = elements;
		this.#containerWidth = containerDimensions.width as number;
		this.#containerHeight = containerDimensions.height as number;
		this.#pagesElement = pagesElement;
	}

	async wrapContent() {
		console.log('CONTAINER HEIGHT', this.#containerHeight);

		this.#counter = 0;
		const total: number = this.#elements.length;
		let counter: number = 0;

		for (let i = 0; i < total; i++) {
			const element: Element = await this.parseElement(this.#elements[i]);
			const height: number = element.getBoundingClientRect().height;

			// Cria um wrapper especial se o elemento exceder a altura permitida.
			if (height > this.#containerHeight) {
				this.#createWrapper(true, element);
				continue;
			}

			// Cria um novo wrapper se o atual não existir ou se adicionar este elemento exceder a altura permitida.
			if (
				!this.#currentWrapper ||
				this.#currentWrapper.offsetHeight + height > this.#containerHeight
			) {
				this.#createWrapper();
			}

			// Adiciona o elemento ao wrapper atual.
			this.#currentWrapper!.appendChild(element);

			// Adiciona um atraso a cada 500 elementos processados para não bloquear a UI.
			if (++counter === 500) {
				counter = 0;
				await Timer.delay(0.5);
			}
		}

		console.log('WRAPPERS', this.#wrappers.length);
		for (let i = 0; i < this.#wrappers.length; i++) {
			const wrapper: HTMLElement = this.#wrappers[i];
			const height: number = wrapper.offsetHeight;

			if (height > this.#containerHeight) {
				console.warn(`WRAPPER[${i}] exceeded height`, height);
			}

			console.log('WRAPPER', i, height);
		}
	}

	#createWrapper(exceededHeight: boolean = false, element: Element | null = null): HTMLElement {
		const wrapper: HTMLElement = document.createElement('div');
		wrapper.classList.add('book-content-wrapper');

		//wrapper.style.width = `${this.#containerWidth}px`;
		//wrapper.style.height = `${this.#containerHeight}px`;

		if (exceededHeight) {
			wrapper.classList.add('exceeded-height');
		}

		// Se um elemento for fornecido e exceder a altura, adiciona-o ao wrapper antes de anexá-lo ao DOM.
		if (element) {
			wrapper.appendChild(element);
		}

		// Adiciona o wrapper à lista e ao DOM apenas depois que ele estiver completo.
		this.#wrappers.push(wrapper);
		this.#pagesElement!.appendChild(wrapper);

		this.#currentWrapper = wrapper;

		console.log(`WRAPPER[${++this.#counter}] created`);

		return wrapper;
	}
	#parseImage(image: HTMLImageElement): Promise<HTMLImageElement> {
		return new Promise((resolve) => {
			if (image.complete && image.naturalHeight !== 0) resolve(image);
			else {
				image.onload = () => resolve(image);
				image.onerror = () => resolve(image);
			}
		});
	}

	#parseFigure(figure: HTMLElement): Promise<HTMLElement> {
		return new Promise((resolve) => {
			const images = figure.querySelectorAll('img');

			if (images.length === 0) resolve(figure);
			else {
				let loadedImages = 0;
				images.forEach((img) => {
					if (img.complete && img.naturalHeight !== 0) {
						loadedImages++;
						if (loadedImages === images.length) resolve(figure);
					} else {
						img.onload = () => {
							loadedImages++;
							if (loadedImages === images.length) resolve(figure);
						};
						img.onerror = () => {
							loadedImages++;
							if (loadedImages === images.length) resolve(figure);
						};
					}
				});
			}
		});
	}

	parseElement(element: Element): Promise<Element> {
		return new Promise((resolve) => {
			if (element instanceof HTMLImageElement) this.#parseImage(element).then(resolve);
			else if (element.tagName.toLowerCase() === 'figure')
				this.#parseFigure(element as HTMLElement).then(resolve);
			else resolve(element);
		});
	}
}
