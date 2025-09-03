
import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default queryClient;

// Simple API request function
export async function apiRequest(
	url: string,
	options: RequestInit = {}
) {
	// Use API_BASE_URL from utils if available
	const baseUrl =
			typeof process !== 'undefined' && process.env.NODE_ENV === 'production'
				? '/api'
				: 'http://localhost:5000/api';
	const fullUrl = url.startsWith('http') ? url : `${baseUrl}${url}`;
	const response = await fetch(fullUrl, {
		headers: {
			'Content-Type': 'application/json',
			...(options.headers || {})
		},
		...options
	});
	return response.json();
}
