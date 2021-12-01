import cookie from 'cookie';
import { v4 as uuid } from '@lukeed/uuid';

export const handle = async ({ request, resolve }) => {
	const cookies = cookie.parse(request.headers.cookie || '');
	request.locals.userid = cookies.userid || uuid();

	// TODO https://github.com/sveltejs/kit/issues/1046
	if (request.query.has('_method')) {
		request.method = request.query.get('_method').toUpperCase();
	}

	const response = await resolve(request);

	if (!cookies.userid) {
		// if this is the first time the user has visited this app,
		// set a cookie so that we recognise them when they return
		response.headers['set-cookie'] = `userid=${request.locals.userid}; Path=/; HttpOnly; Secure`;
	}

	return {
		...response,
		headers: {
			...response.headers,
			'X-Frame-Options': 'SAMEORIGIN',
			'X-Content-Type-Options': 'nosniff',
			'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
			'Content-Security-Policy-Report-Only': 'default-src https:; report-uri /csp-violation-report-endpoint/',
			'X-XSS-Protection': '1; mode=block'
		},
	};
};
