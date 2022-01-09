//  This is an endpoint for login with magic link

const url = `https://${process.env.AUTH0_DOMAIN}/passwordless/start`;

export async function post(request) {
    console.log(request.body.get('email'));
    const res = await fetch(url, {
        method: post,
        headers: {
            
        }
    });
    return {


        body: {
            message: 'request recieved from ' + request.body.get('email')
        }
    }
}
