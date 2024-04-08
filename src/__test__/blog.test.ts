import supertest from "supertest"
import request from 'supertest';
import app from "../index"

let server:any;
let token:string;
let lastBlogId:string;
let validBlogId:string;
let updatBlogs:string;
beforeAll(async () => {
  try {
    server = app.listen(3002);

    // Replace these with your actual user credentials
    const body = {
      "email": "admin@gmail.com",
      "password": "1234"
    };

    // Send a POST request to the /signin endpoint
    const res = await request(app)
      .post('/user/signin')
      .send(body);



    // If the sign-in was successful, res.body should contain your token
    if (res.body && res.body.token) {
      token = res.body.token;
    } else {
      throw new Error('Sign-in failed');
    }

    const blogRes = await request(app)
    .get('/blog')
    validBlogId = blogRes.body[0]._id;
    updatBlogs = blogRes.body[2]._id;
    if (blogRes.body && blogRes.body.length > 0) {
      lastBlogId = blogRes.body[blogRes.body.length - 1]._id;
    } else {
      throw new Error('No blog posts found');
    }

  } catch (error:any) {
    console.error(`Error in beforeAll: ${error.message}`);
  }
}, 30000);


afterAll(done => {
  server.close(done);
});

describe('GET /blog', () => {
    it('should fetch all blogs', async () => {
      const res = await request(app).get('/blog');
        // testing for response status code and response body type
      expect(res.statusCode).toEqual(200);
    //   testing if the response is an array 
      expect(Array.isArray(res.body)).toBe(true);
      
    
    });
  });

  describe('GET /blog/:id', () => {
    it('should fetch a blog by id', async () => {
      const blogId = validBlogId; 
      const res = await request(app).get(`/blog/${blogId}`);
  
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('_id', blogId);
    });
    
    it('should return 404 if blog not found', async () => {
      const nonExistentBlogId = '65f02b2db3bf75be3f8c1rr';
      const res = await request(app).get(`/blog/${nonExistentBlogId}`);
  
      expect(res.statusCode).toEqual(500);
    });
  });

  describe('POST /blog/create', () => {
    it('should create a new blog with valid token', async () => {
      const newBlog = {
        "title": "test",
        "readingDuration": 15,
        "description": "This is an example. I'm so excited to share my thoughts with the world!",
        "image": "https://example.com/my-image.jpg",
        "authorName": "maxime"
      }
      const res = await request(app).post('/blog/create').set('Authorization', `${token}`).send(newBlog);
  
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('_id');
     
    });
  
    it('should return 401 if token is invalid', async () => {
      const newBlog = {
        title: 'Test Blog 2',
        readingDuration: 5,
        description: 'This is a test blog.',
        image: 'https://example.com/test-image.jpg',
        authorName: 'Test Author 2'
      };
  
      const invalidToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVmNDQzYjQwMzc3Nzc5Mzk5ZDE0MmVlIn0sImlhdCI6MTcxMTEwNzI5NiwiZXhwIjoxNzExMTE3Mjk2fQ.paWKekJ3fFTGB0xsZWo6d88RK96Of_9VvdhqNlUy0yU'; 
  
      const res = await request(app).post('/blog/create').set('Authorization', `Bearer ${invalidToken}`).send(newBlog);
  
      expect(res.statusCode).toEqual(401);
    });
  });

  
  describe('Test the addViewToBlog path', () => {
    test('It should respond with the updated blog for valid ID', async () => {
      const blogId = validBlogId; // replace with a valid blog ID
      const response = await request(app).put(`/blog/${blogId}/view`);
  
      expect(response.statusCode).toBe(200);
      expect(response.body.views).toBeDefined();
    });
  
    test('It should respond with 404 for non-existent blog', async () => {
      const blogId = '65f1de87ca1c020f59b7f';
      const response = await request(app).put(`/blog/${blogId}/view`);
  
      expect(response.statusCode).toBe(500);
    });
  
  
  });
  
  describe('Test the likeBlog path', () => {
    test('It should respond with the updated blog for valid ID', async () => {
      const blogId = validBlogId; // replace with a valid blog ID
      const response = await request(app).put(`/blog/${blogId}/like`);
  
      expect(response.statusCode).toBe(200);
      expect(response.body.likes).toBeDefined();
    });
  
    test('It should respond with 404 for non-existent blog', async () => {
      const blogId = '65f1de87ca1c020f59b7f';
      const response = await request(app).put(`/blog/${blogId}/like`);
  
      expect(response.statusCode).toBe(500);
    });
  
   
  });
  describe('Test the editBlog path', () => {
    test('It should respond with the updated blog for valid ID', async () => {
 
      const blogId = updatBlogs; 
      const newBlogData = {
        "title" : "New Title",
        "readingDuration": "10",
        "description": "New Description",
        "image": "https://plus.unsplash.com/premium_photo-1687807265053-1d899ddb7580?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmFja2dyb3VuJTIwaW1hZ2V8ZW58MHx8MHx8fDA%3D",
        "authorName": "New Author Name"
      };
      // const Token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVmNDQzYjQwMzc3Nzc5Mzk5ZDE0MmVlIn0sImlhdCI6MTcxMTM1ODA4NSwiZXhwIjoxNzExMzY4MDg1fQ.j-sQtGd2vO9uR_3qmF4PfV3I4MZKXOjRdMFi7aRgmhg'; 
      const response = await request(app).put(`/blog/${blogId}/edit`).set('Authorization', `${token}`).send(newBlogData);
      expect(response.statusCode).toBe(200);
  
    });
  
    test('It should respond with 404 for non-existent blog', async () => {
      const blogId = '65fc431fa75e92a75e30';
      const newBlogData = {
        title: 'New Title',
        readingDuration: '10 min',
        description: 'New Description',
        image: 'New Image URL',
        authorName: 'New Author Name'
      };
      // const Token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVmNDQzYjQwMzc3Nzc5Mzk5ZDE0MmVlIn0sImlhdCI6MTcxMTM1ODA4NSwiZXhwIjoxNzExMzY4MDg1fQ.j-sQtGd2vO9uR_3qmF4PfV3I4MZKXOjRdMFi7aRgmhg'; 
      const response = await request(app).put(`/blog/${blogId}/edit`).set('Authorization', `${token}`).send(newBlogData);
      expect(response.statusCode).toBe(500);
    });
    test('It should respond with 401 if not token is provided', async () => {
      const blogId = '65fc431fa75e92a75e30';
      const response = await request(app).put(`/blog/${blogId}/edit`);
      expect(response.statusCode).toBe(401);
    });
  });

  describe('Test the deleteBlog path', () => {
    test('It should respond with the deleted blog message for valid ID', async () => {
      const blogId = lastBlogId; // replace with a valid blog ID
      
      const response = await request(app).delete(`/blog/${blogId}/delete`).set('Authorization', `${token}`);
  
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe('Deleted blog');
    });
  
    test('It should respond with 404 for non-existent blog', async () => {
      const blogId = '65fc4b02a49f48f5b20e484';
      
      const response = await request(app).delete(`/blog/${blogId}/delete`).set('Authorization', `${token}`);
  
      expect(response.statusCode).toBe(500);
    });
  

  });
