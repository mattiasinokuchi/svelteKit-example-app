/*  This module contains an endpoint that updates
    the delivery order in the database  */

import { pool } from '$lib/db';

/*  Client instance must be used in transaction with PostgreSQL.
    Avoids string concatenating parameters into the
    query text directly to prevent sql injection    */
export const post = async (request) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        //  Defer customers by incrementing their delivery orders
        await client.query(`
            UPDATE customer
            SET delivery_order = delivery_order + 1
            WHERE delivery_order >= ($1);
            `, [request.body.get('order')]
        );
        //  Advance customer in request
        await client.query(`
            UPDATE customer
            SET delivery_order = ($1)
            WHERE id = ($2);
            `, [
                request.body.get('order'),
                request.body.get('id')
            ]
        );
        await client.query('COMMIT');
        return {
            status: 303,
            headers: {
                location: '/customer'
            }
        };
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
};
