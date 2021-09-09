import supabase from '$lib/db';

export const get = async ({ params }) => {
    const { id } = params;
    let { data } = await supabase
        .from('customers_subscriptions')
        .select(`
            customer ( first_name ),
            subscription ( name )`)
        .match({ id: id })
        .single();
    return {
        body: data
    };
};

export const del = async (request) => {
    /*if (!request.locals.user) {
        return { status: 401 };
    }*/
    console.log(request.params);
    const { data, error } = await supabase
        .from('customers_subscriptions')
        .delete().match({
            id: request.params.id,
            //user_id: request.locals.user.id
        });

    if (!error && request.headers.accept !== 'application/json') {
        return {
            status: 303,
            headers: {
                location: '/customers_subscriptions'
            }
        };
    }
};