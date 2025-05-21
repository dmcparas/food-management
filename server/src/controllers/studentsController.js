let { StudentModel,
    StudentLoginValidate,
    StudentSignUpValidate
} = require('../models/students');
let joi = require('joi');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const fs = require('fs');
const jwt = require('jsonwebtoken');

var privateKEY = fs.readFileSync("./private.key", "utf8");

exports.studentsignup = async function (req, res, next) {
    try {
        let data = req.body;
        let studentUsernameCheck = await StudentModel.findOne({
            username: data.username
        });
        if (studentUsernameCheck !== null) {
            throw { message: "username already exits", statusCode: "400" };
        }
        let result = joi.validate(data, StudentSignUpValidate);
        if (result.error !== null) {
            throw new Error(`Validation error occured ${result.error}`);
        }
        const myPlaintextPassword = data.password;

        const hashCode = await bcrypt.hash(myPlaintextPassword, saltRounds)
        //store hash password in your DB.
        let userDetails = await new StudentModel({
            username: data.username,
            password: hashCode,
            name: data.name,
            usn: data.usn
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

exports.studentlogin = async function (req, res, next) {
    try {
        let receivedData = req.body;
        let result = joi.validate(receivedData, StudentLoginValidate);
        if (result.error !== null) {
            throw new Error(`Validation error occured ${result.error}`);
        }
        let storedData = await StudentModel.findOne({
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
