/*  This module contains an endpoint that updates
    the delivery order in the database  */

import supabase from '$lib/db';

export const post = async (request) => {
    console.log('endpoint called');
    const { data, error } = await supabase
        .from('customer')
        .update({ 'delivery_order': request.body.order })
        .eq('id', request.body.id);
    console.log(data, error);
    if (!error && request.headers.accept !== 'application/json') {
        return {
            status: 303,
            headers: {
                location: '/customer'
            }
        };
    }
    console.log(data, error);
    return {
        body: data,
        error: error
    }
};
