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
    const inDeliveryOrder = data.sort(function (a, b) {
        return a.delivery_order - b.delivery_order;
    });
    return {
        body: inDeliveryOrder
    };
};
