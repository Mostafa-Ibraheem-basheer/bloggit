import { useState } from 'react';
import { Form, useActionData, useLocation } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

const AddComment = () => {
  const id = useLocation().pathname.slice(7);
  const data = useActionData(); // we can access data from the action function using this hook
  const [flag, setFlag] = useState(false);
  const [button, setButton] = useState('');

  const handleClick = () => {
    setButton(<CircularProgress size={15} color="inherit" />);
    setFlag(true);
    setTimeout(() => {
      setFlag(false);
      setButton('');
      console.log(flag);
    }, 500);
  };

  return (
    <div className="add-comment">
      <h3>Add Comment</h3>
      {/* using the Form component allows us to use the action prop in react */}
      <Form
        method="post"
        /* this redirects on on submit =>*/ action={'/blogs/' + id}
      >
        <input type="text" name="author" required placeholder="Name" />
        <textarea name="comment" required placeholder="Comment" rows={1}></textarea>
        <button
          disabled={flag}
          className="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium 
          MuiButton-textSizeMedium MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium 
          MuiButton-textSizeMedium Delete css-1e6y48t-MuiButtonBase-root-MuiButton-root"
        >
          {button}&nbsp;Comment
        </button>
      </Form>
      <button
        id="test"
        style={{ display: 'none' }}
        onClick={handleClick}
      ></button>
    </div>
  );
};

// Similar to submit event but without the need of attaching hooks to inputs and track value
export const commentAction = async ({ request }) => {
  const blogId = await request.url.replace('http://localhost:3000/blogs/', '');
  const data = await request.formData(); // get the data from the form
  /* const {button,setButton} = useButton() */
  const comment = {
    // create an object for the comment
    blogId: blogId,
    author: data.get('author'),
    body: data.get('comment'),
    likes: 0,
    dislikes: 0,
  };

  if (!comment.body) {
    return { message: 'Comment cannot be empty' };
  }

  fetch('http://localhost:8000/comments', {
    // send the comment object to the database
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(comment),
  })
    .then((res) => {
      if (!res.ok) {
        throw Error("Couldn't Add The Comment");
      } else {
        console.log('added');
        document.getElementById('test').click();
        /* window.location.reload(); */ //reload to show the new comment
      }
    })
    .catch((err) => {
      alert(err.message);
      document.getElementById('test').click();
    });
  //update the number of comments for the corresponding blog
  fetch('http://localhost:8000/comments?blogId=' + blogId).then((res) => {
    res.json().then((blogComments) => {
      let comments = blogComments.length;
      fetch('http://localhost:8000/blogs/' + blogId, {
        method: 'PATCH', //this method is similar to PUT but allows updating parts of an object instead of the entire thing
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comments: comments }),
      });
    });
  });

  return { commentAdded: true };
};

export default AddComment;
