import { useState, useEffect, useCallback } from "react";
import axios from "axios";

function PostTraditional() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchPosts = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:4000/posts");
      setPosts(response.data);
    } catch (err) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, []);

  if (isLoading) {
    return <div>Page is loading...</div>;
  }

  if (isError) {
    return <div>Error has occured</div>;
  }

  return (
    <div className='post-list'>
      {posts.map((post) => (
        <div className='post-item' key={post.id}>
          <h3 className='post-title'>{post.title}</h3>
          <p className='post-body'>{post.body}</p>
        </div>
      ))}
    </div>
  );
}

export default PostTraditional;
