/*  This module contains endpoints to the database
    for the subscription page   */

import supabase from '$lib/db';

export const del = async (request) => {
    /*if (!request.locals.user) {
        return { status: 401 };
    }*/
    const { data, error } = await supabase
        .from('subscription')
        .delete().match({
            id: request.params.id,
        });

    if (!error && request.headers.accept !== 'application/json') {
        return {
            status: 303,
            headers: {
                location: request.headers.referer
            }
        };
    }
};