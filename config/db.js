import mariadb from 'mariadb';
import { dbConfig } from './db.config.js';

const pool = mariadb.createPool(dbConfig);

export const getUsers = async () => {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query("SELECT u.id, u.first_name, u.last_name, u.email, u.telefon, r.role, l.street, l.numbre, l.zip, l.city FROM users AS u JOIN role AS r ON u.role_id=r.id_role JOIN location AS l ON u.location_id=l.id_location");
        console.log("Name: " + JSON.stringify(rows[0].first_name));
        // const res = await conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
        // console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }

        return rows;
    } catch (err) {
        throw err;
    } finally {
        if (conn) {
            conn.release();
        }
    }
};
