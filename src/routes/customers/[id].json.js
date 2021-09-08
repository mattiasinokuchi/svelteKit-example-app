import supabase from '$lib/db';

export const get = async ({ params }) => {
    const { id } = params;
    let { data } = await supabase
        .from('customers')
        .select(`
            firstName,
            lastName,
            status (active),
            customers_subscriptions ( product ( name ) )`)
        .match({ id: id })
        .single();
    return {
        body: data
    };
};