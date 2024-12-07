const { DB } = require('../config/db');

// Add a new post
const AgregarPost = async (tit, img, des) => {
    if (!tit || !img || !des) {
        throw new Error('Title, image, and description are required');
    }
    try {
        const SqlQuery = "INSERT INTO posts VALUES(DEFAULT, $1, $2, $3) RETURNING *";
        const values = [tit, img, des];
        const { rowCount, rows } = await DB.query(SqlQuery, values);
        return { success: true, data: rows[0] };
    } catch (error) {
        console.error('Error adding post:', error);
        throw new Error('Could not add post');
    }
};

// List all posts
const ListarPost = async () => {
    try {
        const SqlQuery = "SELECT * FROM posts ORDER BY id DESC";
        const { rows } = await DB.query(SqlQuery);
        return { success: true, data: rows };
    } catch (error) {
        console.error('Error listing posts:', error);
        throw new Error('Could not fetch posts');
    }
};

// Like a post
const likePost = async (id) => {
    if (!id) {
        throw new Error('Post ID is required');
    }
    try {
        const SqlQuery = 'UPDATE posts SET likes = COALESCE(likes, 0) + 1 WHERE id = $1 RETURNING *';
        const values = [id];
        const { rows } = await DB.query(SqlQuery, values);
        if (rows.length === 0) throw new Error('Post not found');
        return { success: true, data: rows[0] };
    } catch (error) {
        console.error('Error liking post:', error);
        throw new Error('Could not like post');
    }
};

// Delete a post
const eliminarPost = async (id) => {
    if (!id) {
        throw new Error('Post ID is required');
    }
    try {
        const SqlQuery = 'DELETE FROM posts WHERE id = $1 RETURNING *';
        const values = [id];
        const { rows } = await DB.query(SqlQuery, values);
        if (rows.length === 0) throw new Error('Post not found');
        return { success: true, message: 'Post deleted successfully', data: rows[0] };
    } catch (error) {
        console.error('Error deleting post:', error);
        throw new Error('Could not delete post');
    }
};

module.exports = {
    AgregarPost,
    ListarPost,
    likePost,
    eliminarPost,
};
