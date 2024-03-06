//updates likes/dislikes for blogs and comments (data of comment/post, type comment or post,setter for likes,setter for dislikes)
const handleVotes = (data, type, vote, setLiking, setDisLiking) => {
  if (vote === 'like') {
    data.likes = data.likes + 1;
    console.log();
    setLiking(true);
  } else {
    data.dislikes = data.dislikes + 1;
    setDisLiking(true);
  }
  //update the like/dislike value accordingly
  setTimeout(() => {
    fetch('http://localhost:8000/' + type + '/' + data.id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("Couldn't Add A Like");
        } else {
          setLiking(false);
          setDisLiking(false);
        }
      })
      .catch((err) => {
        setLiking(false);
        setDisLiking(false);
        alert(err.message);
      });
  }, 0);

  return;
};

export default handleVotes;
