import supabase from '$lib/db';

export const get = async (_) => {
    let { data } = await supabase
        .from('customers_subscriptions')
        .select(`
            customer (first_name, last_name),
            subscription (name)`);
    return {
        body: data
    };
};

export const post = async (request) => {
    const { data, error } = await supabase
        .from('customers_subscriptions')
        .upsert({
            customer: request.body.get('customer'),
            last_name: request.body.get('subscription'),
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