var mongoose = require("mongoose");
const joi = require("joi");
let schema = mongoose.Schema;

let WardenSchema = new schema({
    username: {
        type: String,
        trim: true,
        required: true,
        unique: true
      },
      password: { type: String, trim: true, required: true },
      name: { type: String, trim: true }
});

module.exports.WardenModel = mongoose.model("WardenModel",WardenSchema);

module.exports.WardenSignUpValidate = joi.object().keys({
    username: joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
    password: joi.string()
    .regex(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
    name: joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
});

module.exports.WardenLoginValidate = joi.object().keys({
    username: joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
    password: joi.string()
    .regex(/^[a-zA-Z0-9]{3,30}$/)
    .required()
});

