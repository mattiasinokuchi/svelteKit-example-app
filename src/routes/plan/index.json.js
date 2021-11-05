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
                delivery_interval IS NOT NULL;
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
                        price: obj.price
                    }]
                });
            }
            return acc;
        }, []);
        return {
            body: res.rows
        }
    } catch (error) {
        console.log(error);
    }
}
