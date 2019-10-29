var mongoose = require("mongoose");
const joi = require("joi");
let schema = mongoose.Schema;

let StudentSchema = new schema({
    username: {
        type: String,
        trim: true,
        required: true,
        unique: true
      },
      password: { type: String, trim: true, required: true },
      name: { type: String, trim: true },
      usn: { type: String, trim: true },
});

module.exports.StudentModel = mongoose.model("StudentModel",StudentSchema);

module.exports.StudentSignUpValidate = joi.object().keys({
    username: joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
    password: joi.string()
    .regex(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
    name: joi.string()
    .regex(/^[a-zA-Z0-9 ]{3,30}$/)
    .required(),
    usn: joi.string()
    .min(12)
    .max(12)
    .required()
});

module.exports.StudentLoginValidate = joi.object().keys({
    username: joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
    password: joi.string()
    .regex(/^[a-zA-Z0-9]{3,30}$/)
    .required()
})