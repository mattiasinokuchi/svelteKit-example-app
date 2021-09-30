/*  This module contains endpoints to the database
    for the subscription page   */

import supabase from '$lib/db';

export const post = async (request) => {
    const { data, error } = await supabase
        .from('subscription')
        .upsert({
            customer: request.body.get('customer'),
            product: request.body.get('product'),
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