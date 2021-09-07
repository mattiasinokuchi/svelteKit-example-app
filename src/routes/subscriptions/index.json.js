import supabase from '$lib/db';

export const get = async (_) => {
    let { data } = await supabase.from('products').select('*');
    return {
        body: data
    };
};