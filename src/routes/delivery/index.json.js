import supabase from '$lib/db';

export const get = async (_) => {
    const { data } = await supabase
        .from('delivery')
        .select(`
            id,
            created_at,
            product,
            price,
            customer(
                first_name,
                last_name
            )
        `);
    return {
        body: data
    };
};

export const post = async (request) => {
    const { data, error } = await supabase
        .from('delivery')
        .upsert({
            customer: request.body.get('customer'),
            product: request.body.get('product'),
            price: request.body.get('price')
        });
    console.log(error);
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