import supabase from '$lib/db';

export const get = async ({ params }) => {
    const { id } = params;
    let { data } = await supabase
        .from('subscriptions')
        .select('*')
        .match({ id: id })
        .single();
    return {
        body: data
    };
};