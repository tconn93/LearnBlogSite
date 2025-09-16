const express = require('express');
const cors = require('cors');
const {sequelize, connectToDatabase} = require('./src/db');
const { Blog } = require('./src/models/Blog');
// Imports above


const corsOptions = {
  origin: '*', // Replace with your frontend's domain
  optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
};


const app = express();
const port = 3001; // A common port for backend APIs
// Enable CORS for all routes so our frontend can make requests to this server
app.use(cors());
app.use(express.json());

async function initializeApp(){
  await connectToDatabase();
  // this will create the DB Tables
  // if false, it will create tables if the table doesn't exisit
  // if true, it will wipe all tables and then create all new tables
  await sequelize.sync({force: false})
app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
}

// A simple API endpoint to get published blogs for the viewers
app.get('/api/blogs', async (req, res) => {
  const blogs = await Blog.findAll();
  let x = [];
  for (blog of blogs){
    if(blog.status === 'published'){
    let dto = {
      title: blog.title,
      slug: blog.slug      
    }
    x.push(dto);
    }
  }
  res.json(x);
});

app.post('/api/admin/blogs', async (req, res) => {
  let tempBlog = req.body;
  console.log("Recived Post Request");
  console.log(tempBlog)
  console.log(tempBlog.title)
try{
  let blog = {
    title: tempBlog.title,
    description: tempBlog.description,
    slug: tempBlog.slug,
    content: tempBlog.content,
    videoUrl: tempBlog.videoUrl,
    author: tempBlog.author,
    status: tempBlog.status,
    views: 0,
    createdAt: new Date().toLocaleDateString,
    lastUpdated: new Date().toLocaleDateString
  }

  const newBlog = await Blog.create(blog);
  res.status(201).json(newBlog);
} catch (error) {
  res.status(400).json({ error: error.message });
}
});


app.get('/api/admin/blogs', async (req, res) => {
  const blogs = await Blog.findAll();
  res.json(blogs);
});


app.put('/api/admin/blogs/:id', async (req, res) => {

  console.log("Recived Put Request")
  const blogId = req.params.id;
  const blogPromise = await Blog.findByPk(blogId);
  let blog = await blogPromise.get();
  blog.title = req.body.title;
  blog.description = req.body.description;
  blog.slug = req.body.slug;
  blog.content = req.body.content;
  blog.videoUrl = req.body.videoUrl;
  blog.author = req.body.author;
  blog.status = req.body.status;
  blog.lastUpdated = new Date().toLocaleDateString;

  const updatedBlog = await Blog.update(blog, {
    where: { id: blogId },
  });  
res.json(updatedBlog);
})


app.delete('/api/admin/blogs/:id', async (req, res) => {
  const blogId = req.params.id;
  await Blog.destroy({
    where: { id: blogId },
  });
  res.sendStatus(204);
});


initializeApp();
