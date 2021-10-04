import supabase from '$lib/db';

export const get = async (_) => {
    const { data } = await supabase
        .from('delivery')
        .select(`
            created_at,
            product_id,
            customer(id)
        `);
    return {
        body: data
    };
};

