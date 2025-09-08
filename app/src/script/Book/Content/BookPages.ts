/**
 * Copyright (C) Logos - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Tiago Souza tiagohaasouza@gmail.com
 * If you purchased this software, see the license.txt file contained in this source code for more information and possible exceptions.
 */
import BookPage from '@script/Book/Content/BookPage';
import { TPageMetrics } from '@script/Book/type';
import EventDispatcher from '@script/Logos/Event/EventDispatcher';
import BookSize from '@script/Book/Content/BookSize';

/**
 * BookPages
 *
 * @description Class BookPages
 * @class BookPages
 * @extends
 * @implements
 * @constructor
 */
export default class BookPages extends EventDispatcher {
	#pages: BookPage[] = [];
	#parent: HTMLElement;

	#currentPage?: BookPage;

	constructor(parent: HTMLElement) {
		super();
		this.#parent = parent;
	}

	build(elements: Element[], startPage: number = 0): BookPages {
		if (!this.#currentPage) this.#currentPage = new BookPage(this.#parent);
		console.log('BookPages.build', this.#parent, this.#currentPage);

		const htmlElements = elements.filter((el): el is HTMLElement => el instanceof HTMLElement);
		this.#currentPage.build(htmlElements);

		return this;
	}
}
