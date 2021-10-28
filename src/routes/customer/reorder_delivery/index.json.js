/*  This module contains an endpoint that updates
    the delivery order in the database  */

import { pool } from '$lib/db';

/*  Client instance must be used in transaction with PostgreSQL.
    Avoids string concatenating parameters into the
    query text directly to prevent sql injection    */
export const post = async (request) => {
    const client = await pool.connect();
    const new_order = request.body.get('order');
    const id = request.body.get('id');
    let old_order = null;
    try {
        await client.query('BEGIN');
        //  Get current delivery order of customer in request
        const res = await client.query(`
            SELECT delivery_order
            FROM customer
            WHERE id = ($1);
            `, [id]
        );
        old_order = res.rows[0].delivery_order;
        if (new_order < old_order) {
            //  Defer other customers
            await client.query(`
                UPDATE customer
                SET delivery_order = delivery_order + 1
                WHERE delivery_order BETWEEN ($1) AND ($2);
                `, [new_order, old_order]
            );
            //  Advance customer in request
            await client.query(`
                UPDATE customer
                SET delivery_order = ($1)
                WHERE id = ($2);
                `, [new_order, id]
            );
        } else {
            //  Advance other customers
            await client.query(`
                UPDATE customer
                SET delivery_order = delivery_order - 1
                WHERE delivery_order BETWEEN ($1) AND ($2);
                `, [old_order, new_order]
            );
            //  Defer customer in request
            await client.query(`
                UPDATE customer
                SET delivery_order = ($1)
                WHERE id = ($2);
                `, [new_order, id]
            );
        }
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
