/*  This module contains endpoint to the database
    for the parent delivery page   */

import { pool } from '$lib/db';

export const get = async (_) => {
    try {
        // Declare an array for responses from looped query
        let deliveries = [];
        // Define date object used in condition for looping query
        const dateIn90Days = new Date();
        dateIn90Days.setDate(dateIn90Days.getDate() + 90);
        // Define function used in condition for looping query
        function within90Days(delivery) {
            return new Date(delivery.delivery_date) < dateIn90Days;
        }
        // Loop query until all deliveries within 90 days are returned
        for (let index = 0; deliveries.every(within90Days); index++) {
            const res = await pool.query(`
                SELECT
                    -- delivery date (converted to yyyy-mm-dd) given by...
                    TO_CHAR(
                        --- ...todays date...
                        CURRENT_DATE +
                        -- ...added to a serie using the delivery interval...
                        $1*delivery_interval -
                        -- ...substracted by the remainder (days since last delivery)...
                        MOD(
                            -- ...after division of days since delivery started...
                            CURRENT_DATE - start_date,
                            -- ...by the delivery interval (remainder is 0 on delivery days)...
                            delivery_interval),
                        'yyyy-mm-dd')
                    AS delivery_date,
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
                    -- subscription is activated
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
                    -- delivery within 90 days (to prevent products with shorter
                    -- delivery interval being replaced by products with longer interval)
                    $1*delivery_interval < 90
                GROUP BY
                    product_name,
                    -- delivery date (same expression as above)
                    CURRENT_DATE +
                    $1*delivery_interval -
                    MOD((CURRENT_DATE - start_date), delivery_interval)
                ORDER BY
                    product_name;
            `, [index]);
            // Prevent infinite loop
            if (index > 90) break;
            // Add response to array
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
