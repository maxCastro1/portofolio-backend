# Portfolio API ![Codecov Badge]

This API provides functionalities for managing blog content and user authentication for your portfolio website. It allows you to:

## User Management
- **Register new administrators**
- **Sign in existing administrators**

## Blog Management
- **Create new blog posts**
- **Retrieve a list of all blog posts**
- **Retrieve a specific blog post by ID**
- **Update an existing blog post**
- **Delete a blog post**

## Installation
1. Clone this repository or download the project files.
2. Install dependencies using `npm install`.
3. Configure your database connection details in the appropriate configuration file (details will depend on your chosen database).
4. Run the server using `npm start`.

## API Endpoints
### User Management
#### POST /users/register (Register a new administrator)

#### POST /users/register (Register a new administrator)

**Request Body:**
- `username` (string): Desired username for the new administrator.
- `password` (string): Password for the new administrator.

**Response:**
- On successful registration:
  - Status code: 201 Created
  - JSON object containing the newly created user's ID 
- On failure:
  - Status code: 400 Bad Request (e.g., invalid username or password format)
  - Error message indicating the issue.

#### POST /users/login (Sign in an administrator)

**Request Body:**
- `username` (string): Username of the administrator.
- `password` (string): Password of the administrator.

**Response:**
- On successful login:
  - Status code: 200 OK
  - JSON object containing a valid authentication token.
- On failure:
  - Status code: 401 Unauthorized (e.g., invalid credentials)
  - Error message indicating the issue.

### Blog Management

(Some blog management endpoints require a valid authentication token in the Authorization header)

#### GET /posts (Retrieve all blog posts)

**Response:**
- Status code: 200 OK
- JSON array containing all blog post objects with properties like:
  - `id` (number): Unique identifier for the blog post.
  - `title` (string): Title of the blog post.
  - `content` (string): Content of the blog post (HTML or Markdown format can be chosen based on your implementation).
  - `author` (string): Author of the blog post (can be the administrator's username).
  - `createdAt` (string): Date and time the blog post was created (ISO 8601 format).
  - `updatedAt` (string): Date and time the blog post was last updated (ISO 8601 format, optional).
- Empty array if there are no blog posts.

#### GET /posts/:id (Retrieve a specific blog post by ID)

**Request Parameter:**
- `id` (number): Unique identifier for the blog post.

**Response:**
- Status code: 200 OK
- JSON object containing the requested blog post details (same properties as the GET /posts response).
- Status code: 404 Not Found if the blog post with the given ID doesn't exist.

#### POST /posts (Create a new blog post)

**Request Body:**
- `title` (string): Title of the new blog post.
- `content` (string): Content of the new blog post.

**Response:**
- Status code: 201 Created
- JSON object containing the newly created blog post details (same properties as the GET /posts response).
- Status code: 400 Bad Request (e.g., missing required fields in the request body).

#### PUT /posts/:id (Update an existing blog post)

**Request Parameter:**
- `id` (number): Unique identifier for the blog post to update.

**Request Body:**
- Any properties of the blog post you want to update (e.g., title, content). Only include the fields you want to modify.

**Response:**
- Status code: 200 OK
- JSON object containing the updated blog post details (same properties as the GET /posts response).
