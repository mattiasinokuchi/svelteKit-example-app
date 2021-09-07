import supabase from '$lib/db';

export const get = async (_) => {
    let { data } = await supabase
        .from('customers')
        .select('*');
    return {
        body: data
    };
};

export const post = async (request) => {
    console.log(request);
    const { data, error } = await supabase
        .from('customers')
        .upsert({
            lastName: request.body.get('text'),
        });

    if (!error && request.headers.accept !== 'application/json') {
        return {
            status: 303,
            headers: {
                location: '/customers'
            }
        };
    }

    return {
        body: data[0]
    };
};