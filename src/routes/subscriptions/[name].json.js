import supabase from '$lib/db';

/*export async function get({ params }) {
    const { name } = params;
    const response = await supabase
        .from('products')
        .select(`*`)
        .match({name: name});
    return {
        body: {
            name,
            name: response.data[0].name,
            price: response.data[0].price
        },
    };
}*/

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