/*  This module contains endpoints to the database
    for the billing page   */

import { pool } from '$lib/db';

//  Read deliveries...
export const get = async (_) => {
    try {
        const res = await pool.query(`
            SELECT
                delivery_table.id AS delivery_id,
                TO_CHAR(delivery_time :: DATE, 'yyyy-mm-dd') AS delivery_date, *
            FROM delivery_table
            INNER JOIN customer_table
            ON customer_table.id = delivery_table.customer_id
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
                    delivery_date: obj.delivery_date,
                    delivery_id: obj.delivery_id,
                    order_id: obj.order_id,
                    product_name: obj.product_name,
                    price: obj.price
                });
            } else {
                acc.push({
                    customer_id: obj.customer_id,
                    first_name: obj.first_name,
                    last_name: obj.last_name,
                    to_pay: obj.price,
                    delivery: [{
                        delivery_date: obj.delivery_date,
                        delivery_id: obj.delivery_id,
                        order_id: obj.order_id,
                        product_name: obj.product_name,
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
            DELETE FROM delivery_table
            WHERE id = $1`,
            [request.body.get('delivery_id')]
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