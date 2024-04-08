import express, { Request, Response } from 'express';
import Blog from '../models/blog';
import { error } from 'console';


export default class blogController {

  async getAllBlogs(req: Request, res: Response){
    try {
      const blogs = await Blog.find();
      res.json(blogs);
    } catch (err) {
      res.status(500).json({err: err, message: 'Failed to get blogs'});
    }
  };
  
  async  getBlogById(req: Request, res: Response)  {
    try {
      const blog = await Blog.findById(req.params.id);
      if (blog == null) {
        return res.status(404).json({ message: 'Cannot find blog' });
      }
      res.json(blog);
    } catch (err) {
      return res.status(500).json({err: err, message: 'Failed to get blog'});
    }
  };
  
  async createBlog(req: Request, res: Response)  {
    const { title, readingDuration, description, image, authorName } = req.body;
  
    try {
      const blog = new Blog({
        title,
        readingDuration,
        description,
        image,
        authorName,
        likes: 0,
        views: 0,
        commentsIds: [],
        createdAt: new Date()
      });
  
      const savedBlog = await blog.save();
  
      res.status(200).json(savedBlog);
    } catch (err) {
      res.status(500).json({err: err, message: 'Error in creating blog'});
    }
  };
  
  async addViewToBlog(req: Request, res: Response) {
    try {
      const blog = await Blog.findById(req.params.id);
      if (blog == null) {
        return res.status(404).json({ message: 'Cannot find blog' });
      }
  
      blog.views += 1;
  
      const updatedBlog = await blog.save();
      res.status(200).json(updatedBlog);
    } catch (err) {
      return res.status(500).json({err: err, message: 'Failed to add a view to the blog'});
    }
  };
  async likeBlog(req: Request, res: Response)  {
    try {
      const blog = await Blog.findById(req.params.id);
      if (blog == null) {
        return res.status(404).json({ message: 'Cannot find blog' });
      }
  
      blog.likes += 1;
  
      const updatedBlog = await blog.save();
      res.status(200).json(updatedBlog);
    } catch (err) {
      return res.status(500).json({err: err, message: 'Failed to like the blog'});
    }
  };
  
  async editBlog(req: Request, res: Response)  {
    try {
      const blog = await Blog.findById(req.params.id);
      if (blog == null) {
        return res.status(404).json({ message: 'Cannot find blog' });
      }

  
      if (req.body.title != null) {
        blog.title = req.body.title;
      }
      if (req.body.readingDuration != null) {
        blog.readingDuration = req.body.readingDuration;
      }
      if (req.body.description != null) {
        blog.description = req.body.description;
      }
      if (req.body.image != null) {
        blog.image = req.body.image;
      }
      if (req.body.authorName != null) {
        blog.authorName = req.body.authorName;
      }
  
      const updatedBlog = await blog.save();
      res.status(200).json(updatedBlog);
    } catch (err) {
      return res.status(500).json({err: err, message: 'Failed to edit the blog'});
    }
  };
  
  async deleteBlog (req: Request, res: Response) {
    try {
      const blog = await Blog.findById(req.params.id);
      if (blog == null) {
        return res.status(404).json({ message: 'Cannot find blog' });
      }
      
      await Blog.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: 'Deleted blog' });
    } catch (err) {
      return res.status(500).json({err: err, message: 'Failed to delete the blog'});
    }
  };
  async deleteBlogsExceptFirstFive(req: Request, res: Response) {
    try {
        // Fetch all blogs sorted by creation date in descending order
        const blogs = await Blog.find().sort({ createdAt: -1 });

        // If there are more than five blogs
        if (blogs.length > 5) {
            // Get the IDs of the blogs to delete
            const blogsToDelete = blogs.slice(5).map(blog => blog._id);

            // Delete the blogs
            await Blog.deleteMany({ _id: { $in: blogsToDelete } });

            res.status(200).json({ message: 'Deleted blogs' });
        } else {
            res.status(200).json({ message: 'Less than or equal to five blogs - no blogs deleted' });
        }
    } catch (err) {
        return res.status(500).json({ err: err, message: 'Failed to delete the blogs' });
    }
};
}

// {
//   "title": "4 post",
//   "readingDuration": 15,
//   "description": "This is an example. I'm so excited to share my thoughts with the world!",
//   "image": "https://example.com/my-image.jpg",
//   "authorName": "maxime"
// }

  // export { getAllBlogs, getBlogById, createBlog, addViewToBlog, likeBlog, editBlog, deleteBlog };

