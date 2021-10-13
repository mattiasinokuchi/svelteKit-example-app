/*  This module contains an endpoint to the database
    for changing subscription status of a customer   */

import supabase from '$lib/db';

export const post = async (request) => {
    const { data, error } = await supabase
        .from('customer')
        .update({ active: request.body.get('subscribe') })
        .eq('id', request.body.get('customer'));
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
