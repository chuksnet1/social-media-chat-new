import UserModel from "../Models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'



//get all user
export const getAllUser = async (req, res) => {
    try {
        let users = await UserModel.find()

        users = users.map((user) => {
            const { password, ...otherDetails } = user._doc    //to filter out the password
            return otherDetails
        })
        res.status(200).json(users);

    } catch (error) {
        res.status(500).json(error)
    }
}




//get a user
export const getUser = async (req, res) => {
    //param is the parameters of the url. get id from the parametera of the url
    const id = req.params.id;

    try {
        const user = await UserModel.findById(id);

        if (user) {
            //this code will remove the password from the user sent befor sending it to us from server
            const { password, ...otherDetails } = user._doc

            res.status(200).json(otherDetails)
        } else {
            res.status(404).json('no user exist')
        }
    } catch (error) {
        res.status(500).json(error)
    }
}


//update a user
export const updateUser = async (req, res) => {
    const id = req.params.id;
    const { _id, currentUserAdminStatus, password } = req.body;

    if (id === _id) {

        try {
            //if password exist and want to update it
            //it will will convert the new password to hashed password
            if (password) {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(password, salt);
            }

            const user = await UserModel.findByIdAndUpdate(id, req.body, { new: true })    //req.body is the information we want to update in the respond
            const token = jwt.sign(
                { username: user.username, id: user._id },
                process.env.JWT_KEY, { expiresIn: "1h" }
            )
            res.status(200).json({ user, token })
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(403).json("Access Denied! you can only update your own profile")
    }
}



//delete user
export const deleteUser = async (req, res) => {
    const id = req.params.id;

    const { currentUserId, currentUserAdminStatus } = req.body;

    if (currentUserId === id || currentUserAdminStatus) {
        try {
            await UserModel.findByIdAndDelete(id)

            res.status(200).json("user detail deleted successfully")

        } catch (error) {
            res.status(4500).json(error)
        }
    } else {
        res.status(403).json("Access Denied! you can only delete your own profile")

    }

}



//follow user
export const followUser = async (req, res) => {
    //id is the user we wants to follow
    const id = req.params.id;

    //currentUserId is the id of the person that want to follow the id
    const { _id } = req.body;

    if (_id === id) {
        res.status(403).json("Action is forbidden")

    } else {
        try {
            const followUser = await UserModel.findById(id);  //user we want to follow
            const followingUser = await UserModel.findById(_id);

            //we checking iff the person we want to follow have the current user who wants to follow him
            if (!followUser.followers.includes(_id)) {

                await followUser.updateOne({ $push: { followers: _id } })
                await followingUser.updateOne({ $push: { followings: id } })

                res.status(200).json("user followed!")
            } else {
                res.status(403).json("User is Already followed")
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }
}




//Unfollow Users
export const UnFollowUser = async (req, res) => {
    //id is the user we wants to follow
    const id = req.params.id;

    //currentUserId is the id of the person that want to follow the id
    const { _id } = req.body;

    if (_id === id) {
        res.status(403).json("Action is forbidden")

    } else {
        try {
            const followUser = await UserModel.findById(id);  //user we want to follow
            const followingUser = await UserModel.findById(_id);

            //we checking iff the person we want to follow have the current user who wants to follow him
            if (followUser.followers.includes(_id)) {

                await followUser.updateOne({ $pull: { followers: _id } })
                await followingUser.updateOne({ $pull: { followings: id } })

                res.status(200).json("user unfollowed!")
            } else {
                res.status(403).json("User is Already followed")
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }
}


