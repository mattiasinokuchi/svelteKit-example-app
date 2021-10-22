/*  This module contains endpoints to the database
    for the product page   */

import { pool } from '$lib/db';

// Reads all products
export const get = async (_) => {
    const res = await pool.query('SELECT * FROM product');
    return {
        body: res.rows
    };
};

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
