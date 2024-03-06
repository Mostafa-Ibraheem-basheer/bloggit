import { NavLink, Link } from 'react-router-dom'; //better than normal links in Navbars Because it adds and 'active' class when Clicked!

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" id="logo-link">
        <h1 className="logo">B</h1>
      </Link>
      <div className="links">
        <NavLink to="/" /* className="home" */>home</NavLink>
        <NavLink to="/create">New&nbsp;Post</NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
