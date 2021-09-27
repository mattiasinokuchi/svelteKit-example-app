import supabase from '$lib/db';

export const get = async (_) => {
    const { data } = await supabase
        .from('customers')
        .select(`
            id,
            first_name,
            last_name,
            deliveries (created_at, subscription, price)`);
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