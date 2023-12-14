import { Router } from 'express';
import { createLocation, getUsers, getCategory, getUsersByArea, getLastLocation, getJobsAll, getJobsByArea, getJobsByCategory } from '../../config/db.js';

const router = new Router();

router.get('/users/all', async (_req, res) => {
    try {
        const users = await getUsers();
        res.setHeader('Content-Type', 'application/json');
        res.json(users);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get('/users/area', async (req, res) => {
    const area = req.query.area;

    try {
        const users = await getUsersByArea(area);
        res.setHeader('Content-Type', 'application/json');
        // console.log(users)
        res.json(users);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get('/jobs/area', async (req, res) => {
    const area = req.query.area;

    try {
        const jobs = await getJobsByArea(area);
        res.setHeader('Content-Type', 'application/json');
        // console.log(users)
        res.json(jobs);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get('/jobs/category', async (req, res) => {
    const category = req.query.category;

    try {
        const jobs = await getJobsByCategory(category);
        res.setHeader('Content-Type', 'application/json');
        // console.log(jobs)
        res.json(jobs);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get('/jobs/categories', async (_, res) => {
    try {
        const category = await getCategory();
        res.setHeader('Content-Type', 'application/json');
        // console.log(jobs)
        res.json(category);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get('/jobs/all', async (_req, res) => {
    try {
        const job = await getJobsAll();
        res.setHeader('Content-Type', 'application/json');
        // console.log(users)
        res.json(job);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get('/location/last', async (_req, res) => {
    try {
        const id = await getLastLocation();
        res.setHeader('Content-Type', 'application/json');
        res.json(id);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post('/users/createUser', async (req, res) => {
    const { first_name, last_name, email, telefon, username, role_id } = req.body;

    try {
        const userCr = await createUser(first_name, last_name, email, telefon, username, role_id);
        res.setHeader('Content-Type', 'application/json');
        res.json(userCr);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post('/location/create', async (req, res) => {
    const { street, numbre, city, zip} = req.body;

    try {
        const location = await createLocation(street, numbre, city, zip);
        res.setHeader('Content-Type', 'application/json');
        res.json(location);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;
