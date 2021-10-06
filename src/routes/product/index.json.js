import supabase from '$lib/db';

export const get = async (_) => {
    let { data } = await supabase
        .from('product')
        .select(`
            name,
            emoji,
            id,
            order_ (id, product(name))`);
    return {
        body: data
    };
};