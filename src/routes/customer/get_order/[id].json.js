/*  This module contains endpoints to the database
    for getting orders for a customer   */

import { pool } from '$lib/db';

//  Reads all orders for a specific customer
export const get = async ({ params }) => {
    try {
        const { id } = params;
        const res = await pool.query(`
            SELECT order_.id, name
            FROM order_
            INNER JOIN product
            ON product.id = order_.product
            WHERE customer = $1
            `, [id]);
        return {
            body: res.rows
        }
    } catch (error) {
        console.log(error);
    }
}
