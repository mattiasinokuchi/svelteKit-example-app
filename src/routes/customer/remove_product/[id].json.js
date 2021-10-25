/*  This module contains endpoints to the database
    for removing a product from a customer   */

import { pool } from '$lib/db';

//  Deletes a customer order
export const del = async (request) => {
    /*if (!request.locals.user) {
        return { status: 401 };
    }*/
    const id = request.params.id;
    try {
        /*  Avoids string concatenating parameters into the
            query text directly to prevent sql injection    */
        await pool.query(`
            DELETE FROM order_
            WHERE id = $1`,
            [id]
        );
        return {
            status: 303,
            headers: {
                location: request.headers.referer
            }
        };
    } catch (error) {
        console.log(error)
    }
};