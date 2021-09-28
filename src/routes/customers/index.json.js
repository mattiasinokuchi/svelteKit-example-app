/*  This is a endpoint to the database
    for handling customers  */

import supabase from '$lib/db';

/*  Reads all customers */
export const get = async (_) => {
    let { data } = await supabase
        .from('customers')
        .select('*')
        .order('delivery_order', { ascending: true });;
    return {
        body: data
    };
};

/*  Adds a new customer */
export const post = async (request) => {
    const { data, error } = await supabase
        .from('customers')
        .upsert({
            first_name: request.body.get('firstName'),
            last_name: request.body.get('lastName'),
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