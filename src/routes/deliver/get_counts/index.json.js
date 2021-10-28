/*  This module contains endpoints to the database
    for countings to the delivery page   */

import { pool } from '$lib/db';

//  Reads all orders
export const get = async (_) => {
    try {
        const res = await pool.query(`
            SELECT
                name AS product,
                COUNT (name)
            FROM order_
            INNER JOIN product
            ON product.id = order_.product
            INNER JOIN customer
            ON customer.id = order_.customer
            WHERE
                customer.active = 'true' AND
                order_.id NOT IN (
                    SELECT order_id
                    FROM delivery
                )
            GROUP BY name;
        `);
        return {
            body: res.rows
        }
    } catch (error) {
        console.log(error);
    }
}
