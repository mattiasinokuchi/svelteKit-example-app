import supabase from '$lib/db';

export const post = async (request) => {
    const { data, error } = await supabase
        .from('delivery')
        .upsert({
            customer: request.body.get('customer'),
            product_name: request.body.get('productName'),
            product_id: request.body.get('productId'),
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