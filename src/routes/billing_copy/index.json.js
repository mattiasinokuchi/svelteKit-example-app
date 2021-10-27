/*  This module contains endpoints to the database
    for the billing page   */

import supabase from '$lib/db';
import { pool } from '$lib/db';

//  Read deliveries
export const get = async (_) => {
    try {
        const res = await pool.query(`
            SELECT *
            FROM delivery
            INNER JOIN customer
            ON customer.id = delivery.customer_id
        `);
        //  Group deliveries by customer
        const deliveriesByCustomer = res.rows.reduce((acc, obj) => {
            if (acc.find(
                accObject => accObject.customer_id === obj.customer_id
            )) {
                const index = acc.findIndex(
                    accObject => accObject.customer_id === obj.customer_id
                );
                acc[index].delivery.push({
                    date: obj.created_at,
                    order_id: obj.order_id,
                    product: obj.product_name,
                    price: obj.price
                });
            } else {
                acc.push({
                    customer_id: obj.customer_id,
                    first_name: obj.first_name,
                    last_name: obj.last_name,
                    delivery: [{
                        date: obj.created_at,
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

// Clear delivery
export const post = async (request) => {
    const past_delivery = [];
    const { data, error } = await supabase
        .from('order_')
        .update({
            past_delivery: past_delivery
        })
        .eq('id', request.body.get('id'));

    if (!error && request.headers.accept !== 'application/json') {
        return {
            status: 303,
            headers: {
                location: '/billing'
            }
        };
    }
    return {
        body: data
    };
};