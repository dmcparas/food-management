let { WardenLoginValidate,
    WardenSignUpValidate,
    WardenModel} = require("../models/warden");

let joi = require('joi');
const bcrypt = require("bcrypt");
const saltRounds = 10;
const fs = require("fs");
const jwt = require("jsonwebtoken");

var privateKEY = fs.readFileSync("./private.key", "utf8");

exports.wardensignup = async function (req, res, next) {
    try {
        let data = req.body;
        let wardenUsernameCheck = await WardenModel.findOne({
            username: data.username
        });
        if (wardenUsernameCheck !== null) {
            throw { message: "username already exits", statusCode: "400" };
        }
        let result = joi.validate(data, WardenSignUpValidate);
        if (result.error !== null) {
            throw new Error(`Validation error occured ${result.error}`);
        }
        const myPlaintextPassword = data.password;

        const hashCode = await bcrypt.hash(myPlaintextPassword, saltRounds)
        //store hash password in your DB.
        let userDetails = await new WardenModel({
            username: data.username,
            password: hashCode,
            name: data.name
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

exports.wardenlogin = async function (req, res, next) {
    try {
        let receivedData = req.body;
        let result = joi.validate(receivedData, WardenLoginValidate);
        if (result.error !== null) {
            throw new Error(`Validation error occured ${result.error}`);
        }
        let storedData = await WardenModel.findOne({
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