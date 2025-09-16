import { useState, useEffect } from 'react';
import axios from 'axios';
import './HomePage.css';
import WebUtil from '../util/WebUtil';

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch data from the backend
    const fetchPosts = async () => {
      try {
        // Our backend API is running on port 3001
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

  return (
    <div >
      <main>
        {posts.map((post) => (
          <article key={post.id} className="post">
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </article>
        ))}
      </main>
    </div>
  );
}

export default HomePage;