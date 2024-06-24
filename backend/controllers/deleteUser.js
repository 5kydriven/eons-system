// controllers/userController.js
import admin from 'firebase-admin';

export const deleteUser = async (req, res) => {
    const { uid } = req.body;
    try {
        await admin.auth().deleteUser(uid);
        res.status(200).send({ message: "Successfully deleted" });
    } catch (error) {
        res.status(400).send(error.message);
    }
}