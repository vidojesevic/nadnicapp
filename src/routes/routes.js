import { Router } from 'express';
import { createLocation, getUsers, getUsersByArea } from '../../config/db.js';

const router = new Router();

router.get('/users/all', async (_, res) => {
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
        res.json(users);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post('/users/createUser', async (req, res) => {
    const user = req.query.user;

    try {
        const userCr = await createUser(user);
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
