/**
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:            # arbitrary name for the security scheme
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT    # optional, arbitrary value for documentation purposes
 *   schemas:
 *     Blog:
 *       type: object
 *       required:
 *         - title
 *         - content
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the blog
 *         title:
 *           type: string
 *           description: The title of the blog
 *         content:
 *           type: string
 *           description: The content of the blog
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the blog was created
 * 
 * 
 * tags:
 *   name: Blogs
 *   description: The blogs managing API
 * 
 * /blog:
 *   get:
 *     summary: Get all blogs
 *     tags: [Blogs]
 *     responses:
 *       200:
 *         description: The list of blogs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Blog'
 * 
 * /blog/{id}:
 *   get:
 *     summary: Get a blog by ID
 *     tags: [Blogs]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the blog
 *         type: string
 *     responses:
 *       200:
 *         description: The blog
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 * 
 * /blog/create:
 *   post:
 *     summary: Create a new blog
 *     tags: [Blogs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Blog'
 *     responses:
 *       201:
 *         description: The created blog
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 * 
 * /blog/{id}/view:
 *   put:
 *     summary: Add a view to a blog
 *     tags: [Blogs]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the blog
 *         type: string
 *     responses:
 *       200:
 *         description: The updated blog
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 * 
 * /blog/{id}/like:
 *   put:
 *     summary: Like a blog
 *     tags: [Blogs]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the blog
 *         type: string
 *     responses:
 *       200:
 *         description: The updated blog
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 * 
 * /blog/{id}/edit:
 *   put:
 *     summary: Edit a blog
 *     tags: [Blogs]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the blog
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Blog'
 *     responses:
 *       200:
 *         description: The updated blog
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 * 
 * /blog/{id}/delete:
 *   delete:
 *     summary: Delete a blog
 *     tags: [Blogs]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the blog
 *         type: string
 *     responses:
 *       200:
 *         description: Confirmation of deletion
 */

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
router.put('/:id/edit', authMiddleware, (req: Request<Record<string, string>, any, any, ParsedQs>, res: Response) => editBlog(req, res));
router.delete('/:id/delete', authMiddleware, (req: Request<Record<string, string>, any, any, ParsedQs>, res: Response) => deleteBlog(req, res));


export default router;