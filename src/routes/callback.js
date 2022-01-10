/*  Endpoint for obtaining access token, cookie
    and redirect after authentication   */

const url = `https://${process.env.AUTH0_DOMAIN}/oauth/token`;

export async function get(request) {
    console.log(request.query.get('code'));
    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                grant_type: 'authorization_code',
                client_id: process.env.AUTH0_CLIENT_ID,
                client_secret: process.env.AUTH0_CLIENT_SECRET,
                code: request.query.get('code'),
                redirect_uri: 'http://localhost:3000/callback'
            })
        });
        const token = await res.json();
        console.log(token);
    } catch (error) {
        console.log(error);
    }
    return {
        status: 303,
        location: request.headers.referer
    }
}
