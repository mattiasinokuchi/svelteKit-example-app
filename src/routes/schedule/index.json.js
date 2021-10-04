import supabase from '$lib/db';

export const get = async (_) => {
    let { error, data } = await supabase
        .from('schedule')
        .select('*');
    console.log(error, data);
    return {
        body: data
    };
};