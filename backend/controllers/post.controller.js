const Post = require('../models/post.model');

/**
 * Retrieves all posts from the database and renders a list view.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
async function getAllPosts(req, res) {
  try {
    const posts = await Post.fetchAllPosts();
    res.render('posts-list', { posts });
  } catch (error) {
    console.error(error);
    res.status(500).render('500', { error: 'Internal Server Error' });
  }
}

/**
 * Retrieves a single post by ID and renders a detailed view.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
async function getSinglePost(req, res) {
  try {
    const postId = req.params.id;
    if (!postId) {
      return res.status(400).render('404', { error: 'Post ID not informed' });
    }

    const post = new Post(null, null, null, null, postId);
    const result = await post.fetchSinglePost();

    if (!result || result.length === 0) {
      return res.status(404).render('404');
    }

    const postData = {
      title: result[0].title,
      author_name: result[0].author_name,
      summary: result[0].summary,
      body: result[0].body,
      date: result[0].date.toISOString(),
      humanReadableDate: result[0].date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    };

    res.render('post-detail', { post: postData });
  } catch (error) {
    console.error(error);
    res.status(500).render('500', { error: 'Internal Server Error' });
  }
}

/**
 * Renders a form for creating a new post.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
async function renderNewPostForm(req, res) {
  try {
    const authors = await Post.fetchAllAuthors();
    res.render('create-post', { authors: authors });
  } catch (error) {
    console.error(error);
    res.status(500).render('500', { error: 'Internal Server Error' });
  }
}

/**
 * Creates a new post based on form data.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
async function createNewPost(req, res) {
  const data = {
    title: req.body.title,
    summary: req.body.summary,
    body: req.body.content,
    author: req.body.author,
  };

  const post = new Post(data.title, data.summary, data.body, data.author);
  try {
    await post.save();
    res.redirect('/posts');
  } catch (error) {
    console.error(error);
    res.status(500).render('500', { error: 'Internal Server Error' });
  }
}

/**
 * Renders a form for updating an existing post.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
async function renderUpdatePostForm(req, res) {
  try {
    const postId = req.params.id;

    if (!postId) {
      return res.status(404).render('404', { error: 'Post ID not informed' });
    }

    const post = new Post(null, null, null, null, postId);
    const result = await post.fetchSinglePost();

    if (!result || result.length === 0) {
      return res.status(404).render('404');
    }

    const postData = result[0];

    res.render('update-post', { post: postData });
  } catch (error) {
    console.error(error);
    res.status(500).render('500', { error: 'Internal Server Error' });
  }
}

/**
 * Updates an existing post based on form data.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
async function updatePost(req, res) {
  try {
    const postId = req.params.id;
    const data = {
      id: postId,
      title: req.body.title,
      summary: req.body.summary,
      body: req.body.content,
      author: req.body.author,
    };

    if (!postId) {
      return res.status(400).render('400', { error: 'Post ID not informed' });
    }

    const post = new Post(data.title, data.summary, data.body, data.author, data.id);

    await post.update();
    res.redirect('/posts');
  } catch (error) {
    console.error(error);
    res.status(500).render('500', { error: 'Internal Server Error' });
  }
}

/**
 * Deletes an existing post based on its ID.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
async function deletePost(req, res) {
  try {
    const postId = req.params.id;
    if (!postId) {
      return res.status(400).render('400', { error: 'Post ID not informed' });
    }

    const post = new Post(null, null, null, null, postId);
    await post.delete();

    res.redirect('/posts');
  } catch (error) {
    console.error(error);
    res.status(500).render('500', { error: 'Internal Server Error' });
  }
}


module.exports = {
  getAllPosts: getAllPosts,
  getSinglePost: getSinglePost,
  renderNewPostForm: renderNewPostForm,
  createNewPost: createNewPost,
  renderUpdatePostForm: renderUpdatePostForm,
  updatePost: updatePost,
  deletePost: deletePost,
}