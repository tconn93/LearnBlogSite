const express = require('express');
const cors = require('cors');

const app = express();
const port = 3001; // A common port for backend APIs

// Enable CORS for all routes so our frontend can make requests to this server
app.use(cors());

// Sample in-memory data for blog posts
const posts = [
  { id: 1, title: 'Hello World', content: 'This is my first blog post!' },
  { id: 2, title: 'React and Node.js', content: 'Building a full-stack app is fun.' },
  { id: 3, title: 'Vite is Fast', content: 'Vite is a great tool for frontend development.' },
];

// A simple API endpoint to get all posts
app.get('/api/posts', (req, res) => {
  res.json(posts);
});

app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
