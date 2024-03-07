import useFetch from '../hooks/useFetch';
import Blogs from '../props/Blogs';
import LinearProgress from '@mui/material/LinearProgress';
import SideBar from './SideBar';
import  Alert  from '../props/Alert';

const Home = () => {
  const {
    data: blogs,
    loading,
    error,
  } = useFetch('http://localhost:8000/blogs');
  return (
    <div className="home">
      {error && <Alert alertType={'Error'} alertBody={error}></Alert>}
      {loading && (
        <div className="loading-posts">
          <LinearProgress variant="indeterminate" />
        </div>
      )}
      <div className="content">
        {blogs && (
          <Blogs data={blogs} className="blogs"></Blogs>
        )}
      </div>
      {!loading && <SideBar></SideBar>}
    </div>
  );
};

export default Home;
