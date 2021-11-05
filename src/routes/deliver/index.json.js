/*  This module contains endpoints to the database
    for the delivery page   */

import { pool } from '$lib/db';

//  Reads all orders
export const get = async (_) => {
    try {
        const res = await pool.query(`
            SELECT
                customer_table.id AS customer_id,
                order_table.id AS order_id, *
            FROM order_table
            INNER JOIN customer_table ON customer_table.id = order_table.customer_id
            INNER JOIN product_table ON product_table.id = order_table.product_id
            WHERE
                customer_table.active = 'true' AND
                -- not delivered within delivery interval
                order_table.id NOT IN (
                    SELECT order_id
                    FROM delivery_table
                    WHERE (NOW()::date - delivery_time::date) < product_table.delivery_interval
                );
        `);
        //  Group orders by customer
        const ordersByCustomer = res.rows.reduce((acc, obj) => {
            if (acc.find(
                accObject => accObject.customer_id === obj.customer_id
            )) {
                const index = acc.findIndex(
                    accObject => accObject.customer_id === obj.customer_id
                );
                acc[index].orders.push({
                    order_id: obj.order_id,
                    product_name: obj.product_name,
                    product_id: obj.product_id,
                    price: obj.price
                });
            } else {
                acc.push({
                    customer_id: obj.customer_id,
                    first_name: obj.first_name,
                    last_name: obj.last_name,
                    orders: [{
                        order_id: obj.order_id,
                        product_name: obj.product_name,
                        product_id: obj.product_id,
                        price: obj.price
                    }]
                });
            }
            return acc;
        }, []);
        return {
            body: ordersByCustomer
        }
    } catch (error) {
        console.log(error);
    }
}

/*  Register a delivery.
    Client instance must be used in transaction with PostgreSQL.
    Avoids string concatenating parameters into the
    query text directly to prevent sql injection    */
export const post = async (request) => {
    const client = await pool.connect();
    const values = [
        request.body.get('customer_id'),
        request.body.get('price'),
        request.body.get('product_name'),
        request.body.get('product_id'),
        request.body.get('order_id')
    ];
    try {
        await client.query('BEGIN');
        //  Register delivery
        await pool.query(`
            INSERT INTO delivery_table(
                customer_id,
                price,
                product_name,
                product_id,
                order_id
            )
            VALUES($1, $2, $3, $4, $5)
            RETURNING *
            `, values
        );
        //  Check if the delivery is a subscription
        const res = await client.query(`
            SELECT delivery_interval
            FROM order_table
            INNER JOIN product_table ON product_table.id = order_table.product_id
            WHERE order_table.id = ($1);
            `, [request.body.get('order_id')]
        );
        if (res.rows[0].delivery_interval === 0) {
            //  Delete the order if it is not a subscription
            await client.query(`
            DELETE
            FROM order_table
            WHERE id = $1
            `, [request.body.get('order_id')]
            );
        }
        await client.query('COMMIT');
        return {
            status: 303,
            headers: {
                location: '/deliver'
            }
        };
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
};
