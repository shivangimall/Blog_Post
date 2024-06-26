import { useState, useEffect } from "react";
import PostCard from "../components/PostCard";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("http://localhost:3000/v1/blogs/getAll");
      const data = await res.json();
      setPosts(data.data);
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto '>
        <h1 className='text-3xl font-bold lg:text-6xl'>Welcome to my Blog</h1>
        <p className='text-gray-500 text-xs sm:text-sm max-w-xl'>
          "Explore a diverse array of topics, ranging from technology and nature to pollution and beyond.
          Our blog features insightful articles and engaging tutorials on a wide range of subjects,
          ensuring there's something for everyone to discover and enjoy."
        </p>
      </div>

      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7'>
        {posts && posts.length > 0 && (
          <div className='flex flex-wrap justify-around gap-4'>
            {posts.map((post) => (
              <PostCard key={post._id} post={post} className='w-1/2' />
              // Use 'w-1/2' to make each PostCard take half of the available space
            ))}
          </div>
        )}
      </div>


    </div>
  )
}

export default Home