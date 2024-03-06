import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const RootLayout = () => {
  return (
    <>
      <Navbar></Navbar>
      <div className="app">
        <Outlet></Outlet>
      </div>
    </>
  );
};

export default RootLayout;
