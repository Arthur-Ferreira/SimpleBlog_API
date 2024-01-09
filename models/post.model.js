const db = require('../data/database');

// Class used to represent a Blog Post
class Post {
  /**
   * Constructor for the Post class.
   * @param {string} title - The title of the post.
   * @param {string} summary - The summary of the post.
   * @param {string} body - The body/content of the post.
   * @param {string} author - The author of the post.
   * @param {number} id - The ID of the post (optional).
   */
  constructor(title, summary, body, author, id) {
    this.title = title;
    this.summary = summary;
    this.body = body;
    this.author = author;

    if (id) {
      this.id = id;
    }
  }

  /**
   * Fetches all posts from the database.
   * @returns {Promise<Array>} - An array containing all posts.
   * @throws {Error} - Throws an error if there is an issue with the database query.
   */
  static async fetchAllPosts() {
    try {
      // SQL query to select all posts with author information.
      const query = `
      SELECT posts.*, authors.name AS author_name FROM posts
      INNER JOIN authors ON posts.author_id = authors.id
      `;

      // Execute the query
      const { rows: posts } = await db.query(query);
      return posts;
    } catch (error) {
      throw new Error(`Error fetching all posts: ${error.message}`);
    }
  }

  /**
  * Fetches a single post based on the post ID.
  * @returns {Promise<Object>} - The post object.
  * @throws {Error} - Throws an error if there is an issue with the database query.
  */
  async fetchSinglePost() {
    try {
      if (!this.id) {
        throw new Error('Undefined Post ID');
      }

      const query = `
        SELECT posts.*, authors.name AS author_name, authors.email AS author_email FROM posts
        INNER JOIN authors ON posts.author_id = authors.id
        WHERE posts.post_id = ?
      `;

      // Execute the query and update instance properties.
      const [post] = await db.query(query, [this.id]);

      if (post.length > 0) {
        this.title = post[0].title;
        this.summary = post[0].summary;
        this.body = post[0].body;
      }

      return post;
    } catch (error) {
      throw new Error(`Error fetching single post: ${error.message}`);
    }
  }

  /**
   * Fetches all authors from the database.
   * @returns {Promise<Array>} - An array containing all authors.
   * @throws {Error} - Throws an error if there is an issue with the database query.
   */
  static async fetchAllAuthors() {
    try {
      const query = `SELECT * FROM authors`;

      // Execute the query.
      const [authors,] = await db.query(query);
      return authors;
    } catch (error) {
      throw new Error(`Error fetching all authors: ${error.message}`);
    }
  }


  /**
   * Saves a new post to the database.
   * @returns {Promise<void>} - A promise indicating the success of the operation.
   * @throws {Error} - Throws an error if there is an issue with the database query.
   */
  async save() {
    try {
      const query = `
      INSERT INTO posts (title, summary, body, author_id) 
      VALUES (?, ?, ?, ?)
      `;

      // Execute the query and update instance property.
      const values = [this.title, this.summary, this.body, this.author];

      const newPost = await db.query(query, values);
      return newPost;

    } catch (error) {
      throw new Error(`Error saving post: ${error.message}`);
    }
  }


  /**
   * Updates an existing post in the database.
   * @returns {Promise<void>} - A promise indicating the success of the operation.
   * @throws {Error} - Throws an error if there is an issue with the database query.
   */
  async update() {
    try {
      if (!this.id) {
        throw new Error('Undefined Post ID');
      }

      const query = `
      UPDATE posts SET title = ?, summary = ?, body = ?
      WHERE post_id = ?
      `;

      // Execute the query and check if the update was successful.
      const [result] = await db.query(query, [this.title, this.summary, this.body, this.id]);


      // Check if the update was a success or if any line was affected.
      if (result.affectedRows === 0) {
        throw new Error('Post not found or not updated');
      }

    } catch (error) {
      throw new Error(`Error updating post: ${error.message}`);
    }
  }


  /**
   * Deletes a post from the database.
   * @returns {Promise<void>} - A promise indicating the success of the operation.
   * @throws {Error} - Throws an error if there is an issue with the database query.
  */
  async delete() {
    try {
      if (!this.id) {
        throw new Error('Undefined Post ID');
      }

      // Execute the query.
      const query = `DELETE FROM posts WHERE post_id = ?`;

      const [result] = await db.query(query, [this.id]);
    } catch (error) {
      throw new Error(`Error deleting post: ${error.message}`);
    }
  }
}

module.exports = Post;

