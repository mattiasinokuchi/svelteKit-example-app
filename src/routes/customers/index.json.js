import supabase from '$lib/db';

export const get = async (_) => {
    let { data } = await supabase
        .from('customers')
        .select('*')
        .order('delivery_order', { ascending: true });;
    return {
        body: data
    };
};

export const post = async (request) => {
    /*    const { data, error } = await supabase
            .from('customers')
            .upsert({
                first_name: request.body.get('firstName'),
                last_name: request.body.get('lastName'),
            });*/

    let { data, error } = await supabase
        .rpc('addcustomer', {
            first_name: request.body.get('firstName'),
            last_name: request.body.get('lastName')
        })

    if (error) console.error(error)
    else console.log(data)


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
    };
};