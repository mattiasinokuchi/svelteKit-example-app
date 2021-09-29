/*  This module contains endpoints to the database
    for the customers parent and child pages   */

import supabase from '$lib/db';

/* Reads all data for a specific customer */
export const get = async ({ params }) => {
    const { id } = params;
    let { data } = await supabase
        .from('customer')
        .select(`
            id,
            first_name,
            last_name,
            status (active),
            subscription (id, product(name))`)
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
        .from('customer')
        .delete().match({
            id: request.params.id,
            //user_id: request.locals.user.id
        });

    if (!error && request.headers.accept !== 'application/json') {
        return {
            status: 303,
            headers: {
                location: '/customer'
            }
        };
    }
};

/* Updates the delivery order of a customer */
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