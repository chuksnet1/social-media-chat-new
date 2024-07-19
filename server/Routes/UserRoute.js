import express from 'express'
import { UnFollowUser, deleteUser, followUser, getAllUser, getUser, updateUser } from '../Controller/UserController.js';
//import AuthMiddleWare from '../MiddleWare/AuthMiddleWare.js';


const router = express.Router()

//  router.get('/', async(req,res)=>{
//     res.send("user route")
//  })

router.get('/', getAllUser)
router.get('/:id', getUser)
router.put('/:id',  updateUser)    //put is use for updating
router.delete('/:id', deleteUser)
router.put('/:id/follow',  followUser)
router.put('/:id/unfollow',  UnFollowUser)

export default router; 