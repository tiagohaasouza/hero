/**
 * Copyright (C) Logos - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Tiago Souza tiagohaasouza@gmail.com
 * If you purchased this software, see the license.txt file contained in this source code for more information and possible exceptions.
 */
import toPx from 'to-px';
import IndexedDBImages from '@script/Logos/DataBase/IndexedDBImages';
import BookIndex from '@script/Book/Content/BookIndex';
import BookPage from '@script/Book/Content/BookPage';
import BookPages from '@script/Book/Content/BookPages';
import BookMeta from '@script/Book/Meta/BookMeta';
import { TPageMetrics } from '@script/Book/type';
import EventDispatcher from '@script/Logos/Event/EventDispatcher';
import BookError from '@script/Book/Error/BookError';
import { countWordsFromHTML } from '@script/Logos/Util/string';
import app from '@app';
import BookSize from '@script/Book/Content/BookSize';
import Timer from '@script/Logos/Timer/Timer';
import BookContent from '@script/Book/Content/BookContent';
/**
 * Book
 *
 * @description Class Book
 * @class Book
 * @extends
 * @implements
 * @constructor
 */
export default class Book extends EventDispatcher {
	static ASSETS_URL: string = '/book/';
	readonly #id: string;

	ready: boolean = false;
	#index: BookIndex = new BookIndex();
	#meta: BookMeta = new BookMeta();

	#dataBaseImages: IndexedDBImages;
	#pages: BookPage[] = [];
	#currentPage: BookPage | null = null;

	#size?: string;
	#orientation?: string;
	#pageMetrics?: TPageMetrics;

	#bookElement: HTMLElement | null = null;
	#originalContent: HTMLElement | null = null;
	#notesElement: HTMLElement | null = null;
	#pagesElement: HTMLElement | null = null;

	#chapters: Element[] = [];
	#elements: Element[] = [];

	#isDefaultsSet: boolean = false;
	#bookContent: BookContent | null = null;

	constructor(id: string) {
		super();
		this.#id = id;
		this.#dataBaseImages = new IndexedDBImages(`${id}-images`);
	}

	setDefaults(
		bookElement: HTMLElement,
		size: string = BookSize.A4,
		orientation: string = BookSize.PORTRAIT,
		itemsPerBatch: number = 500,
		batchDelay: number = 100,
	) {
		this.#bookElement = bookElement;
		this.#originalContent = bookElement.querySelector('.book-content');
		this.#notesElement = bookElement.querySelector('.book-notes');
		this.#pagesElement = bookElement.querySelector('.book-pages');

		if (!this.#originalContent) throw new BookError(BookError.ELEMENT_NOT_FOUND, ['.book-content']);
		if (!this.#notesElement) throw new BookError(BookError.ELEMENT_NOT_FOUND, ['.book-notes']);
		if (!this.#pagesElement) throw new BookError(BookError.ELEMENT_NOT_FOUND, ['.book-pages']);

		this.#size = size;
		this.#orientation = orientation;

		this.#elements = Array.from(this.#originalContent.querySelectorAll('.book-chapter'))
			.map((chapter: Element) => {
				this.#chapters.push(chapter);
				return Array.from(chapter.children);
			})
			.flat();

		this.#pageMetrics = BookSize.toPx(size, orientation);

		if (!this.#pageMetrics.container) throw new BookError(BookError.INVALID_PAGE_CONTAINER_METRICS);
		this.#bookContent = new BookContent(
			this.#elements,
			this.#pageMetrics.container,
			this.#pagesElement!,
		);

		this.#isDefaultsSet = true;

		return this;
	}

	async wrapContent() {
		if (!this.#isDefaultsSet) throw new BookError(BookError.DEFAULTS_NOT_SET);
		await this.#bookContent!.wrapContent();
	}

	parseElement(element: Element): Promise<Element> {
		return this.#bookContent!.parseElement(element);
	}

	get id(): string {
		return this.#id;
	}

	get assetsURL(): string {
		return `${Book.ASSETS_URL}${this.#id}`;
	}

	get dataBaseImages(): IndexedDBImages {
		return this.#dataBaseImages;
	}

	get index(): BookIndex {
		return this.#index;
	}

	get meta(): BookMeta {
		return this.#meta;
	}

	get size(): string | undefined {
		return this.#size;
	}

	get orientation(): string | undefined {
		return this.#orientation;
	}
}
