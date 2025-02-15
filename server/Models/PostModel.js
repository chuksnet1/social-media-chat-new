import mongoose from "mongoose";


const PostSchema = mongoose.Schema({
    UserId: { type: String, required: true },
    desc: String,
    likes: [],
    image: String,
},
    {
        timestamps: true
    }
);

const PostModel = mongoose.model("Post", PostSchema)
export default PostModel;