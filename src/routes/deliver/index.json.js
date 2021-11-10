/*  This module contains endpoints to the database
    for countings to the delivery page   */

import { pool } from '$lib/db';

//  Reads all orders
export const get = async (_) => {
    try {
        let deliveries = [];
        for (let index = 0; deliveries.length < 10; index++) {
            const res = await pool.query(`
            
                SELECT
                    TO_CHAR(CURRENT_DATE + $1*delivery_interval - MOD((CURRENT_DATE - start_date), delivery_interval), 'yyyy-mm-dd') AS delivery_date,
                    product_name,
                    COUNT (product_name)
                FROM
                    order_table
                INNER JOIN
                    product_table
                ON
                    product_table.id = order_table.product_id
                INNER JOIN
                    customer_table
                ON
                    customer_table.id = order_table.customer_id
                WHERE
                    customer_table.active = 'true'
                AND
                    -- no time-out on selected day
                    customer_id
                    NOT IN (
                        SELECT customer_id
                        FROM time_out_table
                        WHERE ((CURRENT_DATE + $1*delivery_interval) BETWEEN start_time::date AND end_time)
                    )
                AND     
                    -- not delivered
                    order_table.id
                    NOT IN (
                        SELECT order_id
                        FROM delivery_table
                        WHERE delivery_time::date = (CURRENT_DATE + $1*delivery_interval) 
                    )
                GROUP BY
                    product_name,
                    CURRENT_DATE + $1*delivery_interval - MOD((CURRENT_DATE - start_date), delivery_interval);
            `, [index]);
            res.rows.forEach(element => {
                deliveries.push(element);
            });
        }

        //  Group deliveries by date
        const deliveriesGroupedByDate = deliveries.reduce((acc, obj) => {
            if (acc.find(
                accObject => accObject.delivery_date === obj.delivery_date
            )) {
                const index = acc.findIndex(
                    accObject => accObject.delivery_date === obj.delivery_date
                    );
                acc[index].deliveries.push({
                    product_name: obj.product_name,
                    count: obj.count
                });
            } else {
                acc.push({
                    delivery_date: obj.delivery_date,
                    deliveries: [{
                        product_name: obj.product_name,
                        count: obj.count
                        }]
                });
            }
            return acc;
        }, []);

        return {
            body: deliveriesGroupedByDate
        }
    } catch (error) {
        console.log(error);
    }
}
