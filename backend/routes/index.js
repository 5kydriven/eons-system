// routes/index.js
import express from 'express';
import { createUser } from '../controllers/createUser.js';
import { deleteUser } from '../controllers/deleteUser.js';

const router = express.Router();

router.get("/", (req, res) => {
    res.send("server running");
});

router.post("/createUser", createUser);

router.post("/deleteUser", deleteUser);

export default router;