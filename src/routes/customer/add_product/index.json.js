/*  This module contains endpoints to the database
    for adding a product to a customer   */

import { pool } from '$lib/db';

//  Adds a customer order
export const post = async (request) => {
    const values = [
        request.body.get('customer_id'),
        request.body.get('product_id'),
        request.body.get('start_date')
    ];
    try {
        /*  Avoids string concatenating parameters into the
            query text directly to prevent sql injection    */
        await pool.query(`
            INSERT INTO order_table(customer_id, product_id, start_date)
            VALUES($1, $2, $3)
            RETURNING *`,
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