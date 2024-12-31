const express = require("express");
const { registerUser, login, getAllUsers, updateUser, deleteUser, getAllInstructors, getStudentCount, getInstructorCount, changePassword, updateUserEmailAndUsername, getUser } = require("../controllers/userController");
const { auth } = require("../middleware/auth");

const router = express.Router();

router.post("/register" , registerUser);
router.post("/login" , login);

router.get("/getUsers", getAllUsers);

router.put("/updateUser/:userId", updateUser);

router.delete("/deleteUser/:userId", deleteUser);

router.get("/instructor",getAllInstructors);

router.get('/students/count', getStudentCount);
router.get('/instructors/count', getInstructorCount);
router.get("/users/me",auth , getUser)
router.put('/users/change-password',auth,changePassword);
router.put("/users/update-profile",auth,updateUserEmailAndUsername)

module.exports = router;