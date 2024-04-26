import { useState,useEffect } from "react";
import PostCard from "../components/PostCard";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("http://localhost:3000/v1/blogs/getAll");
      console.log(res);
      const data = await res.json();
      setPosts(data.data);
    };
    fetchPosts();
  }, []);
  console.log(posts);
  return (
    <div>
       <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto '>
        <h1 className='text-3xl font-bold lg:text-6xl'>Welcome to my Blog</h1>
        <p className='text-gray-500 text-xs sm:text-sm'>
          Here you'll find a variety of articles and tutorials on topics such as
          web development, software engineering, and programming languages.
        </p>
      </div>   
      <div className=' mx-auto p-3 flex gap-8 my-10'>
         {posts && posts.length > 0 && (
       
           
            <div className='flex flex-wrap gap-4'>
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
          </div>
        )}
        </div>
     
    </div>
  )
}

export default Home