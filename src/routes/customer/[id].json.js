/*  This module contains endpoints to the database
    for the customers parent and child pages   */

import supabase from '$lib/db';

/* Reads all data for a specific customer */
export const get = async ({ params }) => {
    const { id } = params;
    const { error, data } = await supabase
        .from('customer')
        .select(`
            id,
            first_name,
            last_name,
            active,
            order_ (id, product(name))`)
        .match({ id: id })
        .single();
    if(error) console.log(error);
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
