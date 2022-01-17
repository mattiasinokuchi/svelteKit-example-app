import cookie from 'cookie';

const userURL = `https://${process.env.AUTH0_DOMAIN}/userinfo`;

export const handle = async ({ request, resolve }) => {
	const cookies = cookie.parse(request.headers.cookie || '');
	if (cookies.accessToken) {
		try {
			const res = await fetch(userURL, {
				headers: {
					Accept: 'application/json',
					Authorization: `Bearer ${cookies.accessToken}`
				}
			});
			const user = await res.json();
			request.locals.user = user.email;
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
			}
		} catch (error) {
			console.log(error);
		}	
	}
	request.locals.user = null;
	return resolve(request);
};

export async function getSession(request) {
	return {
		user: request.locals.user
	}
}