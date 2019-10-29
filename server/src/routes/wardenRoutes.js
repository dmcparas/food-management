const express = require('express');
const router = express.Router();
const warden = require("../controllers/wardenController");

//student routes
router.post('/api/foodmanagement/wardensignup',warden.wardensignup);
router.post('/api/foodmanagement/wardenlogin',warden.wardenlogin);

module.exports = router;