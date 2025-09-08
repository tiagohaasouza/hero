/**
 * Copyright (C) Logos - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Tiago Souza tiagohaasouza@gmail.com
 * If you purchased this software, see the license.txt file contained in this source code for more information and possible exceptions.
 */
declare module 'sprintf-js' {
	const sprintf: (...args: any[]) => string;
	const vsprintf: (...args: any[]) => string;
	export { sprintf, vsprintf };
}
