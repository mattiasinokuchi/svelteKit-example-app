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
    const { data, error } = await supabase
        .from('customers')
        .upsert({
            first_name: request.body.get('firstName'),
            lastName: request.body.get('lastName'),
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
        body: data
    };
};