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

    // Current date
    const currentDate = new Date().toISOString().split("T")[0];

    // Filter template
    var foodsILike = ['gluten-free', 'carb-free', 'flavor-free'];
    var foodsAvailable = [{ name: 'pasta', tags: ['delicious', 'has carbs'] }, { name: 'gluten-free-pizza', tags: ['gluten-free'] }, { name: 'pizza', tags: ['delicious', 'best meal of the year'] }, { name: 'rice cakes', tags: ['flavor-free'] }]

    var result = foodsAvailable.filter(function (food) {
        return food.tags.some(function (tag) {
            return foodsILike.includes(tag);
        });
    });

    console.log(result);

    // Filter for current date
    const wantedId = 1;
    const customersAvailable = data;
    const res = customersAvailable.filter(function (customer) {
        return customer.order_book.some(function (arrVal) {
            return wantedId === arrVal.product.id;
        });
    });
    console.log(res);

    // Sort in delivery order
    //const inDeliveryOrder = data.sort(function (a, b) {
    //    return a.delivery_order - b.delivery_order;
    //});

    return {
        //    body: inDeliveryOrder
        //    body: dueToday
            body: data
    };
};
