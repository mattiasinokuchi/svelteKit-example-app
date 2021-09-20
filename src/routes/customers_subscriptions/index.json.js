import supabase from '$lib/db';

export const get = async (_) => {
    const { data } = await supabase
        .from('customers_subscriptions')
        .select(`
            id,
            customer (first_name, last_name),
            subscription (name)`)
        .order('customer', { foreignTable: 'customers.last_name' });
        return {
        body: data
    };
};

export const post = async (request) => {
    const { data, error } = await supabase
        .from('customers_subscriptions')
        .upsert({
            customer: request.body.get('customer'),
            subscription: request.body.get('subscription'),
        });

    if (!error && request.headers.accept !== 'application/json') {
        return {
            status: 303,
            headers: {
                location: request.headers.referer
            }
        };
    }
    return {
        body: data
    };
};