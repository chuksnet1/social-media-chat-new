import UserModel from "../Models/userModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import { response } from "express";

dotenv.config()
const JWT_KEY = process.env.JWT_KEY
//Registering a new user
export const registerUser = async (req, res) => {
    //const {username, password, firstname, lastname} = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt)
    req.body.password = hashedPass

    const newUser = new UserModel(
        req.body
        // {      username,  password: hashedPass,  firstname,   lastname }
    );

    const { username } = req.body;  //we destructure to get out username to use

    try {
        //to check if a user is already registered
        const olduser = await UserModel.findOne({ username })
        if (olduser) {
            return res.status(400).json({ message: "username is already registered" })
        }
        //save the user if dont exist
        const user = await newUser.save()

        const token = jwt.sign({
            username: user.username, id: user._id
        }, JWT_KEY, { expiresIn: '1h' })

        res.status(200).json({ user, token });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


//login user 
export const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await UserModel.findOne({ username: username })

        if (user) {
            const validity = await bcrypt.compare(password, user.password)

            //validity ? res.status(200).json(user) : res.status(400).json('wrong password')
            if (!validity) {
                res.status(400).json("Wrong password")
            } else {
                const token = jwt.sign({
                    username: user.username, id: user._id
                }, JWT_KEY, { expiresIn: '1h' })
                res.status(200).json({user, token})
            }
        } else {
            res.status(404).json("user does not exist")
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}