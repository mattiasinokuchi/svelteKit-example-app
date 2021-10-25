/*  This module contains endpoints to the database
    for the customers parent and child pages   */

import { pool } from '$lib/db';

//  Reads data for a specific customer
export const get = async ({ params }) => {
    try {
        const { id } = params;
        const res = await pool.query(`
            SELECT * FROM customer
            WHERE id = $1
            `, [id]
        );
        return {
            body: res.rows[0]
        }
    } catch (error) {
        console.log(error);
    }
}

//  Deletes a customer
export const del = async (request) => {
    /*if (!request.locals.user) {
        return { status: 401 };
    }*/
    const id = request.params.id;
    try {
        /*  Avoids string concatenating parameters into the
            query text directly to prevent sql injection    */
        await pool.query(`
            DELETE FROM customer
            WHERE id = $1`,
            [id]
        );
        return {
            status: 303,
            headers: {
                location: '/customer'
            }
        };
    } catch (error) {
        console.log(error)
    }
};