/**
 * Copyright (C) Logos - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Tiago Souza tiagohaasouza@gmail.com
 * If you purchased this software, see the license.txt file contained in this source code for more information and possible exceptions.
 */
/**
 * BookError
 *
 * @description Class BookError
 * @class BookError
 * @extends
 * @implements
 * @constructor
 */
/**
 * Copyright (C) Logos - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Tiago Souza tiagohaasouza@gmail.com
 * If you purchased this software, see the license.txt file contained in this source code for more information and possible exceptions.
 */
/*
if (!Locales.exists(code)) throw new AppError(AppError.I18N_FILE_NOT_EXISTS, [code]);
		if (!AppI18N.#enabledLocales.includes(code)) throw new AppError(AppError.I18N_LOCALE_NOT_REGISTERED, [code, AppI18N.#enabledLocales.join(', ')]);
 */
import CatchableError from '@script/Logos/Error/CatchableError';
import { vsprintf } from '@app';
import Debug from '@script/Logos/Debug/Debug';
import IBookError from '@script/Book/Interfaces/IBookError';

export default class BookError extends CatchableError implements IBookError {
	static readonly ELEMENT_NOT_FOUND = {
		subType: 'ELEMENT_NOT_FOUND',
		message: 'The element [%s] was not found.',
		code: 1001,
		fatal: true,
	};

	static readonly CHAPTER_NOT_FOUND = {
		subType: 'CHAPTER_NOT_FOUND',
		message: 'The chapter [%s] was not found.',
		code: 1002,
		fatal: true,
	};

	static readonly TEXT_NOT_FOUND = {
		subType: 'TEXT_NOT_FOUND',
		message: 'The text [%s] was not found.',
		code: 1003,
		fatal: true,
	};

	static readonly INVALID_PAGE_METRICS = {
		subType: 'INVALID_PAGE_METRICS',
		message: 'The page metrics are invalid.',
		code: 1004,
		fatal: true,
	};

	static readonly INVALID_PAGE_CONTAINER_METRICS = {
		subType: 'INVALID_PAGE_CONTAINER_METRICS',
		message: 'The page container metrics are invalid.',
		code: 1005,
		fatal: true,
	};

	static readonly INVALID_ELEMENT_METRICS = {
		subType: 'INVALID_ELEMENT_METRICS',
		message: 'The element metrics are invalid. [%s]',
		code: 1006,
		fatal: true,
	};

	static readonly DEFAULTS_NOT_SET = {
		subType: 'DEFAULTS_NOT_SET',
		message: 'The defaults were not set.',
		code: 1007,
		fatal: true,
	};

	static readonly UNKNOWN = {
		subType: 'UNKNOWN',
		message: 'An unknown error occurred. Please try again.',
		code: 9999,
		fatal: true,
	};
	/**
	 * The sub-type of the error.
	 * @type {string}
	 * @private
	 */
	readonly #subType: string;
	/**
	 *
	 * @param {{subType: string, message: string, code: number, fatal: boolean}} type
	 * @param {string[]} args
	 * @param originalError
	 */
	constructor(
		type: { subType: string; message: string; code: number; fatal: boolean },
		args: string[] = [],
		originalError?: Error,
	) {
		super(
			vsprintf(
				type.message,
				args.map((arg: string) => `<strong>${arg}</strong>`),
			),
			args,
			type.code,
			type.fatal,
		);
		//if(originalError) this.message += `<div >Original error: ${originalError.message}</div>`;
		this.#subType = type.subType;

		if (Debug.IS_DEVELOPMENT) Debug.drawIErrorTable(this, originalError);
	}
	get subType(): string {
		return this.#subType;
	}

	get className(): string {
		return this.constructor.name;
	}
}
