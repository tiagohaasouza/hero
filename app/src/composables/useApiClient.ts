import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

let apiClient: AxiosInstance | null = null;

export function useApiClient(): AxiosInstance {
	if (apiClient) {
		return apiClient;
	}

	apiClient = axios.create({
		baseURL: import.meta.env.VITE_BACKEND_URL || '',
	});

	apiClient.interceptors.request.use((config: AxiosRequestConfig) => {
		const token = localStorage.getItem('access_token');
		if (token) {
			config.headers = config.headers || {};
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	});

	apiClient.interceptors.response.use(
		(response: AxiosResponse) => response,
		(error: AxiosError) => {
			if (error.response) {
				console.error('API error:', error.response.status, error.response.data);
			} else {
				console.error('API error:', error.message);
			}
			return Promise.reject(error);
		}
	);

	return apiClient;
}
