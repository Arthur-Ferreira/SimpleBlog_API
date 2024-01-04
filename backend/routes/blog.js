const express = require('express');
const router = express.Router();

const postController = require('../controllers/post.controller');


router.get('/', (req, res) => {
  res.redirect('/posts');
});

router.get('/posts', postController.getAllPosts);

router.post('/posts', postController.createNewPost);

router.get('/new-post', postController.renderNewPostForm);

router.get('/posts/:id', postController.getSinglePost);

router.get('/posts/:id/edit', postController.renderUpdatePostForm);

router.post('/posts/:id/edit', postController.updatePost);

router.post('/posts/:id/delete', postController.deletePost);


module.exports = router