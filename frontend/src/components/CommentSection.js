import { Alert, Button, Textarea } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const CommentSection = ({postId}) => {
    const { currentUser } = useSelector((state) => state.user);
    const [comment, setComment] = useState('');
    const [commentError, setCommentError] = useState(null);
    const [comments, setComments] = useState([]);
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
      e.preventDefault();
      if (comment.length > 200) {
        return;
      }
      try {
        const token = localStorage.getItem('token'); 
        const res = await fetch(`http://localhost:3000/v1/comments/create/${postId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            content: comment,
          }),
        });
        const data = await res.json();
        console.log(data);
        if (res.ok) {
          setComment('');
          setCommentError(null);
          setComments([data.data, ...comments]);
        }
      } catch (error) {
        setCommentError(error.message);
      }
    };
  
    useEffect(() => {
      const getComments = async () => {
        try {
         
            const res = await fetch(`http://localhost:3000/v1/comments/getAll/${postId}`);
          if (res.ok) {
            const data = await res.json();
            console.log(data);
            setComments(data.data);
          }
        } catch (error) {
          console.log(error.message);
        }
      };
      getComments();
    }, [postId]);
 
    return (
      <div className='max-w-2xl mx-auto w-full p-3'>
        {currentUser ? (
          <div className='flex items-center gap-1 my-5 text-gray-500 text-sm'>
            <p>Signed in as:</p>
            <span className="inline-block h-8 w-8 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold">
              {currentUser ? currentUser.username.slice(0, 1).toUpperCase() : ""}
              </span>
            <Link
              to={'/dashboard?tab=profile'}
              className='text-xs text-cyan-600 hover:underline'
            >
              @{currentUser.username}
            </Link>
          </div>
        ) : (
          <div className='text-sm text-teal-500 my-5 flex gap-1'>
            You must be signed in to comment.
            <Link className='text-blue-500 hover:underline' to={'/sign-in'}>
              Sign In
            </Link>
          </div>
        )}
        {currentUser && (
          <form
            onSubmit={handleSubmit}
            className='border border-teal-500 rounded-md p-3'
          >
            <Textarea
              placeholder='Add a comment...'
              rows='3'
              maxLength='200'
              onChange={(e) => setComment(e.target.value)}
              value={comment}
            />
            <div className='flex justify-between items-center mt-5'>
              <p className='text-gray-500 text-xs'>
                {200 - comment.length} characters remaining
              </p>
              <Button outline gradientDuoTone='purpleToBlue' type='submit'>
                Submit
              </Button>
            </div>
            {commentError && (
              <Alert color='failure' className='mt-5'>
                {commentError}
              </Alert>
            )}
          </form>
        )}
        {comments.length === 0 ? (
          <p className='text-sm my-5'>No comments yet!</p>
        ) : (
          <>
            <div className='text-sm my-5 flex items-center gap-1'>
              <p>Comments</p>
              <div className='border border-gray-400 py-1 px-2 rounded-sm'>
                <p>{comments.length}</p>
              </div>
            </div>
            {console.log(comments)}
            {comments && comments.map((comment) => (
        <div key={comment.id} className="border-b border-gray-200 py-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              {/* Assuming you want to display the author's initial */}
              <span className="inline-block h-8 w-8 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold">
              {comment.author ? comment.author.slice(0, 1).toUpperCase() : ""}
              </span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">{comment.author}</p>
              <p className="text-sm text-gray-500">{comment.content}</p>
              <p className="text-xs text-gray-400">{comment.createdAt}</p>
            </div>
          </div>
        </div>
      ))}
          </>
        )}
     
      </div>
    );
}

export default CommentSection