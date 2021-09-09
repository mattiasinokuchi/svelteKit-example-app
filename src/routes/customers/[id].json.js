import supabase from '$lib/db';

export const get = async ({ params }) => {
    const { id } = params;
    let { data } = await supabase
        .from('customers')
        .select(`
            first_name,
            lastName,
            status (active),
            customers_subscriptions ( subscription ( name ) )`)
        .match({ id: id })
        .single();
    return {
        body: data
    };
};

/*export const patch = async (request) => {
    if (!request.locals.user) {
        return { status: 401 };
    }

    const { data, error } = await supabase
    .from('customers_subscriptions')
    .upsert({
        id: request.params.id,
        task: request.body.get('task'),
        is_complete: request.body.get('is_complete'),
        user_id: request.locals.user.id
    });

    if (!error && request.headers.accept !== 'application/json') {
        return {
            status: 303,
            headers: {
                location: '/todos'
            }
        };
    }

    return {
        body: data[0]
    };
};*/