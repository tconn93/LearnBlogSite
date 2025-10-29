import { useState, useEffect } from 'react';\nimport { Link } from 'react-router-dom';\nimport axios from 'axios';\nimport './HomePage.css';\nimport WebUtil from '../util/WebUtil';

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch data from the backend
    const fetchPosts = async () => {
      try {
        const response = await axios.get(WebUtil.URL+'/api/blogs');
        setPosts(response.data);
      } catch (err) {
        setError('Failed to fetch posts. Make sure the backend server is running.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []); // The empty dependency array ensures this effect runs only once

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (\n    <div>\n      <main>\n        {posts.map((post) => (\n          <article key={post.id} className=\"post-card\">\n            <h2>{post.title}</h2>\n            <p className=\"excerpt\">{post.description}</p>\n            <div className=\"post-meta\">\n              <span>By {post.author}</span>\n              <span>{post.views} views</span>\n              <span>{new Date(post.createdAt).toLocaleDateString()}</span>\n            </div>\n            <Link to={`/blog/${post.slug}`} className=\"read-more\">Read More</Link>\n          </article>\n        ))}\n      </main>\n    </div>\n  );
}

export default HomePage;