var mongoose = require("mongoose");
const joi = require("joi");
let schema = mongoose.Schema;

let StudentFoodSchema = new schema({
    studentusn: {type: schema.Types.ObjectId, ref: "StudentModel"},
    breakfast: {type: Boolean},
    lunch: {type: Boolean},
    dinner: {type: Boolean}
});


module.exports.StudentFoodModel = mongoose.model("StudentFoodModel",StudentFoodSchema);

module.exports.StudentFoodValidate = joi.object().keys({
    breakfast: joi.boolean()
    .required(),
    lunch: joi.boolean()
    .required(),
    dinner: joi.boolean()
    .required()
});