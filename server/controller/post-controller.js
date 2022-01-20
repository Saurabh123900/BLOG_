
import Post from '../schema/post-schema.js';


export const createPost = async (request,response) => {
    console.log(request.body);
    try{
        const post = await new Post(request.body);
        post.save();
        response.status(200).json("Blog saved");
    }catch (error) {
        response.status(500).json(error);
    }
}

export const getAllPosts = async (request,response) => {
    let username_ = request.query.username;
    let category_ = request.query.category;
    let posts;
    try{
        if (username_) 
            posts = await Post.find({username: username_})
        else if (category_) 
            posts = await Post.find({categories: category_})
        else
            posts = await Post.find({});

        response.status(200).json(posts);
    }catch (error) {
        response.status(500).json(error);
    }
}


export const getPost = async (request,response) => {
    try{
        let post = await Post.findById(request.params.id);
        response.status(200).json(post);
    }catch (error) {
        response.status(500).json(error);
    }
}

export const updatePost = async (request,response) => {
    console.log(request.body);
    try{
        await Post.findByIdAndUpdate(request.params.id,{$set: request.body});
        response.status(200).json("Blog updated");
    }catch (error) {
        response.status(500).json(error);
    }
}

export const deletePost = async (request,response) => {
    console.log(request.body);
    try{
        await Post.findByIdAndDelete(request.params.id);
        response.status(200).json("Blog Deleted");
    }catch (error) {
        response.status(500).json(error);
    }
}



