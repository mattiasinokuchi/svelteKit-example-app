/*  This module contains endpoints to the database
    for the product page   */

import supabase, { pool } from '$lib/db';

// Hello database
(async () => {
    const res = await pool.query('SELECT $1::text as message', ['Hello world!'])
    console.log(res.rows[0].message) // Hello world!
    await pool.end()
})();

// Reads all products
export const get = async (_) => {
    let { data } = await supabase
        .from('product')
        .select(`
            name,
            emoji,
            id,
            order_ (id, product(name))`);
    return {
        body: data
    };
};

// Add a new product
export const post = async (request) => {
    const { data, error } = await supabase
        .from('product')
        .upsert({
            name: request.body.get('name'),
            price: request.body.get('price'),
            emoji: request.body.get('emoji'),
        });
    if (!error && request.headers.accept !== 'application/json') {
        return {
            status: 303,
            headers: {
                location: '/product'
            }
        };
    }
    return {
        body: data
    };
};