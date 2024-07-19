import mongoose from "mongoose";
import MessageModel from "../Models/MessageModel.js";



export const addMessage= async(req, res)=>{
    const {ChatId, senderId, text} = req.body    //info we wan to save that is inputed
    const message = new MessageModel({
        ChatId,          //the id fronm the chat
        senderId,        //the user id of the person logged in, 
        text
    });

    try {
        const result = await message.save()
        res.status(200).json(result)

    } catch (error) {
        res.status(500).json(error)

    }
}




export const getMessages =async(req, res)=>{

    const {ChatId} = req.params;

    try {
        //we getting array of of message which has same chatId
        const result = await MessageModel.find({ChatId})
        res.status(200).json(result)

    } catch (error) {
        res.status(500).json(error)
    }
}