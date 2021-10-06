/*  This module contains endpoints to the database
    for the deliver page   */

import supabase from '$lib/db';
import { database } from 'faker/locale/de';

export const get = async (_) => {

    const { error, data } = await supabase
        .from('customer')
        .select(`
            id,
            first_name,
            last_name,
            delivery_order,
            orders (
                id,
                product (
                    name,
                    id,
                    price
                )
            )
        `);

    console.log(error,data);

    // Sort in delivery order
    const inDeliveryOrder = data.sort(function (a, b) {
        return a.delivery_order - b.delivery_order;
    });

    return {
        body: inDeliveryOrder
    };
};
