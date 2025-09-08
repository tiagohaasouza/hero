/**
 * Copyright (C) Logos - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Tiago Souza tiagohaasouza@gmail.com
 * If you purchased this software, see the license.txt file contained in this source code for more information and possible exceptions.
 */
import { ref } from "vue";
import axios, { type Canceler } from "axios";

export interface UseFileUploadOptions {
	url: string;
	fieldName?: string;
	maxSize?: number;
	allowedTypes?: string[];
	headers?: Record<string, string>;
}

export function useFileUpload(options: UseFileUploadOptions) {
	const progress = ref(0);
	const error = ref<string | null>(null);
	const isUploading = ref(false);
	let canceler: Canceler | null = null;

	const upload = async (file: File) => {
		error.value = null;
		if (options.maxSize && file.size > options.maxSize) {
			error.value = "File exceeds maximum size";
			return Promise.reject(new Error(error.value));
		}
		if (options.allowedTypes && !options.allowedTypes.includes(file.type)) {
			error.value = "File type not allowed";
			return Promise.reject(new Error(error.value));
		}

		const formData = new FormData();
		formData.append(options.fieldName ?? "file", file);

		isUploading.value = true;
		progress.value = 0;
		try {
			const response = await axios.post(options.url, formData, {
				headers: {
					...options.headers,
					"Content-Type": "multipart/form-data",
				},
				onUploadProgress: (event: ProgressEvent) => {
					if (event.total) {
						progress.value = Math.round(
							(event.loaded * 100) / event.total,
						);
					}
				},
				cancelToken: new axios.CancelToken((c) => (canceler = c)),
			});
			return response.data;
		} catch (err: any) {
			if (axios.isCancel(err)) {
				error.value = "Upload canceled";
			} else {
				error.value = err.message;
			}
			throw err;
		} finally {
			isUploading.value = false;
			canceler = null;
		}
	};

	const cancel = () => {
		if (canceler) {
			canceler("Upload canceled");
		}
	};

	return {
		upload,
		cancel,
		progress,
		error,
		isUploading,
	};
}
