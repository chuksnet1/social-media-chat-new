import express from 'express';
import { createChat, findChat, userChats } from '../Controller/ChatController.js';

const router = express.Router();

router.post("/", createChat)
router.get("/:userId", userChats)   //some one tries to get all the chat of a specific user
router.get("/find/:firstId/:secondId", findChat)   //findinding a specific chat with a speccific person

export default router;
