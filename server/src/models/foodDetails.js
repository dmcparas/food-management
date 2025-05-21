var mongoose = require("mongoose");
const joi = require("joi");
let schema = mongoose.Schema;

let FoodDetailsSchema = new schema({
    date : {
        type: Date,
        trim: true,
        required: true,
        unique: true
      },
      details : [{type: schema.Types.ObjectId, ref: "StudentFoodModel"}]
});

module.exports.FoodDetailsModel = mongoose.model("FoodDetailsModel",FoodDetailsSchema);

module.exports.FoodDetailsValidate = joi.object().keys({
    date: joi.date()
    .required()
});