const endPoints = [
  {
    method: "POST",
    path: "/api/v1/auth/register",
    description: "Register a new user",
  },
  {
    method: "POST",
    path: "/api/v1/auth/login",
    description: "Log in as a registered user",
  },
  {
    method: "GET",
    path: "/api/v1/posts",
    description: "List all blog posts",
  },
  {
    method: "POST",
    path: "/api/v1/posts",
    description: "Create a new blog post",
  },
  {
    method: "GET",
    path: "/api/v1/posts/{postId}",
    description: "Get single blog post by ID",
  },
  {
    method: "PATCH",
    path: "/api/v1/posts/{postId}",
    description: "Update a blog post by ID",
  },
  {
    method: "DELETE",
    path: "/api/v1/posts/{postId}",
    description: "Delete a blog post by ID",
  },
];

module.exports = endPoints;
