/*  This module contains an endpoint to the database
    for the schedule page   */

import supabase from '$lib/db';

/* Deletes a delivery */
export const del = async (request) => {
    /*if (!request.locals.user) {
        return { status: 401 };
    }*/
    const { error } = await supabase
        .from('schedule')
        .delete().match({
            id: request.params.id,
            //user_id: request.locals.user.id
        });

    if (!error && request.headers.accept !== 'application/json') {
        return {
            status: 303,
            headers: {
                location: '/schedule'
            }
        };
    }
};