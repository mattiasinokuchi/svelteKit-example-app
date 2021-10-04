/*  This module contains endpoints to the database
    for the ordering page   */

import supabase from '$lib/db';

export const get = async (_) => {
    const { error, data } = await supabase
        .from('customer')
        .select(`
            id,
            first_name,
            last_name,
            active,
            delivery_order,
            order_book (
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

    // Sort orders in delivery order
    const inDeliveryOrder = data.sort(function (a, b) {
        return a.delivery_order - b.delivery_order;
    });

    return {
        body: inDeliveryOrder
    };
};
