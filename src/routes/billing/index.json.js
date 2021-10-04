import supabase from '$lib/db';

export const get = async (_) => {
    const { data } = await supabase
        .from('billing')
        .select(`
            id,
            created_at,
            product_id,
            product_name,
            price,
            customer(
                first_name,
                last_name
            )
        `);
    return {
        body: data
    };
};

