import supabase from '$lib/db';

/*export async function get({ params }) {
    const { lastName } = params;
    const response = await supabase
        .from('customers')
        .select(`
            firstName,
            lastName,
            status (active),
            customer_purchases ( product ( name ) )`)
        .match({lastName: lastName});
    return {
        body: {
            lastName,
            firstName: response.data[0].firstName,
            subscription: response.data[0].status,
            products: response.data[0].customer_purchases
        },
    };
}*/

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