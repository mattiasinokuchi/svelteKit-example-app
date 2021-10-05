/*  This module contains endpoints to the database
    for the deliver page   */

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
                    time_interval,
                    schedule (delivery_date)
                )
            )
        `);

    // Filter for current date
    const currentDate = new Date().toISOString().split("T")[0];

    const dueToday = data.filter(function (customer) {
        return customer.order_book.some(function (orders) {
            return orders.product.schedule.find(schedule => schedule.delivery_date === currentDate) !== undefined;
        });
    });

    // Sort in delivery order
    const inDeliveryOrder = dueToday.sort(function (a, b) {
        return a.delivery_order - b.delivery_order;
    });

    return {
        body: inDeliveryOrder
    };
};
