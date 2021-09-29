/*  This module contains an endpoint that updates
    the delivery order in the database  */

import supabase from '$lib/db';

export const update = async (request) => {
    const order = parseInt(request.body.get('order'));
    const id = request.params.id;
    const { data, error } = await supabase
        .from('customer')
        .upsert([{
            'id': id,
            'delivery_order': order
        }]);
    if (!error && request.headers.accept !== 'application/json') {
        return {
            status: 303,
            headers: {
                location: '/customer'
            }
        };
    }
    console.log(error);
    return {
        body: data,
        error: error
    }
};