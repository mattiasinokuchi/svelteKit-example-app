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
            GROUP BY name;
        `);
        return {
            body: res.rows
        }
    } catch (error) {
        console.log(error);
    }
}
