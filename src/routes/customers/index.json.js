import supabase from '$lib/db';

/*export async function get() {
    return supabase
        .from('customers')
        .select(`*`);
}*/

export const get = async (_) => {
    let { data } = await supabase.from('customers').select('*');
    return {
        body: data
    };
};