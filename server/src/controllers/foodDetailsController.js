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
        breakfast: req.body.breakfast,
        lunch: req.body.lunch,
        dinner: req.body.dinner};
        let result = joi.validate(studentFood, StudentFoodValidate);
        if (result.error !== null) {
            throw new Error(`Validation error occured ${result.error}`);
        }
        let data = {"date":req.body.date};
        let foodresult = joi.validate(data, FoodDetailsValidate);
        if (foodresult.error !== null) {
            throw new Error(`Validation error occured ${foodresult.error}`);
        }
        studentFood.studentusn = studentDetails._id;
        let studentFoodDetails = await new StudentFoodModel(studentFood).save();
        data.details = studentFoodDetails._id;
        let foodDetails;
        let existingData = await FoodDetailsModel.findOne({date:req.body.date}).exec();
        if(existingData !=null || existingData != undefined){
            var newArr = existingData.details.concat(data.details);
            var newData = {details:newArr};
            var isAlreadyThere = false;
            for(let i=0;i<existingData.details.length;i++){
                if(existingData.details[i].studentusn == req.body.userId){
                    isAlreadyThere = true;
                }
            }
            if(!isAlreadyThere){
                foodDetails = await FoodDetailsModel.findOneAndUpdate(
                    { date:req.body.date },
                    newData,
                    { new: true }
                  );
            }
        }else{
            foodDetails = await new FoodDetailsModel(data).save();
        }
        res.send(foodDetails);
    } catch(err){
        next(err);
    }
}

exports.getfooddata = async function(req, res, next){
    try{
        let foodDetails = await FoodDetailsModel.findOne({date:req.body.date}).populate("details").select("-__v").exec();
        let studentFoodDetails;
        for(let i=0;i<foodDetails.details.length;i++){
            if(foodDetails.details[i].studentusn == req.body.userId){
                studentFoodDetails = foodDetails.details[i];
            }
        }
        if(studentFoodDetails != undefined || studentFoodDetails != null)
        res.send(studentFoodDetails);
    } catch(err){
        next(err);
    }
}

exports.updatefooddata = async function(req, res, next){
    try{
        let foodDetails = await FoodDetailsModel.findOne({date:req.body.date}).populate("details").select("-__v").exec();
        let studentFoodDetails;
        for(let i=0;i<foodDetails.details.length;i++){
            if(foodDetails.details[i].studentusn == req.body.userId){
                studentFoodDetails = foodDetails.details[i];
            }
        }
        let data = {
            breakfast:req.body.breakfast,
            lunch: req.body.lunch,
            dinner: req.body.dinner
        };
        let newStudentFoodDetails = await StudentFoodModel.findOneAndUpdate(
            { _id: studentFoodDetails._id },
            data,
            { new: true }
          );
          res.send(newStudentFoodDetails);
    }catch(err){
        next(err);
    }
}

exports.getdataforwarden = async function(req, res, next){
    try{
        let foodDetails = await FoodDetailsModel.find({date:req.body.date}).populate({path:"details",populate:{path:"studentusn",select: { 'name': 1,'usn':1},model:'StudentModel'}}).select("-__v").exec();
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