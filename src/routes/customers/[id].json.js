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
    const id = parseInt(request.body.get('id'));
    const { data, error } = await supabase
        .from('customers')
        .update({ delivery_order: order })
        .eq(id, id);

    //const { data, error } = await supabase
    //    .rpc('updateorder', { row_id: order });
    //if (error) console.error(error);
    /*  Stored procedure/function (rpc) as follows:
    update customers
    set delivery_order = 0
    where id = ( select id from customers where delivery_order = row_id-1 );
    update customers 
    set delivery_order = row_id-1
    where id = ( select id from customers where delivery_order = row_id );
    update customers
    set delivery_order = row_id
    where id = ( select id from customers where delivery_order = 0 );
    */
    if (!error && request.headers.accept !== 'application/json') {
        return {
            status: 303,
            headers: {
                location: '/customers'
            }
        };
    }

    return {
        body: data,
        error: error
    }
};