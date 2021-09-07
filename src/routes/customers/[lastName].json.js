import supabase from '$lib/db';

export const get = async ({ params }) => {
    const { lastName } = params;
    let { data } = await supabase
        .from('customers')
        .select(`
            firstName,
            lastName,
            status (active),
            customer_purchases ( product ( name ) )`)
        .match({ lastName: lastName });
    return {
        body: data
    };
};