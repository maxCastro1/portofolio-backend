import { Request, Response } from 'express';
import { Comment } from '../models/comment'; // adjust the import path according to your project structure
import blogs from '../models/blog';

export default class CommentController {


async addComment(req: Request, res: Response) {
  const { blogId, authorName, content } = req.body;

  try {
    const comment = new Comment({
      blogId,
      authorName,
      content,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    const savedComment = await comment.save();

    // Retrieve the blog
    const blog = await blogs.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Add the comment to the blog's comments array
    blog.commentsIds.push(savedComment.id);

    // Save the blog
    await blog.save();

    res.json(savedComment);
  } catch (err) {
    res.status(500).json({ err: err, message: 'Error in adding comment' });
  }
}


// adjust the import path according to your project structure

async deleteComment(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const deletedComment = await Comment.findByIdAndDelete(id);

    if (!deletedComment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Retrieve the blog
    const blog = await blogs.findById(deletedComment.blogId);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Remove the comment ID from the blog's commentsIds array
    const index = blog.commentsIds.indexOf(deletedComment.id);
    if (index > -1) {
      blog.commentsIds.splice(index, 1);
    }

    // Save the blog
    await blog.save();

    res.json({ message: 'Comment deleted successfully' });
  } catch (err) {
    res.status(500).json({ err: err, message: 'Error in deleting comment' });
  }
}


async getCommentsForBlog(req: Request, res: Response) {
    const { id } = req.params;
  
    try {
      const comments = await Comment.find({ blogId: id });
  
      if (!comments.length) {
        return res.status(404).json({ message: 'No comments found for this blog' });
      }
  
      res.json(comments);
    } catch (err) {
      res.status(500).json({ err: err, message: 'Error in getting comments' });
    }
  }
  
}
