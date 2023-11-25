import { Router } from 'express';
import { getUsers } from '../../config/db.js';

const router = new Router();

router.get('/users', async (_, res) => {
    try {
        const users = await getUsers();
        res.json(users);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;
