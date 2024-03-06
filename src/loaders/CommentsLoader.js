const CommentsLoader = async ({ params }) => {
  // this loader function fetches data before a component loads
  const { id } = params; // params is an argument that gets the URL parameters
  const res = await fetch('http://localhost:8000/comments?blogId=' + id); //fetch the comments on a specific blog
  // you can also throw errors here in case you want to use an error element and using the useRouteError hook inside it to catch the error
  const data = res.json(); // parse the comments
  return data; //make the available for loading
};

export default CommentsLoader;
