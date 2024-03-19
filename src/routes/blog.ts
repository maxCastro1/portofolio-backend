const express = require('express')
import { Request, Response } from 'express';
import { ParsedQs } from 'qs';
const router = express.Router()
import { authMiddleware } from '../middleware/authMiddleware';

import blogController from '../controllers/blog';

const blogControllers = new blogController();

const { getAllBlogs,getBlogById, createBlog, addViewToBlog, likeBlog, editBlog, deleteBlog } = blogControllers
router.get('/', getAllBlogs);
router.get('/:id', getBlogById);
router.post('/create', authMiddleware, (req: Request<Record<string, string>, any, any, ParsedQs>, res: Response) => createBlog(req, res));
router.put('/:id/view', addViewToBlog);
router.put('/:id/like', likeBlog);
router.put('/:id', authMiddleware, (req: Request<Record<string, string>, any, any, ParsedQs>, res: Response) => editBlog(req, res));
router.delete('/:id', authMiddleware, (req: Request<Record<string, string>, any, any, ParsedQs>, res: Response) => deleteBlog(req, res));


export default router;