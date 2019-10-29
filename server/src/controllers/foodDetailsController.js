let { StudentFoodModel,
    StudentFoodValidate } = require("../models/studentFood");
    let { StudentModel } = require("../models/students");
    let { FoodDetailsModel , FoodDetailsValidate} = require("../models/foodDetails");
    let joi = require("joi");
    const mongoose = require("mongoose");

exports.savefooddata = async function(req, res, next){
    try{
        let studentDetails = await StudentModel.findById({_id:req.body.userId}).exec();
        let studentFood = {
        breakfast: true,
        lunch: true,
        dinner: true};
        let result = joi.validate(studentFood, StudentFoodValidate);
        if (result.error !== null) {
            throw new Error(`Validation error occured ${result.error}`);
        }
        studentFood.studentusn = studentDetails._id;
        let studentFoodDetails = await new StudentFoodModel(studentFood).save();
        let data = {"date" : "10/10/2019"}
        let foodresult = joi.validate(data, FoodDetailsValidate);
        if (foodresult.error !== null) {
            throw new Error(`Validation error occured ${foodresult.error}`);
        }
        data.details = studentFoodDetails;
        let foodDetials =await new FoodDetailsModel(data).save();
        res.send(foodDetials);
    } catch(err){
        next(err);
    }
}

exports.getfooddata = async function(req, res, next){
    try{
        let foodDetails = await FoodDetailsModel.findOne({date:req.body.date}).exec();
        let studentFoodDetailsId;
        for(let i=0;i<foodDetails.details.length;i++){
            if(foodDetails.details[i] == req.body.userId){
                studentFoodDetailsId = foodDetails.details[i];
            }
        }
        let studentFoodDetails = await StudentFoodModel.findOne({_id:studentFoodDetailsId});
        res.send(studentFoodDetails);
    } catch(err){
        next(err);
    }
}

exports.updatefooddata = async function(req, res, next){
    try{
        let foodDetails = await FoodDetailsModel.findOne({date:req.body.date}).exec();
        let studentFoodDetailsId;
        for(let i=0;i<foodDetails.details.length;i++){
            if(foodDetails.details[i] == req.body.userId){
                studentFoodDetailsId = foodDetails.details[i];
            }
        }
        let data = {
            breakfast:req.body.breakfast,
            lunch: req.body.lunch,
            dinner: req.body.dinner
        };
        let studentFoodDetails = await StudentFoodModel.findOneAndUpdate(
            { _id: studentFoodDetailsId },
            { $set: data },
            { new: true }
          );
          res.send(studentFoodDetails);
    }catch(err){
        next(err);
    }
}

exports.getdataforwarden = async function(req, res, next){
    try{
        let foodDetails = await FoodDetailsModel.findOne({date:req.body.date}).exec();
        res.send(foodDetails);
    } catch(err){
        next(err);
    }
}

exports.getdataformess = async function(req, res, next){
    try{
        let breakfast=0;
        let lunch=0;
        let dinner=0;
        let foodDetails = await FoodDetailsModel.findOne({date:req.body.date}).exec();
        for(let i=0;i<foodDetails.details.length;i++){
            let studentFoodDetails = await StudentFoodModel.findOne({_id:foodDetails.details[i]});
            if(studentFoodDetails.breakfast == true){
                breakfast++
            }
            if(studentFoodDetails.lunch == true){
                lunch++
            }
            if(studentFoodDetails.dinner == true){
                dinner++
            }
        }
        res.send({"breakfast":breakfast,"lunch":lunch,"dinner":dinner})
    }catch(err){
        next(err);
    }
}