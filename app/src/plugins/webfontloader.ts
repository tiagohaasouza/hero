/**
 * Copyright (C) Logos - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Tiago Souza tiagohaasouza@gmail.com
 * If you purchased this software, see the license.txt file contained in this source code for more information and possible exceptions.
 */
export function loadFonts() {
	const WebFont = require('webfontloader');

	WebFont.load({
		google: {
			families: ['Roboto:100,300,400,500,700,900&display=swap'],
		},
	});
}
