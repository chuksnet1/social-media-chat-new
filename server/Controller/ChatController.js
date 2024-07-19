import ChatModel from '../Models/ChatModel.js'

 

export const createChat = async (req, res) => {
    console.log("possess 1")
    const newChat = new ChatModel({
        members: [req.body.senderId, req.body.receiverId]
    });

    console.log("pass")

    try {
        const result = await newChat.save();
        res.status(200).json(result);

    } catch (error) {
        res.status(500).json(error)
    }
}




export const userChats = async (req, res) => {

    try {
        //find the chat where the members include the id from the parameters of our request
        const chat = await ChatModel.find({
            members: { $in: [req.params.userId] }      //$in means include
        })
        res.status(200).json(chat);

    } catch (error) {
        res.status(500).json(error)
    }
}




export const findChat = async (req, res) => {
    try {
        const chat = await ChatModel.findOne({
            members: { $all: [req.params.firstId, req.params.secondId] }
        })
        res.status(200).json(chat);
    } catch (error) {
        res.status(500).json(error)
    }
}