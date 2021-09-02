import supabase from '$lib/db';

export async function get({ params }) {
    const { name } = params;
    const response = await supabase.from('subscriptions').select(`*`).match({name: name});
    return {
        body: {
            name,
            name: response.data[0].name,
            emoji: response.data[0].name
        },
    };
}