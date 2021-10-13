/*  This module contains an endpoint that updates
    the delivery order in the database  */

import supabase from '$lib/db';

export const post = async (request) => {
    const { data, error } = await supabase
        .from('customer')
        .update({ 'delivery_order': request.body.order })
        .eq('id', request.body.id);
    if (!error && request.headers.accept !== 'application/json') {
        return {
            status: 303,
            headers: {
                location: '/customer'
            }
        };
    }
    return {
        body: data,
        error: error
    }
};
