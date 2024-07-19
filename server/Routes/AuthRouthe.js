import express from 'express';
import { loginUser, registerUser } from '../Controller/AuthController.js';


const router = express.Router()


//router.get('/', async(req, res)=> {res.send("Auth Route")})


router.post('/register', registerUser)  //route, controller   //post is use to post something on the server
router.post('/login', loginUser)


export default router;