import supabase from '$lib/db';

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

    if (error) return {
        body: error
    }

    return {
        body: data
    };
};