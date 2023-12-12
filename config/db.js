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

        console.log(rows);
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

export const getLastLocation = async () => {
    let conn;
    try {
        conn = await pool.getConnection();
        const idRes = await conn.query(`SELECT id_location FROM location ORDER BY id_location DESC LIMIT 1`);

        const [id] = idRes;

        return id;
    } catch (err) {
        console.error('Error in getLastLocation:', err);
        throw err;
    } finally {
        if (conn) {
            conn.release();
        }
    }
};

export const createUser = async (first_name, last_name, email, telefon, username, role_id) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const query = `INSERT INTO users (first_name, last_name, email, telefon, role_id, username) values (?,?,?,?,?,?)`;
        const rows = await conn.query(query, [first_name, last_name, email, telefon, username, role_id]);

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

export const createLocation = async (street, numbre, city, zip) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const query = `INSERT INTO location (street, numbre, city, zip) values (?, ?, ?, ?)`;
        const rows = await conn.query(query, [street, numbre, city, zip]);
        const location_id = rows.insertId;

        const sanitizedResult = {
            affectedRows: rows.affectedRows,
            insertId: Number(rows.insertId),
            warningStatus: rows.warningStatus
        };

        console.log(sanitizedResult);
        return sanitizedResult;
    } catch (err) {
        console.error('Error in creating location records:', err);
        throw err;
    } finally {
        if (conn) {
            conn.release();
        }
    }
}
