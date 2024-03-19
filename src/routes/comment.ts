const express = require('express')
import { Request, Response } from 'express';
import { ParsedQs } from 'qs';
const router = express.Router()
import { authMiddleware } from '../middleware/authMiddleware';

import commentController from '../controllers/comments';

const commentControllers = new commentController();

const { getCommentsForBlog,deleteComment,addComment } = commentControllers
router.get('/:id', getCommentsForBlog);
router.post('/', addComment);
router.delete('/:id', authMiddleware, (req: Request<Record<string, string>, any, any, ParsedQs>, res: Response) => deleteComment(req, res));




export default router;