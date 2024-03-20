/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       required:
 *         - blogId
 *         - userId
 *         - text
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the comment
 *         blogId:
 *           type: string
 *           description: The id of the blog the comment is associated with
 *         userId:
 *           type: string
 *           description: The id of the user who made the comment
 *         text:
 *           type: string
 *           description: The text of the comment
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the comment was added
 * 
 * tags:
 *   name: Comments
 *   description: The comments managing API
 * 
 * /comments/{id}:
 *   get:
 *     summary: Get all comments for a blog
 *     tags: [Comments]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the blog
 *         type: string
 *     responses:
 *       200:
 *         description: The list of comments for the blog
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 *   delete:
 *     summary: Delete a comment
 *     tags: [Comments]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the comment
 *         type: string
 *     responses:
 *       200:
 *         description: Confirmation of deletion
 * 
 * /comments:
 *   post:
 *     summary: Add a comment to a blog
 *     tags: [Comments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       201:
 *         description: The created comment
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 */

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