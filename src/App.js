import './styles/index.css';
import Home from './components/Home';
import Create from './components/Create';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import Blog from './components/Blog';
import Alert from './props/Alert';
import RootLayout from './Layouts/RootLayout';
import BlogLayout from './Layouts/BlogLayout';
import CommentsLoader from './loaders/CommentsLoader';
import { commentAction } from './components/AddComment';

function App() {
  // Template = Parent route (usually contains a Layout element) =>
  // Child route(also has a layout element if it has a child layout) =>
  // grand Child (build everything outside the outlet from all ancestor routes)
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home></Home>} />
        <Route path="create" element={<Create></Create>} />
        <Route
          path="blogs"
          element={<BlogLayout />}
          /* you can use an 'errorElement' here to show a different page 
          if this route or any of the parent routes produce and error i.e. no data was fetched for a particular id */
        >
          <Route
            path=":id"
            element={<Blog></Blog>}
            loader={
              CommentsLoader
            } /* 1-we use the comments loader to load the data in this component */
            action={
              commentAction
            } /* here we use an action that can be bound to a react router form to submit a comment inside a blog page */
          />
          <Route path="" element={<Alert alertType="404" alertBody="Sorry, the page you're looking for doesn't exist"/>} />
        </Route>
        <Route path="*" element={<Alert alertType="404" alertBody="Sorry, the page you're looking for doesn't exist"/>} />
      </Route>,
    ),
  );
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
