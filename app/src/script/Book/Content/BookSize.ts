/**
 * Copyright (C) Logos - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Tiago Souza tiagohaasouza@gmail.com
 * If you purchased this software, see the license.txt file contained in this source code for more information and possible exceptions.
 */
import { TPageMetrics } from '@script/Book/type';
import { sprintf, vsprintf } from 'sprintf-js';
import toPxConverter from 'to-px';
/**
 * BookSize
 *
 * @description Class BookSize
 * @class BookSize
 * @extends
 * @implements
 * @constructor
 */
export default class BookSize {
	static readonly PAGE_BREAK: string = '<!-- page-break -->';
	static readonly PAGE_BREAK_REGEX: RegExp = /<!-- page-break -->/g;
	static readonly PAGE_BREAK_REPLACEMENT: string = '<div class="page-break"></div>';

	static readonly PORTRAIT: string = 'portrait';
	static readonly LANDSCAPE: string = 'landscape';

	static readonly A0: string = 'a0';
	static readonly A1: string = 'a1';
	static readonly A2: string = 'a2';
	static readonly A3: string = 'a3';
	static readonly A4: string = 'a4';
	static readonly A5: string = 'a5';
	static readonly A6: string = 'a6';
	static readonly A7: string = 'a7';
	static readonly A8: string = 'a8';
	static readonly A9: string = 'a9';
	static readonly A10: string = 'a10';

	static readonly A0_PORTRAIT_METRICS: TPageMetrics = {
		width: '84.1cm',
		height: '118.9cm',
		size: BookSize.A0,
		orientation: BookSize.PORTRAIT,
		class: 'page-size-a0-portrait',
		container: { width: '80.1cm', height: '114.9cm' },
		margins: { top: '2cm', bottom: '2cm', left: '2cm', right: '2cm' },
	};
	static readonly A0_LANDSCAPE_METRICS: TPageMetrics = {
		width: '118.9cm',
		height: '84.1cm',
		size: BookSize.A0,
		orientation: BookSize.LANDSCAPE,
		class: 'page-size-a0-landscape',
		container: { width: '114.9cm', height: '80.1cm' },
		margins: { top: '2cm', bottom: '2cm', left: '2cm', right: '2cm' },
	};
	static readonly A1_PORTRAIT_METRICS: TPageMetrics = {
		width: '59.4cm',
		height: '84.1cm',
		size: BookSize.A1,
		orientation: BookSize.PORTRAIT,
		class: 'page-size-a1-portrait',
		container: { width: '55.4cm', height: '80.1cm' },
		margins: { top: '2cm', bottom: '2cm', left: '2cm', right: '2cm' },
	};
	static readonly A1_LANDSCAPE_METRICS: TPageMetrics = {
		width: '84.1cm',
		height: '59.4cm',
		size: BookSize.A1,
		orientation: BookSize.LANDSCAPE,
		class: 'page-size-a1-landscape',
		container: { width: '80.1cm', height: '55.4cm' },
		margins: { top: '2cm', bottom: '2cm', left: '2cm', right: '2cm' },
	};
	static readonly A2_PORTRAIT_METRICS: TPageMetrics = {
		width: '42.0cm',
		height: '59.4cm',
		size: 'a2',
		orientation: BookSize.PORTRAIT,
		class: 'page-size-a2-portrait',
		container: { width: '38.0cm', height: '55.4cm' },
		margins: { top: '2cm', bottom: '2cm', left: '2cm', right: '2cm' },
	};
	static readonly A2_LANDSCAPE_METRICS: TPageMetrics = {
		width: '59.4cm',
		height: '42.0cm',
		size: 'a2',
		orientation: BookSize.LANDSCAPE,
		class: 'page-size-a2-landscape',
		container: { width: '55.4cm', height: '38.0cm' },
		margins: { top: '2cm', bottom: '2cm', left: '2cm', right: '2cm' },
	};
	static readonly A3_PORTRAIT_METRICS: TPageMetrics = {
		width: '29.7cm',
		height: '42.0cm',
		size: 'a3',
		orientation: BookSize.PORTRAIT,
		class: 'page-size-a3-portrait',
		container: { width: '25.7cm', height: '38.0cm' },
		margins: { top: '2cm', bottom: '2cm', left: '2cm', right: '2cm' },
	};
	static readonly A3_LANDSCAPE_METRICS: TPageMetrics = {
		width: '42.0cm',
		height: '29.7cm',
		size: 'a3',
		orientation: BookSize.LANDSCAPE,
		class: 'page-size-a3-landscape',
		container: { width: '38.0cm', height: '25.7cm' },
		margins: { top: '2cm', bottom: '2cm', left: '2cm', right: '2cm' },
	};
	static readonly A4_PORTRAIT_METRICS: TPageMetrics = {
		width: '21.0cm',
		height: '29.7cm',
		size: 'a4',
		orientation: BookSize.PORTRAIT,
		class: 'page-size-a4-portrait',
		container: { width: '16.0cm', height: '25.7cm' }, // 21cm - 2.5cm - 2cm
		margins: { top: '1.5cm', bottom: '2cm', left: '2.5cm', right: '2cm' },
	};

