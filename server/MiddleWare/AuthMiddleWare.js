import jwt from "jsonwebtoken";
import dotenv from 'dotenv';


console.log("Authmiddleware")
dotenv.config()
const secret = process.env.JWT_KEY;
const AuthMiddleWare = async(req, res, next) =>{
    console.log("passe first")
    try {        
        const token = req.headers.authorization.split(" ")[1]
        console.log(token, "token here")
        if (token) {
            const decoded = jwt.verify(token, secret);
            console.log(decoded);
            req.body._id = decoded?._id
            console.log("done")
        }
        next()
    } catch (error) {
        console.log(error)
    }
}

export default AuthMiddleWare;