describe('POST /user/signup', () => {
   
    
      it('should return 400 if email or password is missing', async () => {
        const newUser = {
            "email":"test105@gmail.com",
            "password":""
        };
    
        const res = await request(app).post('/user/signup').send(newUser);
    
        expect(res.statusCode).toEqual(400);
      });

    });
    describe('POST /user/signin', () => {
      it('should sign in a user with valid email and password', async () => {
        const userCredentials = {
            "email":"admin@gmail.com",
            "password":"1234"
        };
    
        const res = await request(app).post('/user/signin').send(userCredentials);
    
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
        expect(res.body).toHaveProperty('userToReturn');
        expect(res.body.userToReturn.email).toEqual(userCredentials.email);
      });
    
      it('should return 404 if user not found', async () => {
        const userCredentials = {
            "email":"admin11111@gmail.com",
            "password":"1234"
        };
    
        const res = await request(app).post('/user/signin').send(userCredentials);
    
        expect(res.statusCode).toEqual(404);
      });
    
      it('should return 401 if password is incorrect', async () => {
        const userCredentials = {
            "email":"admin@gmail.com",
            "password":"12342222"
        };
    
        const res = await request(app).post('/user/signin').send(userCredentials);
    
        expect(res.statusCode).toEqual(401);
      });
    });

    describe('POST /comment', () => {
  it('should add a comment to a blog with valid blogId', async () => {
    const newComment = {
      blogId: validBlogId,
      authorName: 'Test Author',
      content: 'This is a test comment.'
    };

    const res = await request(app).post('/comment').send(newComment);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.authorName).toEqual(newComment.authorName);
    expect(res.body.content).toEqual(newComment.content);
  });

  it('should return 404 if blog not found', async () => {
    const newComment = {
      blogId: '65f447e366b5cb4e25b95803', 
      authorName: 'Test Author',
      content: 'This is a test comment.'
    };

    const res = await request(app).post('/comment').send(newComment);

    expect(res.statusCode).toEqual(404);
  });
});
describe('POST /comment', () => {
    it('should add a comment to a blog with valid blogId', async () => {
      const newComment = {
        blogId: validBlogId, 
        authorName: 'Test Author',
        content: 'This is a test comment.'
      };
  
      const res = await request(app).post('/comment').send(newComment);
  
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('_id');
      expect(res.body.authorName).toEqual(newComment.authorName);
      expect(res.body.content).toEqual(newComment.content);
    });
  
    it('should return 404 if blog not found', async () => {
      const newComment = {
        blogId: '65f1de87ca1c020f59b7f', 
        authorName: 'Test Author',
        content: 'This is a test comment.'
      };
  
      const res = await request(app).post('/comment').send(newComment);
  
      expect(res.statusCode).toEqual(500);
    });
  });
  describe('DELETE /comment/:id', () => {
    it('should delete a comment with valid id', async () => {
      const commentId = '65fd77c2d05e7156d6bc8308'; 
  
      const res = await request(app).delete(`/comment/${commentId}`);
  
      expect(res.statusCode).toEqual(401);
    
    });
  
    it('should return 404 if comment not found', async () => {
      const nonExistentCommentId = '65f447e366b5cb4e25b95809'; 
  
      const res = await request(app).delete(`/comment/${nonExistentCommentId}`);
  
      expect(res.statusCode).toEqual(401);
    });
  });
  describe('GET /comment/:id', () => {
    it('should fetch comments for a blog with valid id', async () => {
      const blogId = validBlogId; 
  
      const res = await request(app).get(`/comment/${blogId}`);
  
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  
    it('should return 404 if no comments found for a blog', async () => {
      const blogId = '65f1de87ca1c020f59b7f00f'; 
  
      const res = await request(app).get(`/blog/${blogId}/comments`);
  
      expect(res.statusCode).toEqual(404);
    });
  });
  describe('POST /user/', () => {
    it('should respond with 400 status if name, email or message is not provided', async () => {
      const res = await request(app)
        .post('/user/')
        .send({
          name: '',
          email: '',
          message: ''
        });
  
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message', 'Please provide name, email and message');
    });



  
  });