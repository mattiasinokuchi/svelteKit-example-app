/*  This module contains endpoints to the database
    for the subscription page   */

import supabase from '$lib/db';

export const get = async (_) => {
    const { data } = await supabase
        .from('customer')
        .select(`
            id,
            first_name,
            last_name,
            status (active),
            delivery_order,
            subscription (
                id,
                product (
                    name,
                    id,
                    price,
                    time_interval
                )
            ),
            delivery (
                product_id,
                product_name,
                created_at
            )
        `);

    // This block group deliveries by product_id
    const deliveries = data[0].delivery;
    
    function groupBy(objectArray, property) {
        return objectArray.reduce(function (acc, obj) {
            let key = obj[property];
            if (!acc[key]) {
                acc[key] = []
            };
            acc[key].push(obj);
            return acc;
        }, {});
    }
    const groupedDeliveries = groupBy(deliveries, 'product_id');

    data[0].delivery = groupedDeliveries;
    console.log(data);

    // This block might be useful later...
    let initialValue = 0
    let max = [{ x: 1 }, { x: 20 }, { x: 3 }].reduce(
        (previousValue, currentValue) => Math.max(previousValue, currentValue.x)
        , initialValue
    )
    
    //console.log(max) // logs 20

    // Sort subscriptions in delivery order
    const inDeliveryOrder = data.sort(function (a, b) {
        return a.delivery_order - b.delivery_order;
    });

    return {
        body: inDeliveryOrder
    };
};
