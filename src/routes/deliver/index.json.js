/*  This module contains endpoints to the database
    for the delivery page   */

import { pool } from '$lib/db';

//  Reads all orders
export const get = async (_) => {
    try {
        const res = await pool.query(`
            SELECT
                customer.id AS customer_id,
                first_name,
                last_name,
                order_.id AS order_id,
                name AS product_name,
                price AS product_price
            FROM order_
            INNER JOIN customer
            ON customer.id = order_.customer
            INNER JOIN product
            ON product.id = order_.product
        `);
        //  Group orders by customer
        const ordersByCustomer = res.rows.reduce((acc, obj) => {
            if (acc.find(accObject => accObject.first_name === obj.first_name)) {
                const index = acc.findIndex(accObject => accObject.first_name === obj.first_name);
                acc[index].orders.push({
                    id: obj.order_id,
                    product: obj.product_name,
                    price: obj.product_price
                });
            } else {
                acc.push({
                    customer_id: obj.customer_id,
                    first_name: obj.first_name,
                    last_name: obj.last_name,
                    orders: [{
                        order_id: obj.order_id,
                        product: obj.product_name,
                        price: obj.product_price
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

//  Register a delivery
export const post = async (request) => {
    const values = [
        request.body.get('customer_id'),
        request.body.get('price'),
        request.body.get('product_name'),
        request.body.get('order_id')
    ];
    try {
        /*  Avoids string concatenating parameters into the
            query text directly to prevent sql injection    */
        await pool.query(`
            INSERT INTO delivery(customer_id, price, product_name, order_id)
            VALUES($1, $2, $3, $4)
            RETURNING *`,
            values
        );
        return {
            status: 303,
            headers: {
                location: '/deliver'
            }
        };
    } catch (error) {
        console.log(error)
    }
};