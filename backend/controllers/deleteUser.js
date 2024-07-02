// controllers/userController.js
import admin from 'firebase-admin';

export const deleteUser = async (req, res) => {
    const { uid } = req.body;
    try {
        await admin.auth().deleteUser(uid);

        // Access Firestore
        const db = admin.firestore();

        // Specify the collection and document to be deleted
        const roles = db.collection('accountRoles').doc(uid);
        const employee = db.collection('employee').doc(uid);

        // Delete the document
        await roles.delete();
        await employee.delete();

        res.status(200).send({ uid: uid });
        console.log(uid)
    } catch (error) {
        res.status(400).send(error.message);
        console.log(error)
    }
}