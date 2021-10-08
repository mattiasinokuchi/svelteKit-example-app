/*  This module contains endpoints to the database
    for the delivery page   */

import supabase from '$lib/db';

// Reads all deliveries
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
                past_delivery,
                product (
                    name,
                    id,
                    price,
                    emoji
                )
            )
        `);
    if (error) return {
        body: error
    }
    
    // Remove customer already delivered today
    const currentDate = new Date().toISOString().split("T")[0];
	const notDelivered = data.filter(({ order_ }) =>
		order_.some(({ past_delivery }) =>
			!past_delivery.includes(currentDate)
		)
	);

    // Sort in delivery order
    const inDeliveryOrder = notDelivered.sort(function (a, b) {
        return a.delivery_order - b.delivery_order;
    });
    
    return {
        body: inDeliveryOrder
    };
};

// Register a delivery
export const post = async (request) => {
    const currentDate = new Date().toISOString().split("T")[0];
    // Fix for incorrect date format
    if (request.body.get('past_delivery') === '') {
        past_delivery = [currentDate];
    } else {
        past_delivery = request.body.get('past_delivery').split(',');
        past_delivery.push(currentDate);
    }
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
                location: '/deliver'
            }
        };
    }
    return {
        body: data
    };
};