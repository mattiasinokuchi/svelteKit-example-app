/*  This module contains endpoints to the database
    for countings to the delivery page   */

import { pool } from '$lib/db';

//  Reads all orders
export const get = async (_) => {
    try {
        const res = await pool.query(`
            SELECT
                product_name,
                COUNT (product_name)
            FROM order_table
            INNER JOIN product_table
            ON product_table.id = order_table.product_id
            INNER JOIN customer_table
            ON customer_table.id = order_table.customer_id
            WHERE
                customer_table.active = 'true' AND
                order_table.id NOT IN (
                    SELECT order_id
                    FROM delivery_table
                )
            GROUP BY product_name;
        `);
        return {
            body: res.rows
        }
    } catch (error) {
        console.log(error);
    }
}
