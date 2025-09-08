/**
 * Copyright (C) Logos - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Tiago Souza tiagohaasouza@gmail.com
 * If you purchased this software, see the license.txt file contained in this source code for more information and possible exceptions.
 */
import ObservableObject from '@script/Logos/Observer/ObservableObject';
/**
 * BookMeta
 *
 * @description Class BookMeta
 * @class BookMeta
 * @extends
 * @implements
 * @constructor
 */
export default class BookMeta extends ObservableObject {
	buildTime: string | number = 0;
	buildPercentage: string | number = 0;
	totalPages: string | number = 0;
	totalChapters: string | number = 0;
	totalTexts: string | number = 0;
	totalWords: string | number = 0;
	elementsAnalysed: string | number = 0;
	elementsToAnalyse: string | number = 0;
	totalElements: string | number = 0;
	totalImages: string | number = 0;
	totalLoadedImages: string | number = 0;
	totalLoadErrorImages: string | number = 0;
	totalNotes: string | number = 0;

	public constructor() {
		super();
	}
}
