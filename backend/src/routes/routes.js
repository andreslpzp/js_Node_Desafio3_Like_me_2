// Import libraries
const { Router } = require('express');

// Import controllers
const { 
    AgregarPostDB, 
    ListarPostDB, 
    likePost, 
    eliminarPost 
} = require('../controllers/postController');

const router = Router();

// Default route
router.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Posts API!' });
});

// Example route
router.get('/home', (req, res) => {
    res.send('Hello World');
});

// Post routes
router.post('/posts', AgregarPostDB); // Add a new post
router.get('/posts', ListarPostDB);   // Get all posts
router.patch('/posts/like/:id', likePost); // Like a post
router.delete('/posts/:id', eliminarPost); // Delete a post

module.exports = router;

