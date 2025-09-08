/**
 * Copyright (C) Logos - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Tiago Souza tiagohaasouza@gmail.com
 * If you purchased this software, see the license.txt file contained in this source code for more information and possible exceptions.
 */
import Debug from '@script/Logos/Debug/Debug';

if (Debug.IS_DEVELOPMENT) {
	window.onerror = function (message, source, lineno, colno, error) {
		//console.error(`Global Error: ${message} at ${source}:${lineno}:${colno}`);
	};
}
