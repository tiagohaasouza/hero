/**
 * Copyright (C) Logos - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Tiago Souza tiagohaasouza@gmail.com
 * If you purchased this software, see the license.txt file contained in this source code for more information and possible exceptions.
 */
import { TPageMetrics } from '@script/Book/type';
import { vsprintf } from 'sprintf-js';
import BookSize from '@script/Book/Content/BookSize';
import EventDispatcher from '@script/Logos/Event/EventDispatcher';
/**
 * BookPage
 *
 * @description Class BookPage
 * @class BookPage
 * @extends
 * @implements
 * @constructor
 */
export default class BookPage extends EventDispatcher {
	static numberCounter = 0;
	static readonly TEMPLATE = `
    <div class="book-page-container">
      <ul class="book-page {SIZE} {ORIENTATION} elevation-2 clearfix" data-number="{NUMBER}">
        <li class="top-left corner"></li>
        <li class="top-center horizontal"></li>
        <li class="top-right corner"></li>
        <li class="center-left vertical"></li>
        <li class="content-center center-center">
          <div class="contents">
	          <div class="book-page-content content-top"></div>
	          <div class="book-page-content content-bottom"></div>
			</div>
        </li>
        <li class="center-right vertical"></li>
        <li class="bottom-left corner"></li>
        <li class="bottom-center horizontal">{NUMBER}</li>
        <li class="bottom-right corner"></li>
      </ul>
    </div>
  `;

	#number: number = ++BookPage.numberCounter;
	#element: HTMLElement;

	#contents: HTMLElement;
	#contentCenterElement: HTMLElement;
	#contentTopElement: HTMLElement;

	constructor(parent: Element, size = 'a4', orientation = 'portrait') {
		super();

		const templateHTML = BookPage.TEMPLATE.replace('{SIZE}', size)
			.replace('{ORIENTATION}', orientation)
			.replaceAll('{NUMBER}', String(this.#number));

		const tempContainer = document.createElement('div');
		tempContainer.innerHTML = templateHTML.trim();

		const element = tempContainer.firstElementChild as HTMLElement | null;
		if (!element) {
			throw new Error('Failed to create book page element');
		}
		this.#element = element;

		const contents = this.#element.querySelector<HTMLElement>('.contents');
		const contentCenter = this.#element.querySelector<HTMLElement>('.content-center');
		const contentTop = this.#element.querySelector<HTMLElement>('.content-top');

		if (!contents || !contentCenter || !contentTop) {
			throw new Error('Book page template is missing required elements');
		}

		this.#contents = contents;
		this.#contentCenterElement = contentCenter;
		this.#contentTopElement = contentTop;

		parent.appendChild(this.#element);
	}
	build(_elements: Element[]): void {
		// Implementation placeholder
	}
	hasSpace(element: HTMLElement): boolean {
		//console.log('hasSpace?', (this.#contents.offsetHeight + element.offsetHeight) <= this.#contentCenterElement.offsetHeight, 'contents.offsetHeight', this.#contents.offsetHeight, 'element.offsetHeight', element.offsetHeight, 'contentCenterElement.offsetHeight', this.#contentCenterElement.offsetHeight);

		//console.log(element.clientHeight, element.offsetHeight, element.scrollHeight, element.getBoundingClientRect().height, window.getComputedStyle(element).height);

		return (
			this.#contents.offsetHeight + element.offsetHeight <= this.#contentCenterElement.offsetHeight
		);
	}
	async addElement(element: HTMLElement): Promise<boolean> {
		this.#contentTopElement.appendChild(element);
		return true;
	}

	build(elements: HTMLElement[]): void {
		for (const element of elements) {
			void this.addElement(element);
		}
	}

	addElement(element: HTMLElement): boolean {
		this.#contentTopElement.appendChild(element);
		return true;
	}

	#addDimensionBadges() {
		const listItems = this.#element.querySelectorAll<HTMLElement>('li');

		listItems.forEach((li: HTMLElement) => {
			// Get the computed width and height after rendering.
			const width = li.offsetWidth;
			const height = li.offsetHeight;

			// Create a badge element.
			const badge = document.createElement('span');
			badge.className = 'book-dimension-badge';
			badge.textContent = `${width}px x ${height}px`;

			// Ensure the badge is added to the li element.
			li.style.position = 'relative';
			li.appendChild(badge);
		});
	}

	static create(parent: Element, size = 'a4', orientation = 'portrait'): BookPage {
		return new BookPage(parent, size, orientation);
	}

	build(elements: Element[]): this {
		elements.forEach((el) => {
			if (el instanceof HTMLElement) {
				void this.addElement(el);
			}
		});
		return this;
	}
}
