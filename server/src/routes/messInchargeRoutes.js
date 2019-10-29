const express = require('express');
const router = express.Router();
const messIncharge = require("../controllers/messInchargeController");

//student routes
router.post('/api/foodmanagement/messinchargesignup',messIncharge.messinchargesignup);
router.post('/api/foodmanagement/messinchargelogin',messIncharge.messinchargelogin);

module.exports = router;