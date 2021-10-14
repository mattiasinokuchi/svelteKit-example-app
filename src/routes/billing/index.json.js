/*  This module contains endpoints to the database
    for the billing page   */

import supabase from '$lib/db';

// Read deliveries
export const get = async (_) => {
    const { error, data } = await supabase
        .from('customer')
        .select(`
            id,
            first_name,
            last_name,
            delivery_order,
            order_ (
                id,
                product (
                    name,
                    id,
                    price
                ),
                past_delivery
            )
        `);
    if (error) console.log(error);

    // Remove customer without deliveries
    const delivered = data.filter(({ order_ }) =>
        order_.some(({ past_delivery }) => {
            if (past_delivery) past_delivery.length>0
        })
    );

    // Sort in delivery order
    const inDeliveryOrder = delivered.sort(function (a, b) {
        return a.delivery_order - b.delivery_order;
    });
    return {
        body: inDeliveryOrder
    };
};

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