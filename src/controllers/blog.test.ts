// const request = require('supertest');
// // import express from 'express';
// import Blog from '../models/blog';
// const express = require('express');
// // import app from '../index';
// // const app = require('../../src/index');
// import { init } from '../index';

// let apps:any;
// const app = express();
// beforeAll(async () => {
//   apps = await init();
// });


// describe('Blog Controller', () => {
//   describe('GET /blogs', () => {
//     it('should return all blogs', async () => {
//       const blogs = [{ title: 'Test Blog 1' }, { title: 'Test Blog 2' }];
//       jest.spyOn(Blog, 'find').mockResolvedValue(blogs);

//       const res = await request(app).get('/blog');

//       expect(res.status).toBe(200);
//       expect(res.body).toEqual(blogs);
//     });
//   });

//   // describe('GET /blogs/:id', () => {
//   //   it('should return a blog by id', async () => {
//   //     const blog = { title: 'Test Blog 1' };
//   //     jest.spyOn(Blog, 'findById').mockResolvedValue(blog);

//   //     const res = await request(app).get('/blogs/1');

//   //     expect(res.status).toBe(200);
//   //     expect(res.body).toEqual(blog);
//   //   });
//   // });
// });
