const SideBar = () => {
  return (
    <div className="sidebar">
      <div className="sb-content">
        <div>
          <h1>Welcome To&nbsp;Bloggit!</h1>
        </div>
        <div className="separator"></div>
        <div>
          <p>This is a Side bar to show some content</p>
        </div>
        <div className="separator"></div>
        <div className="ad">
          <p>This Blog is Made using React and React Router</p>
        </div>
        <div className="separator"></div>
        <div className="ad">
          <p>And was Styled using Sass</p>
        </div>
        <div className="separator"></div>
        <div className="ad">
          <p>Go ahead and create some posts!</p>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
