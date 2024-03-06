import { Link } from 'react-router-dom';

const Alert = ({ alertType, alertBody }) => {
  return (
    <div className="alert">
      <h1>{alertType}</h1>
      <p>{alertBody}</p>
      <Link to="/">Go back to homepage...</Link>
    </div>
  );
};

export default Alert;
