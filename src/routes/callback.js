/*  Endpoint for obtaining token, cookie
    and redirection after authentication   */

import cookie from 'cookie';

const tokenURL = `https://${process.env.AUTH0_DOMAIN}/oauth/token`;
//const userURL = `https://${process.env.AUTH0_DOMAIN}/userinfo`;

export async function get(request) {
    try {
        let res = await fetch(tokenURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                grant_type: 'authorization_code',
                client_id: process.env.AUTH0_CLIENT_ID,
                client_secret: process.env.AUTH0_CLIENT_SECRET,
                code: request.query.get('code'),
                redirect_uri: 'http://' + request.host + '/callback'
            })
        });
        const token = await res.json();
/*        res = await fetch(userURL, {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token.access_token}`
            }
        });
        const user = await res.json();
        request.locals.user = user.email;*/
        return {
            status: 303,
            headers: {
                'Set-Cookie': cookie.serialize('accessToken', token.access_token, {
                    path: '/',
                    httpOnly: true,
                    sameSite: 'strict',
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 604800
                }),
                location: '/product'
            }
        }
    } catch (error) {
        console.log(error);
    }
}
