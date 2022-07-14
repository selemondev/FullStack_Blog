const asyncHandler = require('express-async-handler');
const Blog = require("../model/blogModel");
const User = require("../model/userModel");
const getAllBlogs = asyncHandler( async ( req, res ) => {
    const blogs = await Blog.find().sort({"createdAt": -1});
    res.status(200).json(blogs)
});
const getMyBlogs = asyncHandler( async ( req, res ) => {
    const blogs = await Blog.find({ user: req.user.id }).sort({"createdAt": -1});
    res.status(200).json(blogs);
});

const createBlog = asyncHandler( async ( req, res ) => {
    const { title, image, username, description } = req.body;

    if( !title || !image || !username || !description) {
        res.status(400);
        throw new Error(" Please add all the required fields");
    };

    const blog = await Blog.create({
        title,
        image,
        username,
        description,
        user: req.user.id
    });

    if(blog) {
        res.status(201);
        res.json({
            _id: blog.id,
            title: blog.title,
            image: blog.image,
            username: blog.username,
            description: blog.description,
        })
    } else {
        res.status(400);
        throw new Error(" An error occurred");
    }
});


const singleBlog = asyncHandler( async ( req, res ) => {
    const blog = await Blog.findById( req.params.id );
    if( !blog ) {
        res.status(404);
        throw new Error(" Blog not found")
    } else {
        res.status(200).json(blog)
    }
})

const updateBlog = asyncHandler( async( req, res ) => {
    const blog = await Blog.findById(req.params.id);

    if(!blog) {
        res.status(404);
        throw new Error("Blog not found");  
    };

    const user = await User.findById(req.user.id);

    if(!user) {
        res.status(404);
        throw new Error("User not found");
    };

    if(blog.user.toString() !== user.id) {
        res.status(401);
        throw new Error(" User not authorized")
    };

    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedBlog);
});

const deleteBlog = asyncHandler( async( req, res ) => {
    const blog = await Blog.findById(req.params.id);
    if(!blog) {
        res.status(404);
        throw new Error(" Blog not found ");
    }

    const user = await User.findById(req.user.id);

    if(!user) {
        res.status(404);
        throw new Error("User not found")
    };

    if(blog.user.toString() !== user.id) {
        res.status(401);
        throw new Error(" User not authorized");
    };

    await blog.remove();
    res.status(200).json({ id: req.params.id })
});

module.exports = {
    getAllBlogs,
    getMyBlogs,
    createBlog,
    updateBlog,
    deleteBlog,
    singleBlog
}