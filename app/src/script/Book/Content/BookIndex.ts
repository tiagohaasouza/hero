/**
 * Copyright (C) Logos - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Tiago Souza tiagohaasouza@gmail.com
 * If you purchased this software, see the license.txt file contained in this source code for more information and possible exceptions.
 */
import { TIndexMenuChapter, TIndexMenuText } from '@script/Book/type';
import { slug as stringSlug } from '@script/Logos/Util/string';
import BookError from '@script/Book/Error/BookError';

/**
 * BookIndex
 *
 * @description Class BookIndex
 * @class BookIndex
 * @extends
 * @implements
 * @constructor
 */

export default class BookIndex {
	#data: TIndexMenuChapter[] = [];
	/**
	 * Constructs a new instance of the BookIndex class.
	 */
	public constructor() {}

	addChapter(title: string, data: TIndexMenuText[] = []): TIndexMenuChapter {
		const slug: string = stringSlug(title);
		const content: TIndexMenuChapter = { title, slug, href: `#${slug}`, data };
		this.#data.push(content);

		return content;
	}

	addText(chapterTitle: string, title: string): TIndexMenuText {
		const chapterSlug: string = stringSlug(chapterTitle);
		const slug: string = `${chapterSlug}-${stringSlug(title)}`;
		const index: number = this.#data.findIndex(
			(item: TIndexMenuChapter): boolean => item.slug === chapterSlug,
		);

		if (index === -1) throw new BookError(BookError.CHAPTER_NOT_FOUND, [chapterTitle]);

		const content: TIndexMenuText = { title, slug, href: `#${slug}` };
		this.#data[index].data.push(content);
		return content;
	}
	get data(): TIndexMenuChapter[] {
		return this.#data;
	}
}
