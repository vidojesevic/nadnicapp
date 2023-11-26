import { Router } from 'express';
import { getUsers } from '../../config/db.js';

const router = new Router();

router.get('/users/all', async (_, res) => {
    try {
        const users = await getUsers();
        // console.log("Users: " + users)
        res.setHeader('Content-Type', 'application/json');
        res.json(users);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;
