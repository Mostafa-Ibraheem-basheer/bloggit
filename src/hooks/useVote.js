import { useState } from 'react';
//custom hook to access both getter and setter of the likes and dislikes buttons
const useVote = () => {
  const [liking, setLiking] = useState(false);
  const [disliking, setDisLiking] = useState(false);

  return { liking, setLiking, disliking, setDisLiking };
};

export default useVote;
