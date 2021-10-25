/*  This module contains endpoints to the database
    for the customers parent and child pages   */

import supabase from '$lib/db';
import { pool } from '$lib/db';


//  Reads data for a specific customer
export const get = async ({ params }) => {
    try {
        const { id } = params;
        const res = await pool.query(
            `SELECT * FROM customer
            WHERE id = $1`,
            [id]
        );
        return {
            body: res.rows[0]
        }
    } catch (error) {
        console.log(error);
    }
}

/* Deletes a customer */
export const del = async (request) => {
    /*if (!request.locals.user) {
        return { status: 401 };
    }*/
    const { error } = await supabase
        .from('customer')
        .delete().match({
            id: request.params.id,
            //user_id: request.locals.user.id
        });

    if (!error && request.headers.accept !== 'application/json') {
        return {
            status: 303,
            headers: {
                location: '/customer'
            }
        };
    }
};
