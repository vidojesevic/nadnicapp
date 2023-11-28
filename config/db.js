import mariadb from 'mariadb';
import { dbConfig } from './db.config.js';

const pool = mariadb.createPool(dbConfig);

export const getUsers = async () => {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query(`SELECT u.id, u.first_name, u.last_name, 
                                u.username, u.email, u.telefon, r.role, l.street, l.numbre, 
                                l.zip, l.city FROM users AS u JOIN role AS r ON 
                                u.role_id=r.id_role JOIN location AS l 
                                ON u.location_id=l.id_location ORDER BY u.created DESC`);

        return rows;
    } catch (err) {
        console.error('Error in getUsers:', err);
        throw err;
    } finally {
        if (conn) {
            conn.release();
        }
    }
};

export const getUsersByArea = async (area) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const query = `SELECT u.id, u.first_name, u.last_name, u.username, u.email, 
                    u.telefon, r.role, l.street, l.numbre, l.zip, l.city 
                    FROM users AS u JOIN role AS r ON u.role_id=r.id_role 
                    JOIN location AS l ON u.location_id=l.id_location WHERE l.city = ?`;
        const rows = await conn.query(query, [area]);

        return rows;
    } catch (err) {
        console.error('Error in getUsersByArea:', err);
        throw err;
    } finally {
        if (conn) {
            conn.release();
        }
    }
};

export const createLocation = async (street, numbre, city) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const query = `INSERT INTO location (street, numbre, city, zip) values (?,?,?,?,?,?)`;
        const rows = await conn.query(query, [street, numbre, city]);

        return rows;
    } catch (err) {
        console.error('Error in getUsersByArea:', err);
        throw err;
    } finally {
        if (conn) {
            conn.release();
        }
    }
}

export const createUser = async (data) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const query = `INSERT INTO users (first_name, last_name, email, telefon,
                        role_id, username) values (?,?,?,?,?,?)`;
        const rows = await conn.query(query, [data]);

        return rows;
    } catch (err) {
        console.error('Error in getUsersByArea:', err);
        throw err;
    } finally {
        if (conn) {
            conn.release();
        }
    }
};
