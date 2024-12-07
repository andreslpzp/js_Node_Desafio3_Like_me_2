const Post = require('../models/posts');

// Add a new post
const AgregarPostDB = async (req, res) => {
    const { titulo, url, descripcion } = req.body;

    // Validate input data
    if (!titulo || !url || !descripcion) {
        return res.status(400).json({
            success: false,
            error: 'All fields (titulo, url, descripcion) are required.',
        });
    }

    try {
        const respuesta = await Post.AgregarPost(titulo, url, descripcion);
        res.status(201).json({
            success: true,
            message: "Post added successfully!",
            data: respuesta,
        });
    } catch (err) {
        console.error('Error adding post:', err);
        res.status(500).json({
            success: false,
            error: 'An error occurred while adding the post.',
            details: err.message,
        });
    }
};

// List all posts
const ListarPostDB = async (req, res) => {
    try {
        const posts = await Post.ListarPost();
        res.status(200).json({
            success: true,
            message: "Posts retrieved successfully!",
            data: posts,
        });
    } catch (err) {
        console.error('Error retrieving posts:', err);
        res.status(500).json({
            success: false,
            error: 'An error occurred while retrieving posts.',
            details: err.message,
        });
    }
};

// Like a post
const likePost = async (req, res) => {
    const { id } = req.params;

    // Validate ID
    if (!id) {
        return res.status(400).json({
            success: false,
            error: 'Post ID is required.',
        });
    }

    try {
        const respuesta = await Post.likePost(id);
        if (!respuesta) {
            return res.status(404).json({
                success: false,
                error: 'Post not found.',
            });
        }
        res.status(200).json({
            success: true,
            message: "Post liked successfully!",
            data: respuesta,
        });
    } catch (err) {
        console.error('Error liking post:', err);
        res.status(500).json({
            success: false,
            error: 'An error occurred while liking the post.',
            details: err.message,
        });
    }
};

// Delete a post
const eliminarPost = async (req, res) => {
    const { id } = req.params;

    // Validate ID
    if (!id) {
        return res.status(400).json({
            success: false,
            error: 'Post ID is required.',
        });
    }

    try {
        const respuesta = await Post.eliminarPost(id);
        if (!respuesta) {
            return res.status(404).json({
                success: false,
                error: 'Post not found.',
            });
        }
        res.status(200).json({
            success: true,
            message: "Post deleted successfully!",
            data: respuesta,
        });
    } catch (err) {
        console.error('Error deleting post:', err);
        res.status(500).json({
            success: false,
            error: 'An error occurred while deleting the post.',
            details: err.message,
        });
    }
};

module.exports = {
    AgregarPostDB,
    ListarPostDB,
    likePost,
    eliminarPost,
};
