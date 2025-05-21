const jwt = require('jsonwebtoken')
const fs = require('fs')

exports.auth = async function(req, res, next) {
    const token = req.header('x-auth');
    const publicKEY  = fs.readFileSync('./public.key', 'utf8');
    const verifyOptions = {
        expiresIn: "12h",
        algorithm: "RS256"
    };
    try{
        const verifyToken = jwt.verify(token, publicKEY, verifyOptions);
        if(verifyToken){
            next();            
        }        
    }catch(err) {
        err.statusCode =401 
        err.message = 'Verification Failed'
        next(err);
    }
     
}