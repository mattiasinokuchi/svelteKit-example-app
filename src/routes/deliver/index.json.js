/*  This module contains endpoints to the database
    for countings to the delivery page   */

import { pool } from '$lib/db';

//  Reads all orders
export const get = async (_) => {
    try {
        let deliveries = [];
        const dateIn30Days = new Date();
        dateIn30Days.setDate(dateIn30Days.getDate() + 30);
        function within30Days(delivery) {
            return new Date(delivery.delivery_date) < dateIn30Days;
        }
        for (let index = 0; deliveries.every(within30Days); index++) {
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
                AND
                    -- delivery is less than 30 days ahead
                    $1*delivery_interval < 30
                GROUP BY
                    product_name,
                    CURRENT_DATE + $1*delivery_interval - MOD((CURRENT_DATE - start_date), delivery_interval)
                ORDER BY
                    product_name;
            `, [index]);
            if (res.rows.length < 1) break;
            res.rows.forEach(element => {
                deliveries.push(element);
            });
        }
        const deliveriesSortedByDate = deliveries.sort((a, b) => {
            return new Date(a.delivery_date) - new Date(b.delivery_date)
        });
        //  Group deliveries by date
        const deliveriesGroupedByDate = deliveriesSortedByDate.reduce((acc, obj) => {
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
