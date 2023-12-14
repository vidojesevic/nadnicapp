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

export const getJobsAll = async () => {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query(`SELECT j.caption, j.description, j.price, j.date_start, 
                        j.date_end, j.time_start, j.time_end, l.street, l.numbre, 
                        l.zip, l.city, u.first_name, u.last_name, u.telefon, c.category FROM
                        job AS j JOIN location AS l ON j.location_id=l.id_location
                        JOIN users AS u on j.user_id=u.id JOIN job_category AS c 
                        ON j.category_id=c.category_id ORDER BY j.date_start ASC`);

        return rows;
    } catch (err) {
        console.error('Error in getJobsAll:', err);
        throw err;
    } finally {
        if (conn) {
            conn.release();
        }
    }
};

export const getCategory = async () => {
    let conn;
    try {
        conn = await pool.getConnection();
        const category = await conn.query("SELECT * FROM job_category;");

        return category;
    } catch (err) {
        console.log("Error in getCategory: " + err);
        throw err;
    } finally {
        if (conn) {
            conn.release();
        }
    }
};

export const getJobsByArea = async (area) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const query = `SELECT j.caption, j.description, j.price, j.date_start, 
                        j.date_end, j.time_start, j.time_end, l.street, l.numbre, 
                        l.zip, l.city, u.first_name, u.last_name, u.telefon, c.category FROM
                        job AS j JOIN location AS l ON j.location_id=l.id_location
                        JOIN users AS u on j.user_id=u.id JOIN job_category AS c 
                        ON j.category_id=c.category_id WHERE l.city = ? ORDER BY j.date_start ASC`;
        const rows = await conn.query(query, [area]);

        // console.log(rows);
        return rows;
    } catch (err) {
        console.error('Error in getJobsByArea:', err);
        throw err;
    } finally {
        if (conn) {
            conn.release();
        }
    }
};

export const getJobsByCategory = async (category) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const query = `SELECT j.caption, j.description, j.price, j.date_start, 
                        j.date_end, j.time_start, j.time_end, l.street, l.numbre, 
                        l.zip, l.city, u.first_name, u.last_name, u.telefon, c.category FROM
                        job AS j JOIN location AS l ON j.location_id=l.id_location
                        JOIN users AS u on j.user_id=u.id JOIN job_category AS c 
                        ON j.category_id=c.category_id WHERE c.category = ?`;
        const rows = await conn.query(query, [category]);

        // console.log(rows);
        return rows;
    } catch (err) {
        console.error('Error in getJobsByCategory:', err);
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

        // console.log(rows);
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


