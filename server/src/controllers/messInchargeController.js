let { MessInchargeLoginValidate,
 MessInchargeModel,
MessInchargeSignUpValidate} = require("../models/messIncharge");

let joi = require('joi');
const bcrypt = require("bcrypt");
const saltRounds = 10;
const fs = require("fs");
const jwt = require("jsonwebtoken");

var privateKEY = fs.readFileSync("./private.key", "utf8");

exports.messinchargesignup = async function (req, res, next) {
    try {
        let data = req.body;
        let messInchargeUsernameCheck = await MessInchargeModel.findOne({
            username: data.username
        });
        if (messInchargeUsernameCheck !== null) {
            throw { message: "username already exits", statusCode: "400" };
        }
        let result = joi.validate(data, MessInchargeSignUpValidate);
        if (result.error !== null) {
            throw new Error(`Validation error occured ${result.error}`);
        }
        const myPlaintextPassword = data.password;

        const hashCode = await bcrypt.hash(myPlaintextPassword, saltRounds)
        //store hash password in your DB.
        let userDetails = await new MessInchargeModel({
            username: data.username,
            password: hashCode
        }).save();
        const username = data.username
        let payload = {
            username
        };
        let signOptions = {
            expiresIn: "12h",
            algorithm: "RS256"
        };
        const token = jwt.sign(payload, privateKEY, signOptions);
        res.header("x-auth", token);
        const details = {
            userId: userDetails['_id'],
            token: token
        }
        res.send(details).status("200");
    } catch (err) {
        next(err);
    }
}

exports.messinchargelogin = async function (req, res, next) {
    try {
        let receivedData = req.body;
        let result = joi.validate(receivedData, MessInchargeLoginValidate);
        if (result.error !== null) {
            throw new Error(`Validation error occured ${result.error}`);
        }
        let storedData = await MessInchargeModel.findOne({
            username : receivedData.username
        });
        if (storedData.username == receivedData.username) {
            const myPlaintextPassword = storedData.password;
            let result = bcrypt.compareSync(receivedData.password, myPlaintextPassword);
            if (result) {
                const username = receivedData.username;
                let payload = {
                    username
                };
                let signOptions = {
                    expiresIn: "12h",
                    algorithm: "RS256"
                };
                let token = jwt.sign(payload, privateKEY, signOptions);
                res.header("x-auth", token);
                const details = {
                    userId: storedData['_id'],
                    token: token
                }
                res.send(details).status("200");
            }

        }
    } catch (err) {
        next(err);
    }
}