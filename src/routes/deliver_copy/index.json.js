/*  This module contains endpoints to the database
    for the delivery page   */

import { pool } from '$lib/db';

//  Reads all orders
export const get = async (_) => {
    try {
        const res = await pool.query(`
            SELECT order_.id, customer.id, first_name, last_name, name
            FROM order_
            INNER JOIN customer
            ON customer.id = order_.customer
            INNER JOIN product
            ON product.id = order_.product
        `);
        const result = res.rows.reduce((acc, obj) => {
            if (acc.find(object => object.first_name === obj.first_name)) {
                const index = acc.findIndex(object => object.first_name === obj.first_name);
                acc[index].orders.push(obj.name);
            } else {
                acc.push({
                    id: obj.id,
                    first_name: obj.first_name,
                    last_name: obj.last_name,
                    orders: [obj.name]
                });
            }
            return acc;
        }, []);
        return {
            body: result
        }
    } catch (error) {
        console.log(error);
    }
}

//  Register a delivery
export const post = async (request) => {
    const values = [
        request.body.get('order'),
        request.body.get('product')
    ];
    try {
        /*  Avoids string concatenating parameters into the
            query text directly to prevent sql injection    */
        await pool.query(`
            INSERT INTO delivery(customer, product)
            VALUES($1, $2)
            RETURNING *`,
            values
        );
        return {
            status: 303,
            headers: {
                location: request.headers.referer
            }
        };
    } catch (error) {
        console.log(error)
    }
};