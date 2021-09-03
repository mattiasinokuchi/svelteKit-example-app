import supabase from '$lib/db';

export async function get({ params }) {
    const { lastName } = params;
    const response = await supabase
        .from('customers')
        .select(`
            firstName,
            lastName,
            subscriptions (name)`
        )
        .match({lastName: lastName});
    return {
        body: {
            lastName,
            firstName: response.data[0].firstName,
            subscription: response.data[0].subscriptions,
        },
    };
}