	static readonly A4_LANDSCAPE_METRICS: TPageMetrics = {
		width: '29.7cm',
		height: '21.0cm',
		size: 'a4',
		orientation: BookSize.LANDSCAPE,
		class: 'page-size-a4-landscape',
		container: { width: '25.2cm', height: '17.5cm' },
		margins: { top: '1.5cm', bottom: '2cm', left: '2.5cm', right: '2cm' },
	};

	static readonly A4_PORTRAIT_METRICS_PIXELS: TPageMetrics = {
		width: '793.7013px', // 21.0cm * 37.7953
		height: '1122.52041px', // 29.7cm * 37.7953
		size: 'a4',
		orientation: BookSize.PORTRAIT,
		class: 'page-size-a4-portrait',
		container: {
			width: '604.7248px', // 16.0cm * 37.7953
			height: '971.33921px', // 25.7cm * 37.7953
		},
		margins: {
			top: '56.69295px', // 1.5cm * 37.7953
			bottom: '75.5906px', // 2.0cm * 37.7953
			left: '94.48825px', // 2.5cm * 37.7953
			right: '75.5906px', // 2.0cm * 37.7953
		},
	};

	static readonly A4_LANDSCAPE_METRICS_PIXELS: TPageMetrics = {
		width: `${29.7 * 37.7953}px`, // 29.7cm * 37.7953
		height: `${21.0 * 37.7953}px`, // 21.0cm * 37.7953
		size: 'a4',
		orientation: BookSize.LANDSCAPE,
		class: 'page-size-a4-landscape',
		container: {
			width: `${25.2 * 37.7953}px`, // 25.2cm * 37.7953
			height: `${17.5 * 37.7953}px`, // 17.5cm * 37.7953
		},
		margins: {
			top: `${1.5 * 37.7953}px`, // 1.5cm * 37.7953
			bottom: `${2.0 * 37.7953}px`, // 2.0cm * 37.7953
			left: `${2.5 * 37.7953}px`, // 2.5cm * 37.7953
			right: `${2.0 * 37.7953}px`, // 2.0cm * 37.7953
		},
	};

	static readonly A5_PORTRAIT_METRICS: TPageMetrics = {
		width: '14.8cm',
		height: '21.0cm',
		size: 'a5',
		orientation: BookSize.PORTRAIT,
		class: 'page-size-a5-portrait',
		container: { width: '10.8cm', height: '17.0cm' },
		margins: { top: '2cm', bottom: '2cm', left: '2cm', right: '2cm' },
	};
	static readonly A5_LANDSCAPE_METRICS: TPageMetrics = {
		width: '21.0cm',
		height: '14.8cm',
		size: 'a5',
		orientation: BookSize.LANDSCAPE,
		class: 'page-size-a5-landscape',
		container: { width: '17.0cm', height: '10.8cm' },
		margins: { top: '2cm', bottom: '2cm', left: '2cm', right: '2cm' },
	};

