import express from 'express';
import { addMessage, getMessages } from '../Controller/MessageController.js';


const router = express.Router()

router.post('/', addMessage)
router.get('/:ChatId', getMessages)


export default router;