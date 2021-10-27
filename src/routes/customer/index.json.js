/*  This module contains endpoints to the
    database for the customers parent page   */

import { pool } from '$lib/db';

//  Reads all customers
export const get = async (_) => {
    const res = await pool.query(`
        SELECT *
        FROM customer_duplicate
        ORDER BY delivery_order ASC`
    );
    return {
        body: res.rows
    };
};

//  Adds a new customer
export const post = async (request) => {
    const values = [
        request.body.get('firstName'),
        request.body.get('lastName')
    ];
    try {
        /*  Avoids string concatenating parameters into the
            query text directly to prevent sql injection    */
        await pool.query(`
            INSERT INTO customer(first_name, last_name)
            VALUES($1, $2)
            RETURNING *`,
            values
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
