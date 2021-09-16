import supabase from '$lib/db';

export const get = async ({ params }) => {
    const { id } = params;
    let { data } = await supabase
        .from('customers')
        .select(`
            id,
            first_name,
            last_name,
            status (active),
            customers_subscriptions (id, subscription(name))`)
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
    const { data, error } = await supabase
        .from('customers')
        .delete().match({
            id: request.params.id,
            //user_id: request.locals.user.id
        });

    if (!error && request.headers.accept !== 'application/json') {
        return {
            status: 303,
            headers: {
                location: '/customers'
            }
        };
    }
};

export const update = async (request) => {
    const order = parseInt(request.body.get('order'));
    console.log(request.params.id, order, typeof (order));
    /*const { data, error } = await supabase
        .from('customers')
        .upsert([
            {'id': request.params.id, 'order': order-1}]);
    console.log(data, error);*/
    const { data } = await supabase
        .from('customers')
        .select('id, delivery_order')
        .match({ delivery_order: order-1 })
        .single();
    console.log(data);
    const { body, error } = await supabase
        .from('customers')
        .upsert([
            {'id': request.params.id, 'delivery_order': order-1},
            {'id': data.id, 'delivery_order': order}]);
    console.log(body, error);

    if (!error && request.headers.accept !== 'application/json') {
        return {
            status: 303,
            headers: {
                location: '/customers'
            }
        };
    }

    return {
        body: data
    }
};