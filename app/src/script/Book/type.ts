/**
 * Copyright (C) Logos - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Tiago Souza tiagohaasouza@gmail.com
 * If you purchased this software, see the license.txt file contained in this source code for more information and possible exceptions.
 */
export type TPageMetrics = {
	width: string | number;
	height: string | number;
	size: string;
	orientation: string;
	class: string;
	container?: {
		width: string | number;
		height: string | number;
	};
	margins: {
		top: string | number;
		bottom: string | number;
		left: string | number;
		right: string | number;
	};
};
export type TIndexMenuText = { title: string; slug: string; href: string };
export type TIndexMenuChapter = {
	title: string;
	slug: string;
	href: string;
	data: TIndexMenuText[];
};
export type TBookError = { subType: string; message: string; code: number; fatal: boolean };
