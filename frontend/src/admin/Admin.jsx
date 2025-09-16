import React,  { useState, useEffect }  from "react";
import axios from "axios";
import WebUtil from "../util/WebUtil";
import './Admin.css'


const PublishButton = (props) => {
        function handleOnClick(){
        let blog = props.post; 
            blog.status = "published";
        publish(blog);
        } 

        async function publish(x){
            const res = await axios.put(WebUtil.URL+`/api/admin/blogs/${x.id}`, x);
            setTimeout(()=>{
                props.fetchPosts();
            },800);
        }
    return (<button onClick={handleOnClick} >Publish</button>)
}


const UnPublishButton = (props) => {
        function handleOnClick(){
        let blog = props.post; 
            blog.status = "draft";
        publish(blog);
        } 

        async function publish(x){
            const res = await axios.put(WebUtil.URL+`/api/admin/blogs/${x.id}`, x);
            setTimeout(()=>{
                props.fetchPosts();
            },800);
        }
    return (<button onClick={handleOnClick} >UnPublish</button>)
}


// Component for listing all blog posts
const BlogList = ({ posts, onDelete, onEdit, fetchPosts }) => (
  <div>
    <h2>Manage Blogs</h2>
    <ul>
      {posts.map(post => (
        <li key={post.id}>
          {post.title} - {post.description}
          <div >
          <button onClick={() => onEdit(post)}>Edit</button>
          <button onClick={() => onDelete(post.id)}>Delete</button>
          {post.status==='published' ? <UnPublishButton post={post} fetchPosts={()=>fetchPosts()}/> : <PublishButton post={post} fetchPosts={()=>fetchPosts()}/> }
          </div>
          
        </li>
      ))}
    </ul>
  </div>
);

// Component for creating or editing a blog post
const BlogForm = ({ currentPost, setCurrentPost, setBlogForm, fetchPosts }) => {
    const [title, setTitle] = useState(currentPost ? currentPost.title : '');
    const [content, setContent] = useState(currentPost ? currentPost.content : '');
    const [description, setDescription] = useState(currentPost ? currentPost.description : '')
    const [status, setStatus] = useState(currentPost ? currentPost.status : 'draft');
    const [author,setAuthor] = useState(currentPost ? currentPost.author : '');
    const [slug,setSlug] = useState(currentPost ? currentPost.slug : '')
    const [video, setVideo] = useState(currentPost ? currentPost.video : 'NA')
    const [id,setId] = useState(currentPost ? currentPost.id : undefined)

  
    function handleForm(){
        let post = {
            id:id,
            title:title,
            content:content,
            description:description,
            status:status,
            author:author,
            slug:slug,
            videoUrl:video
        }
       let x =  createOrUpdateBlog(post);
       console.log(x)
    } 

    const createOrUpdateBlog= async (post) => {

            if (post.id) {
           let x =  await axios.put(WebUtil.URL+`/api/admin/blogs/${post.id}`, 
            post)
            } else {
           let x =  await axios.post(WebUtil.URL+'/api/admin/blogs', 
            post)

        }
     setTimeout(()=>{
                  setCurrentPost(null); // Clear the form
                  fetchPosts(); // Refresh the list
                  setBlogForm(undefined)
            },800);
    }

  return (
    <div className="form" >
      <h2>{currentPost ? 'Edit Blog' : 'Create New Blog'}</h2>
      <label>
        Title:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>
      <label>
        Description:
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>
      <label>
        Author:
        <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
      </label>
      <label>
        Slug:
        <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} />
      </label>
      <label>
        VideoUrl:
        <input type="text" value={video} onChange={(e) => setVideo(e.target.value)} /> 
      </label>
      <label>
        Content:
        <textarea value={content} onChange={(e) => setContent(e.target.value)} />
      </label>
      <label>
        Status:
        <div className="status-radios">
        <input type="radio" name="status" value="draft" checked={status !== 'published'} onChange={(e) => setStatus(e.target.value)}/>
        Draft
        <input type="radio" name="status" value="published" checked={status === 'published'} onChange={(e) => setStatus(e.target.value)}/>
        Published  
        </div>    
      </label>
      <button onClick={handleForm}>{currentPost ? 'Update Blog' : 'Create Blog'}</button>
      <button onClick={()=>{setBlogForm(undefined); setCurrentPost(null);}}>Cancel</button>
    </div>
  );
};



const FormComponent = ({blogForm, setBlogForm, currentPost, setCurrentPost, fetchPosts}) =>{

if(blogForm === undefined) return(
    <button onClick={()=> setBlogForm('new')}>Create Blog</button>
)

return <BlogForm currentPost={currentPost} setCurrentPost={(x)=>setCurrentPost(x)} setBlogForm={(x)=>setBlogForm(x)} fetchPosts={()=>fetchPosts()} /> 

}





function Admin() {
 const [posts, setPosts] = useState([]);
  const [currentPost, setCurrentPost] = useState(null);
  const [blogForm, setBlogForm] = useState(undefined);

  useEffect(() => {
    fetchPosts();

}, []);

  const fetchPosts = async () => {
    // This is a placeholder for a real API call
    const res = await axios.get(WebUtil.URL+'/api/admin/blogs');
    setPosts(res.data);
  };

  const handleDelete = async (id) => {
    await axios.delete(WebUtil.URL+`/api/admin/blogs/${id}`);
    fetchPosts(); // Refresh the list
  };

  const handleEdit = (post) => {
    setCurrentPost(post);
    setTimeout(()=>{
        setBlogForm('edit');
    }, 800)
  };



  return (
    <div className="admin-container">
        <div className="form-section">
        <FormComponent blogForm={blogForm} setBlogForm={(x)=>setBlogForm(x)} currentPost={currentPost} setCurrentPost={(x)=>setCurrentPost(x)}  fetchPosts={()=>fetchPosts()}/>
      </div>
      <hr />
      <div className="list-section">
      <BlogList posts={posts} onDelete={handleDelete} onEdit={(x)=>handleEdit(x)} fetchPosts={()=>fetchPosts()}/>
        </div>
    </div>
  );
}


export default Admin;