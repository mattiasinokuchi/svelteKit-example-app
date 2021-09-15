import supabase from '$lib/db';

export const get = async (_) => {
    let { data } = await supabase
        .from('subscriptions')
        .select(`
            name,
            emoji,
            id,
            customers_subscriptions (id, subscription(name))`);
    return {
        body: data
    };
};