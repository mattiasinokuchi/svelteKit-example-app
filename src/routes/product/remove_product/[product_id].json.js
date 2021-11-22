/*  This module contains endpoints to the database
    for the specific product page   */

import { pool } from '$lib/db';

/*  Deletes a product
    Client instance must be used in transaction with PostgreSQL.    */
export const del = async (request) => {
    /*if (!request.locals.user) {
        return { status: 401 };
    }*/
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        //  Delete product orders
        await client.query(`
            DELETE
            FROM order_table
            WHERE product_id = $1
            `, [request.params.product_id]
        );
        //  Delete product
        await client.query(`
            DELETE
            FROM product_table
            WHERE id = $1
            `, [request.params.product_id]
        );
        await client.query('COMMIT');
        return {
            status: 303,
            headers: {
                location: '/product'
            }
        };
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
};
