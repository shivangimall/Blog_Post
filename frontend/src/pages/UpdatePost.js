import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useEffect, useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';


const UpdatePost = () => {
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const { postId } = useParams();

  const navigate = useNavigate();
  useEffect(() => {
    const fetchPost = async () => {
      try {
      
        const res = await fetch(`http://localhost:3000/v1/blogs/getById/${postId}`,);
        const data = await res.json();
        if (!res.ok) {
          return;
        }
        if (res.ok) {
          console.log(data);
          setFormData(data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchPost();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:3000/v1/blogs/update/${postId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        navigate(`/post/${data.data.id}`);
      }
    } catch (error) {
      setPublishError('Something went wrong');
    }
  };
  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold'>Create a post</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <TextInput
          type='text'
          placeholder='Title'
          required
          value={formData.title}
          onChange={(e) => handleChange('title', e.target.value)}
        />
        <TextInput
          type='text'
          placeholder='Image URL'
          required
          value={formData.image}
          onChange={(e) => handleChange('image', e.target.value)}
        />
        <ReactQuill
          theme='snow'
          placeholder='Write something...'
          className='h-72 mb-12'
          required
          value={formData.content}
          onChange={(value) => handleChange('content', value)}
        />
        <Button type='submit' gradientDuoTone='purpleToPink'>
          Publish
        </Button>
        {publishError && (
          <Alert className='mt-5' color='failure'>
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
}

export default UpdatePost