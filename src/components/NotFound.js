import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="not-found">
      <h2>404</h2>
      <p>The page you're looking might not exist or is deleted</p>
      <Link to="/">Go back to homepage...</Link>
    </div>
  );
};

export default NotFound;
