import { Link } from 'react-router-dom';
import {
  ThumbUpOffAlt,
  ThumbDownOffAlt,
  ChatBubbleOutline,
} from '@mui/icons-material';
import { Button } from '@mui/material';
import handleVotes from '../Handlers/HandleVotes';
import useVote from '../hooks/useVote';

const Blogs = ({ data }) => {
  const { liking, setLiking, disliking, setDisLiking } = useVote();

  if (data && data.length !== 0) {
    return (
      <>
        {data.toReversed().map((blog) => { //tp show the most recent posts
          return (
            <>
              <div className="container" key={blog.id}>
                <div className="preview" key={blog.id}>
                  <Link to={'/blogs/' + blog.id}>
                    <h2>{blog.title}</h2>
                    <p className="author">{'by ' + blog.author}</p>
                    <br />
                    <br />
                    <p>{blog.body}</p>
                    <br />
                    <br />
                    <h4 className="view-more">
                      See Full Post <br />V
                    </h4>
                  </Link>
                  <div className="insight">
                    <div>
                      <Button
                        onClick={() =>
                          handleVotes(
                            blog,
                            'blogs',
                            'like',
                            setLiking,
                            setDisLiking,
                          )
                        }
                        disabled={liking}
                      >
                        <ThumbUpOffAlt fontSize="small" />
                        &nbsp;{blog.likes}
                      </Button>
                    </div>
                    <div>
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
                      >
                        <ThumbDownOffAlt fontSize="small" />
                        &nbsp;{blog.dislikes}
                      </Button>
                    </div>
                    <div>
                      <Link to={'/blogs/' + blog.id}>
                        <Button className="comments-num">
                          <ChatBubbleOutline fontSize="small" />
                          &nbsp;{blog.comments}&nbsp;
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className='separator'></div> */}
              <br />
            </>
          );
        })}
      </>
    );
  } else {
    return (
      <div className='no-posts'>
        <h1 className="header">No Posts</h1>
        <p className="empty">hmmm, its so quiet at the moment....</p>
      </div>
    );
  }
};

export default Blogs;
