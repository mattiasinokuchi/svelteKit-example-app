import supabase from '$lib/db';

export const get = async (_) => {
    const { data } = await supabase
        .from('customers')
        .select(`
            id,
            first_name,
            last_name,
            status (active),
            delivery_order,
            customers_subscriptions (
                id,
                subscription (
                    name,
                    price,
                    time_interval
                )
            )
        `);
    const inDeliveryOrder = data.sort(function (a, b) {
        return a.delivery_order - b.delivery_order;
    });
    return {
        body: inDeliveryOrder
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