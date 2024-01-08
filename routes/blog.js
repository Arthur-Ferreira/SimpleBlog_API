const express = require('express');
const router = express.Router();

const postController = require('../controllers/post.controller');


router.get('/posts', postController.getAllPosts);

router.post('/posts', postController.createNewPost);

router.get('/authors', postController.renderNewPostForm);

router.get('/posts/:id', postController.getSinglePost);

router.get('/posts/:id/edit', postController.renderUpdatePostForm);

router.patch('/posts/:id/edit', postController.updatePost);

router.delete('/posts/:id/delete', postController.deletePost);


module.exports = router