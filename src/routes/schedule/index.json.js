/*  This module contains endpoints to the database
    for the schedule page   */

import supabase from '$lib/db';

/*  Reads all deliveries */
export const get = async (_) => {
    let { data } = await supabase
        .from('schedule')
        .select(`
            id,
            delivery_date,
            product (name)
        `);
    return {
        body: data
    };
};

/*  Adds a new billing */
export const post = async (request) => {
    const { data, error } = await supabase
        .from('schedule')
        .upsert({
            billing_date: request.body.get('billingDate'),
            product: request.body.get('product'),
        });
    if (!error && request.headers.accept !== 'application/json') {
        return {
            status: 303,
            headers: {
                location: '/schedule'
            }
        };
    }
    return {
        body: data
    };
};


