/*  This module contains endpoints to the database
    for getting product options for a customer   */

import supabase from '$lib/db';

export const get = async (_) => {
    let { data } = await supabase
        .from('product')
        .select(`
            name,
            emoji,
            id,
            ordering (id, product(name))`);
    return {
        body: data
    };
};