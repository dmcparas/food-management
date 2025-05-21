const express = require('express');
const router = express.Router();
const studentList = require("../controllers/studentsController");

//student routes
router.post('/api/foodmanagement/studentsignup',studentList.studentsignup);
router.post('/api/foodmanagement/studentlogin',studentList.studentlogin);

module.exports = router;