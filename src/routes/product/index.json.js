/*  This module contains endpoints to the database
    for the product page   */

import { pool } from '$lib/db';
//import supabase from '$lib/db';

// Reads all products
export const get = async (_) => {
    const res = await pool.query('SELECT * FROM product');
    return {
        body: res.rows
    };
};

// Reads all products
/*export const get = async (_) => {
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
};*/

// Add a new product
export const post = async (request) => {
    const values = [
        request.body.get('name'),
        request.body.get('price'),
        request.body.get('emoji')
    ];
    try {
        await pool.query(
        /*  Avoids string concatenating parameters into the
            query text directly to prevent sql injection    */ 
        'INSERT INTO product(name, price, emoji) VALUES($1, $2, $3) RETURNING *',
            values
        );
        return {
            status: 303,
            headers: {
                location: '/product'
            }
        };
    } catch (error) {
        console.log(error)
    }
};

// Add a new product
/*export const post = async (request) => {
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
};*/