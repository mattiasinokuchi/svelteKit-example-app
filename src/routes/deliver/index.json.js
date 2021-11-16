/*  This module contains endpoint to the database
    for the parent delivery page   */

import { pool } from '$lib/db';

export const get = async (_) => {
    try {
        const res = await pool.query(`
            SELECT
                product_name,
                COUNT (product_name),
                CASE
                    WHEN delivery_interval IS NULL
                        THEN TO_CHAR(start_date, 'yyyy-mm-dd')
                    ELSE
                    TO_CHAR(
                    --- Todays date...
                    CURRENT_DATE +
                    -- ...added to a serie using the delivery interval...
                    index*delivery_interval -
                    -- ...substracted by the remainder (days since last delivery)...
                    MOD(
                        -- ...after division of days since delivery started...
                        CURRENT_DATE - start_date,
                        -- ...by the delivery interval (remainder is 0 on delivery days)...
                        delivery_interval),
                        -- ...converted to...
                        'yyyy-mm-dd')
                END delivery_date
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
            CROSS JOIN
                generate_series(0,89) AS index
            WHERE
                -- subscription is activated
                customer_table.active = 'true'
            AND
                -- no time-out on selected day
                customer_id
                    NOT IN (
                        SELECT customer_id
                        FROM time_out_table
                        WHERE ((CURRENT_DATE + index*delivery_interval) BETWEEN start_time::date AND end_time)
                    )
            AND     
                -- not delivered
                order_table.id
                    NOT IN (
                        SELECT order_id
                        FROM delivery_table
                        WHERE delivery_time::date = (CURRENT_DATE + index*delivery_interval) 
                    )
            AND
                -- delivery within 90 days (to prevent products with shorter delivery interval being replaced by products with longer interval)
                CASE
                    -- for one-time orders to be present (and not be counted 90 times)
                    WHEN index = 0
                        THEN index*delivery_interval < 90 OR delivery_interval IS NULL
                    ELSE
                    index*delivery_interval < 90
                    END
            GROUP BY
                product_name,
                delivery_date
            ORDER BY
                product_name;
            `);
        const deliveriesSortedByDate = res.rows.sort((a, b) => {
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
