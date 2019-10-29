const express = require('express');
const router = express.Router();
const foodDetails = require("../controllers/foodDetailsController");

//student routes
router.post('/api/foodmanagement/savefooddetails',foodDetails.savefooddata);
router.post('/api/foodmanagement/getfooddetails',foodDetails.getfooddata);
router.post('/api/foodmanagement/updatefooddetails',foodDetails.updatefooddata);
router.post('/api/foodmanagement/getfooddetailsforwarden',foodDetails.getdataforwarden);
router.post('/api/foodmanagement/getfooddetailsformess',foodDetails.getdataformess);


module.exports = router;