/*  This module contains endpoints to the database
    for the customers parent and child pages   */

import { pool } from '$lib/db';

//  Reads data for a specific customer
export const get = async ({ params }) => {
    try {
        const { id } = params;
        const res = await pool.query(`
            SELECT * FROM customer
            WHERE id = $1
            `, [id]
        );
        return {
            body: res.rows[0]
        }
    } catch (error) {
        console.log(error);
    }
}

/*  Deletes a customer.
    Client instance must be used in transaction with PostgreSQL.
    Avoids string concatenating parameters into the
    query text directly to prevent sql injection    */
export const del = async (request) => {
    /*if (!request.locals.user) {
        return { status: 401 };
    }*/
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        //  Advance customers by decrementing their delivery orders
        await client.query(`
            UPDATE customer
            SET delivery_order = delivery_order - 1
            WHERE delivery_order >= ($1);
            `, [request.body.get('order')]
        );
        //  Delete customer in request
        await client.query(`
            DELETE FROM customer
            WHERE id = $1`, [request.params.id]
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
