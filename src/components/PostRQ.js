import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useCallback, useState } from "react";
import { Link } from "react-router-dom";

//get
const fetchPosts = () => {
  return axios.get("http://localhost:4000/posts");
};

//post
const addPost = (post) => {
  console.log("post data", post);
  return axios.post("http://localhost:4000/posts", post);
};

function PostRQ() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["posts"], //unique query key
    queryFn: () => fetchPosts(),
    //enabled: false,
    // staleTime: 30000,
    // refetchInterval: 5000,
    // refetchIntervalInBackground: true,
  });

  const { mutate } = useMutation({
    mutationFn: (post) => addPost(post),
    // onSuccess: (newData) => {
    //   queryClient.setQueryData(["posts"], (oldQueryData) => {
    //     return {
    //       ...oldQueryData,
    //       data: [...oldQueryData.data, newData.data],
    //     };
    //   });
    // },
    onMutate: async (newPost) => {
      await queryClient.cancelQueries(["posts"]);
      const previousPostData = queryClient.getQueryData(["posts"]);

      queryClient.setQueryData(["posts"], (oldQueryData) => {
        return {
          ...oldQueryData.data,
          data: [
            ...oldQueryData.data,
            { ...newPost, id: String(oldQueryData?.data.length + 1) },
          ],
        };
      });

      return {
        previousPostData,
      };
    },
    onError: (_error, _post, context) => {
      queryClient.setQueriesData(["posts", context.previousPostData]);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const post = { title, body };
      mutate(post);

      setBody("");
      setTitle("");
    },
    [title, body]
  );

  if (isLoading) {
    return <div>Page is loading...</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <div className='post-list'>
      <form className='form-post' onSubmit={handleSubmit}>
        <input
          className='input'
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          placeholder='Enter post title'
        ></input>
        <input
          className='input'
          onChange={(e) => setBody(e.target.value)}
          value={body}
          placeholder='Enter post body'
        ></input>
        <button type='submit' className='form-submit'>
          Post
        </button>
      </form>
      {data?.data.map((post) => (
        <Link to={`/rq-posts/${post.id}`}>
          <div className='post-item' key={post.id}>
            <h3 className='post-title'>{post.title}</h3>
            <p className='post-body'>{post.body}</p>
          </div>
        </Link>
      ))}
      <button onClick={refetch}>Fetch Posts</button>
    </div>
  );
}

export default PostRQ;
