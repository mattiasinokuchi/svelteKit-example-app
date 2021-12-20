export const handle = async ({ request, resolve }) => {
	const response = await resolve(request);
	return {
		...response,
		headers: {
			...response.headers,
			'X-Frame-Options': 'SAMEORIGIN',
			'X-Content-Type-Options': 'nosniff',
			'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
			'Content-Security-Policy': "img-src 'self'; script-src 'self' 'unsafe-inline'",
			'X-XSS-Protection': '1; mode=block'
		},
	};
};
