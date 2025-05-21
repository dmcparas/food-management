var mongoose = require("mongoose");
const joi = require("joi");
let schema = mongoose.Schema;

let MessInchargeSchema = new schema({
    username: {
        type: String,
        trim: true,
        required: true,
        unique: true
      },
      password: { type: String, trim: true, required: true }
});

module.exports.MessInchargeModel = mongoose.model("MessInchargeModel",MessInchargeSchema);

module.exports.MessInchargeSignUpValidate = joi.object().keys({
    username: joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
    password: joi.string()
    .regex(/^[a-zA-Z0-9]{8,30}$/)
    .required()
});

module.exports.MessInchargeLoginValidate = joi.object().keys({
    username: joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
    password: joi.string()
    .regex(/^[a-zA-Z0-9]{8,30}$/)
    .required()
});