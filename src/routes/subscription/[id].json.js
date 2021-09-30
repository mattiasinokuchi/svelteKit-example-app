/*  This module contains endpoints to the database
    for the subscription page   */

import supabase from '$lib/db';

export const get = async ({ params }) => {
    const { id } = params;
    let { data } = await supabase
        .from('subscription')
        .select(`
            customer ( first_name ),
            product ( name )`)
        .match({ id: id })
        .single();
    return {
        body: data
    };
};
