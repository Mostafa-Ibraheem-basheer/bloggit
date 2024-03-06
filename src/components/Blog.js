import { useState } from 'react';
import useFetch from '../hooks/useFetch';
import { useLoaderData, useParams } from 'react-router-dom';
import Alert from '../props/Alert';
import Comments from '../props/Comments';
import Button from '@mui/material/Button';
import { ThumbUpAlt, Delete, ThumbDownAlt } from '@mui/icons-material';
import useVote from '../hooks/useVote';
import handleVotes from '../Handlers/HandleVotes';
import { LinearProgress } from '@mui/material';
import SideBar from './SideBar';

const Blog = () => {
  const { id } = useParams();
  const comments = useLoaderData(); //2- here we can access the loader's parsed data for the 'CommentsLoader' loader function
  const {
    data: blog,
    loading,
    error,
  } = useFetch('http://localhost:8000/blogs/' + id);
  const [err, setErr] = useState(null);
  const [isdeleted, setIsDeleted] = useState(false);
  const { liking, disliking, setLiking, setDisLiking } = useVote(); //get getters and setters to use in the handleVotes function

  //function to delete a post
  const handleDelete = () => {
    //1. first we fetch all the comments for the post
    fetch('http://localhost:8000/comments?blogId=' + id)
      .then((res) => {
        if (!res.ok) {
          throw Error('Could not Delete Post Comments');
        }
        res.json().then((data) => {
          data.forEach((comment) => {
            //2. we then tackle a delete requset for each comment
            fetch('http://localhost:8000/comments/' + comment.id, {
              method: 'DELETE',
            });
          });
        });
      })
      .then(() => {
        //3. finally we delete the post
        fetch('http://localhost:8000/blogs/' + id, {
          method: 'DELETE',
        })
          .then((res) => {
            if (!res.ok) {
              throw Error('Could not Delete Post');
            }
            setIsDeleted(true);
          })
          .catch((err) => {
            console.log(err.message);
            setErr(err.message);
            setIsDeleted(true);
          });
      });
  };

  return (
    <>
      {!blog && !loading && <Alert alertType="404" alertBody="Sorry, the page you're looking for doesn't exist"/>}
      {/* if page has no data and done loading return the not found page */}
      {error && blog && <Alert alertType="Error" alertBody={error} />}
      {/* if an error occured during fetch show error */}
      {err && blog && <Alert alertType="Error" alertBody={err} />}
      {/* if an error occured during delete show error */}
      {loading && (
        <div className="loading-details">
          <LinearProgress />
        </div>
      )}
      {!isdeleted && blog && (
        <div className="blog-page">
          <article className="blog-details">
            <div className="blog">
              <h2>{blog.title}</h2>
              <br />
              <h3 className='author'>By {blog.author}</h3>
              <br />
              <br />
              <p>{blog.body}</p>
              <div className="buttons">
                <div className="votes">
                <Button
                  onClick={() =>
                    handleVotes(blog, 'blogs', 'like', setLiking, setDisLiking)
                  }
                  disabled={liking}
                  startIcon={<ThumbUpAlt />}
                >
                  {blog.likes}
                </Button>

                <Button
                  onClick={() =>
                    handleVotes(
                      blog,
                      'blogs',
                      'dislike',
                      setLiking,
                      setDisLiking,
                    )
                  }
                  disabled={disliking}
                  startIcon={<ThumbDownAlt />}
                >
                  {blog.dislikes}
                </Button>
                </div>
                <Button
                  id='Delete'
                  onClick={() => handleDelete()}
                  disabled={isdeleted}
                  startIcon={<Delete />}
                  variant="text"
                >
                  Delete Post
              </Button>
              </div>
              <div className="separator"></div>
              {/* 3- here we pass the data into the comments component */}
              {!isdeleted && (
                <Comments className="comments" comments={comments}></Comments>
              )}
            </div>
          </article>
          <SideBar></SideBar>
        </div>
      )}
      {!err && isdeleted && (
        <Alert alertType="Deleted" alertBody={'The post has been deleted'} />
      )}
    </>
  );
};

export default Blog;