	static readonly A6_PORTRAIT_METRICS: TPageMetrics = {
		width: '10.5cm',
		height: '14.8cm',
		size: 'a6',
		orientation: BookSize.PORTRAIT,
		class: 'page-size-a6-portrait',
		container: { width: '6.5cm', height: '10.8cm' },
		margins: { top: '2cm', bottom: '2cm', left: '2cm', right: '2cm' },
	};
	static readonly A6_LANDSCAPE_METRICS: TPageMetrics = {
		width: '14.8cm',
		height: '10.5cm',
		size: 'a6',
		orientation: BookSize.LANDSCAPE,
		class: 'page-size-a6-landscape',
		container: { width: '10.8cm', height: '6.5cm' },
		margins: { top: '2cm', bottom: '2cm', left: '2cm', right: '2cm' },
	};
	static readonly A7_PORTRAIT_METRICS: TPageMetrics = {
		width: '7.4cm',
		height: '10.5cm',
		size: 'a7',
		orientation: BookSize.PORTRAIT,
		class: 'page-size-a7-portrait',
		container: { width: '5.4cm', height: '8.5cm' },
		margins: { top: '1cm', bottom: '1cm', left: '1cm', right: '1cm' },
	};
	static readonly A7_LANDSCAPE_METRICS: TPageMetrics = {
		width: '10.5cm',
		height: '7.4cm',
		size: 'a7',
		orientation: BookSize.LANDSCAPE,
		class: 'page-size-a7-landscape',
		container: { width: '8.5cm', height: '5.4cm' },
		margins: { top: '1cm', bottom: '1cm', left: '1cm', right: '1cm' },
	};
	static readonly A8_PORTRAIT_METRICS: TPageMetrics = {
		width: '5.2cm',
		height: '7.4cm',
		size: 'a8',
		orientation: BookSize.PORTRAIT,
		class: 'page-size-a8-portrait',
		container: { width: '3.2cm', height: '5.4cm' },
		margins: { top: '1cm', bottom: '1cm', left: '1cm', right: '1cm' },
	};
	static readonly A8_LANDSCAPE_METRICS: TPageMetrics = {
		width: '7.4cm',
		height: '5.2cm',
		size: 'a8',
		orientation: BookSize.LANDSCAPE,
		class: 'page-size-a8-landscape',
		container: { width: '5.4cm', height: '3.2cm' },
		margins: { top: '1cm', bottom: '1cm', left: '1cm', right: '1cm' },
	};
	static readonly A9_PORTRAIT_METRICS: TPageMetrics = {
		width: '3.7cm',
		height: '5.2cm',
		size: 'a9',
		orientation: BookSize.PORTRAIT,
		class: 'page-size-a9-portrait',
		container: { width: '1.7cm', height: '3.2cm' },
		margins: { top: '1cm', bottom: '1cm', left: '1cm', right: '1cm' },
	};
	static readonly A9_LANDSCAPE_METRICS: TPageMetrics = {
		width: '5.2cm',
		height: '3.7cm',
		size: 'a9',
		orientation: BookSize.LANDSCAPE,
		class: 'page-size-a9-landscape',
		container: { width: '3.2cm', height: '1.7cm' },
		margins: { top: '1cm', bottom: '1cm', left: '1cm', right: '1cm' },
	};
	static readonly A10_PORTRAIT_METRICS: TPageMetrics = {
		width: '2.6cm',
		height: '3.7cm',
		size: 'a10',
		orientation: BookSize.PORTRAIT,
		class: 'page-size-a10-portrait',
		container: { width: '1.6cm', height: '2.7cm' },
		margins: { top: '0.5cm', bottom: '0.5cm', left: '0.5cm', right: '0.5cm' },
	};
	static readonly A10_LANDSCAPE_METRICS: TPageMetrics = {
		width: '3.7cm',
		height: '2.6cm',
		size: 'a10',
		orientation: BookSize.LANDSCAPE,
		class: 'page-size-a10-landscape',
		container: { width: '2.7cm', height: '1.6cm' },
		margins: { top: '0.5cm', bottom: '0.5cm', left: '0.5cm', right: '0.5cm' },
	};

	static #current: TPageMetrics;

	private constructor() {}
	static get(): TPageMetrics {
		return BookSize.#current;
	}

	static set(size: TPageMetrics): BookSize {
		BookSize.#current = size;
		return BookSize;
	}

	static getMetrics(size: string, orientation: string): TPageMetrics {
		return BookSize[`${size.toUpperCase()}_${orientation.toUpperCase()}_METRICS`];
	}

	static toPx(size: string, orientation: string): TPageMetrics {
		const metrics: TPageMetrics = BookSize.getMetrics(size, orientation);
		const c: Function = (dimension: string) => Math.round(toPxConverter(dimension) as number);

		return {
			width: c(metrics.width),
			height: c(metrics.height),
			size: metrics.size,
			orientation: metrics.orientation,
			class: metrics.class,
			container: {
				width: c(metrics.width) - c(metrics.margins.left) - c(metrics.margins.right),
				height: c(metrics.height) - c(metrics.margins.top) - c(metrics.margins.bottom),
			},
			margins: {
				top: c(metrics.margins.top),
				bottom: c(metrics.margins.bottom),
				left: c(metrics.margins.left),
				right: c(metrics.margins.right),
			},
		};
	}
}
