import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { CircularProgress } from '@mui/material';

const Create = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [body, setBody] = useState('');
  const [creating, setCreating] = useState(false);
  const [buttonText, setButtonText] = useState('Create');
  const redirect = useNavigate();
  const handleSubmit = (e) => {
    const blog = { title, body, author, likes: 0, dislikes: 0, comments: 0};
    e.preventDefault();
    setCreating(true);
    setButtonText(<CircularProgress size={20} color="inherit" />);
    setTimeout(() => {
      fetch('http://localhost:8000/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(blog),
      })
        .then((res) => {
          if (!res.ok) {
            throw Error("Couldn't Create The Post");
          } else {
            console.log('Created');
            setButtonText('Create');
            setCreating(false);
            res.json().then((blog) => redirect('/blogs/' + blog.id));
          }
        })
        .catch((err) => {
          setCreating(false);
          setButtonText('Create');
          alert(err.message);
        });
    }, 500);
  };
  return (
    <div className="create">
      <h2 className="new-post">New Post</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          name="author"
          placeholder="Author"
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <textarea
          name="body"
          placeholder="What are you Thinking?"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows="5"
          required
        ></textarea>
        <Button disabled={creating} onClick={handleSubmit}>
          {buttonText}
        </Button>
      </form>
    </div>
  );
};

export default Create;
