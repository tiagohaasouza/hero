/**
 * Copyright (C) Logos - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Tiago Souza tiagohaasouza@gmail.com
 * If you purchased this software, see the license.txt file contained in this source code for more information and possible exceptions.
 */
/**
 * IBookError
 *
 * @description Class IBookError
 * @class IBookError
 * @extends
 * @implements
 * @constructor
 */
export default interface IBookError extends Error {
	subType: string;
	message: string;
	code: number;
	fatal: boolean;
	readonly className: string;
}
