/*  This module contains endpoints to the database
    for getting customer time-out   */

import { pool } from '$lib/db';

export const get = async ({ params }) => {
    try {
        const { customer_id } = params;
        const res = await pool.query(`
            SELECT
                id AS time_out_id,
                TO_CHAR(start_time :: DATE, 'yyyy-mm-dd') AS start_date,
                TO_CHAR(end_time :: DATE, 'yyyy-mm-dd') AS end_date, *
            FROM time_out_table
            WHERE customer_id = $1
            ORDER BY start_date ASC;
            `, [customer_id]);
        return {
            body: res.rows
        }
    } catch (error) {
        console.log(error);
    }
}
