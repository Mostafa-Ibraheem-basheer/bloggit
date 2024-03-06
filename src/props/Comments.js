import { useState } from 'react';
import AddComment from '../components/AddComment';
import Button from '@mui/material/Button';
import { ThumbUpAlt, Delete, ThumbDownAlt } from '@mui/icons-material';
import handleVotes from '../Handlers/HandleVotes';
import useVote from '../hooks/useVote';

const Comments = ({ comments }) => {
  //4- finally we can use the data from the loader and render it to the dom
  const [isdeleted, setIsDeleted] = useState(false);
  const { liking, disliking, setLiking, setDisLiking } = useVote(); //get getters and setters to use in the handleVotes function
  let isEmpty = true;
  if (comments.length){
    isEmpty = false
  }
  const handleDelete = (id) => {
    fetch('http://localhost:8000/comments/' + id, {
      method: 'DELETE',
    })
      .then((res) => {
        if (res.status === 404) {
          throw Error('Comment is already Deleted');
        }
        if (!res.ok) {
          throw Error('Could not Delete Comment');
        }
        let newComments = comments.length - 1; //update the number of comment to the corresponding post
        fetch('http://localhost:8000/blogs/' + comments[0].blogId, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ comments: newComments }),
        }).then(window.location.reload());
      })
      .catch((err) => {
        alert(err.message);
        setIsDeleted(false);
      });
  };

  return (
    <>
      <AddComment></AddComment>
      {isEmpty && <><div className="separator"> </div><h3 className='no-comments'>Be the First one to Comment!</h3></>}
      {!isEmpty && <div className="Comments">
        {comments.toReversed().map((comment) => (
          <div className="comment" key={comment.id}>
            <div className="separator"></div>
            <h3>{comment.author} Commented:</h3>
            <p>{comment.body}</p>
            <div className="buttons">
              <div className="votes">
                <Button id='like'
                onClick={() =>
                  handleVotes(
                    comment,
                    'comments',
                    'like',
                    setLiking,
                    setDisLiking,
                  )
                }
                disabled={liking}
                startIcon={<ThumbUpAlt />}
              >
                {comment.likes}
              </Button>

              <Button id='dislike'
                onClick={() =>
                  handleVotes(
                    comment,
                    'comments',
                    'dislike',
                    setLiking,
                    setDisLiking,
                  )
                }
                disabled={disliking}
                startIcon={<ThumbDownAlt />}
              >
                {comment.dislikes}
              </Button>
              </div>
                <Button
                id="delete"
                onClick={() => handleDelete(comment.id)}
                disabled={isdeleted}
                startIcon={<Delete />}
                variant="text"
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>}
    </>
  );
};

export default Comments;
