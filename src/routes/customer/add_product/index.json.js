/*  This module contains endpoints to the database
    for adding a product to a customer   */

//import supabase from '$lib/db';
import { pool } from '$lib/db';

//  Adds a customer order

export const post = async (request) => {
    const values = [
        request.body.get('customer'),
        request.body.get('product')
    ];
    try {
        await pool.query(
            /*  Avoids string concatenating parameters into the
                query text directly to prevent sql injection    */
            'INSERT INTO order_(customer, product) VALUES($1, $2) RETURNING *',
            values
        );
        return {
            status: 303,
            headers: {
                location: request.headers.referer
            }
        };
    } catch (error) {
        console.log(error)
    }
};