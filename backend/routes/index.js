import express from 'express';
import { createUser } from '../controllers/createUser.js';
import { deleteUser } from '../controllers/deleteUser.js';

const router = express.Router();

router.get("/", (req, res) => {
    res.send("server running");
});

router.post("/createUser", createUser);

// Add this route to handle preflight requests
router.options('/deleteUser', (req, res) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Access-Control-Allow-Methods', 'POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.sendStatus(200);
});

router.post("/deleteUser", deleteUser);

export default router;
