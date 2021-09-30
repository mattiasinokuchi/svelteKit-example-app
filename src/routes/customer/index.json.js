/*  This module contains endpoints to the database
    for the customers parent page   */

import supabase from '$lib/db';

/*  Reads all customers */
export const get = async (_) => {
    let { data } = await supabase
        .from('customer')
        //.select('*')
        //.order('delivery_order', { ascending: true });;
        .select(`
            first_name,
            subscription (id),
            delivery (id)
        `);
    return {
        body: data
    };
};

/*  Adds a new customer */
export const post = async (request) => {
    const { data, error } = await supabase
        .from('customer')
        .upsert({
            first_name: request.body.get('firstName'),
            last_name: request.body.get('lastName'),
        });
    if (!error && request.headers.accept !== 'application/json') {
        return {
            status: 303,
            headers: {
                location: '/customer'
            }
        };
    }
    return {
        body: data
    };
};