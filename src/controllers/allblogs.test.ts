const request = require('supertest');

const Blog = require('../models/blog'); // path to your Blog model
import express from 'express';
const app = express();

jest.mock('../models/blog');

describe('GET /blog', () => {
  it('responds with json containing a list of all blogs', async () => {
    const mockBlogs = [{
      title: 'Blog 1',
      author: 'Author 1',
      content: 'Content 1'
    }, {
      title: 'Blog 2',
      author: 'Author 2',
      content: 'Content 2'
    }];

    Blog.find.mockResolvedValue(mockBlogs);

    const response = await request(app).get('/blog');

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockBlogs);
  });

  it('responds with 500 and error message when an error occurs', async () => {
    const mockError = new Error('Failed to get blogs');

    Blog.find.mockRejectedValue(mockError);

    const response = await request(app).get('/blog');

    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual({
      err: mockError,
      message: 'Failed to get blogs'
    });
  });
});
