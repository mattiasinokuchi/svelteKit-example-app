/*  This module contains endpoints to the database
    for the billing page   */

import { pool } from '$lib/db';

//  Read deliveries...
export const get = async (_) => {
    try {
        const res = await pool.query(`
            SELECT
                delivery.id AS delivery_id, *
            FROM delivery
            INNER JOIN customer
            ON customer.id = delivery.customer_id
        `);
        //  ...then group deliveries by customer
        const deliveriesByCustomer = res.rows.reduce((acc, obj) => {
            if (acc.find(
                accObject => accObject.customer_id === obj.customer_id
            )) {
                const index = acc.findIndex(
                    accObject => accObject.customer_id === obj.customer_id
                );
                acc[index].to_pay = acc[index].to_pay + obj.price;
                acc[index].delivery.push({
                    date: obj.created_at,
                    delivery_id: obj.delivery_id,
                    order_id: obj.order_id,
                    product: obj.product_name,
                    price: obj.price
                });
            } else {
                acc.push({
                    customer_id: obj.customer_id,
                    first_name: obj.first_name,
                    last_name: obj.last_name,
                    to_pay: obj.price,
                    delivery: [{
                        date: obj.created_at,
                        delivery_id: obj.delivery_id,
                        order_id: obj.order_id,
                        product: obj.product_name,
                        price: obj.price
                    }]
                });
            }
            return acc;
        }, []);
        return {
            body: deliveriesByCustomer
        }
    } catch (error) {
        console.log(error);
    }
}

//  Delete delivery
export const del = async (request) => {
    /*if (!request.locals.user) {
        return { status: 401 };
    }*/
    try {
        /*  Avoids string concatenating parameters into the
            query text directly to prevent sql injection    */
        await pool.query(`
            DELETE FROM delivery
            WHERE id = $1`,
            [request.body.get('id')]
        );
        return {
            status: 303,
            headers: {
                location: '/billing'
            }
        };
    } catch (error) {
        console.log(error)
    }
};