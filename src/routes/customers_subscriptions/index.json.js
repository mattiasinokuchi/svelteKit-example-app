import supabase from '$lib/db';

export const get = async (_) => {
    let { data } = await supabase
        .from('customers_subscriptions')
        .select(`
            customer,
            subscription`);
    return {
        body: data
    };
};

export const post = async (request) => {
    const { data, error } = await supabase
        .from('customers_subscriptions')
        .upsert({
            first_name: request.body.get('firstName'),
            last_name: request.body.get('lastName'),
        });

    if (!error && request.headers.accept !== 'application/json') {
        return {
            status: 303,
            headers: {
                location: '/customers_subscriptions'
            }
        };
    }
    return {
        body: data
    };
};