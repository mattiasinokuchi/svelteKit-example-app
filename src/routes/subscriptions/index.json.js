import supabase from '$lib/db';

/*export async function get() {
    return supabase
        .from('products')
        .select(`*`);
}*/

export const get = async (_) => {
    let { data } = await supabase.from('products').select('*');
    return {
        body: data
    };
};