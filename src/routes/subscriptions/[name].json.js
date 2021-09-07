import supabase from '$lib/db';

export const get = async ({ params }) => {
    const { name } = params;
    let { data } = await supabase
        .from('products')
        .select('*')
        .match({ name: name });
    return {
        body: data
    };
};