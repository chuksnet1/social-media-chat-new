import PostModel from '../Models/PostModel.js'
import mongoose from 'mongoose';
import UserModel from '../Models/userModel.js'



//Create Post
export const createPost = async (req, res) => {
    //we use the object PostModel
    const newPost = new PostModel(req.body);


    try {
        await newPost.save()
        res.status(200).json(newPost)

    } catch (error) {
        res.status(500).json(error)
    }
}



//get  a post
export const getPost = async (req, res) => {
    const id = req.params.id;


    try {
        const post = await PostModel.findById(id);

        res.status(200).json(post)

    } catch (error) {
        res.status(500).json(error)
    }
}



//Update a post
export const updatePost = async (req, res) => {
    const postId = req.params.id;
    const { UserId } = req.body;     //here we destructure data from the post we want to update


    try {
        const post = await PostModel.findById(postId);

        if (post.UserId === UserId) {

            await post.updateOne({ $set: req.body })
            res.status(200).json("Post updated")

        } else {
            res.status(403).json("Action forbidden")
        }
    } catch (error) {
        res.status(500).json(error)
    }

}



//delete a post
export const deletePost = async (req, res) => {
    const id = req.params.id;
    const { userId } = req.body;


    try {
        const post = await PostModel.findById(id)

        if (post.UserId === userId) {

            await post.deleteOne();
            res.status(200).json("delete successfully")
        } else {
            res.status(403).json("Action forbidden")
        }
    } catch (error) {
        res.status(500).json(error)
    }
}



//like / dislike a post
export const likePost = async (req, res) => {
    const id = req.params.id;
    const { userId } = req.body;

    try {
        const post = await PostModel.findById(id)

        if (!post.likes.includes(userId)) {
            await post.updateOne({ $push: { likes: userId } })
            res.status(200).json("post liked")

        } else {
            //to dislike if they click the like botton again
            await post.updateOne({ $pull: { likes: userId } })
            res.status(200).json("post disliked")
        }
    } catch (error) {
        res.status(500).json(error)
    }
}



//get timeline post
export const getTimelinePost = async (req, res) => {
    const userId = req.params.id

    try {
        //to get all post which has the  userId of the current userId
        const currentUserPosts = await PostModel.find({ userId: userId })
        const followingPosts = await UserModel.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(userId)
                }
            },
            // at this step we interact with the PostModel DB from the UserModel DB
            {
                $lookup: {
                    from: "posts",
                    localField: "following",
                    foreignField: "userId",
                    as: "followingPosts"
                }
            },
            {
                $project: {
                    followingPosts: 1,
                    _id: 0
                }
            }
        ])

        res.status(200)
            .json(currentUserPosts.concat(...followingPosts[0].followingPosts)
                .sort((a, b) => {
                    return b.createdAt - a.createdAt;
                }));

    } catch (error) {

    }
}