import supabase from '$lib/db';

export async function get() {
    return supabase
        .from('subscriptions')
        .select(`*`);
}
