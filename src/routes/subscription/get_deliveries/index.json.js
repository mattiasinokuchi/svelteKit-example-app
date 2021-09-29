import supabase from '$lib/db';

export const get = async (_) => {
    const { data } = await supabase
        .from('delivery')
        .select(`
            id,
            created_at,
            product,
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

