/*  This module contains endpoints to the database
    for the customers parent and child pages   */

import supabase from '$lib/db';

/* Reads all data for a specific customer */
export const get = async ({ params }) => {
    const { id } = params;
    let { data } = await supabase
        .from('customers')
        .select(`
            id,
            first_name,
            last_name,
            status (active),
            customers_subscriptions (id, subscription(name))`)
        .match({ id: id })
        .single();
    return {
        body: data
    };
};

/* Deletes a customer */
export const del = async (request) => {
    /*if (!request.locals.user) {
        return { status: 401 };
    }*/
    const { error } = await supabase
        .from('customers')
        .delete().match({
            id: request.params.id,
            //user_id: request.locals.user.id
        });

    if (!error && request.headers.accept !== 'application/json') {
        return {
            status: 303,
            headers: {
                location: '/customers'
            }
        };
    }
};

/* Updates the delivery order of a customer */
export const update = async (request) => {
    const order = parseInt(request.body.get('order'));
    const id = request.params.id;
    const { data, error } = await supabase
        .from('customers')
        .upsert([{
            'id': id,
            'delivery_order': order
        }]);
    if (!error && request.headers.accept !== 'application/json') {
        return {
            status: 303,
            headers: {
                location: '/customers'
            }
        };
    }
    console.log(error);
    return {
        body: data,
        error: error
    }
};