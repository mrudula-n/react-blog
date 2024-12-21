// src/router/index.jsx
import { createBrowserRouter, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
// import Layout from "../components/Layout/Layout";
// import Home from "../pages/Home";
// import Login from "../pages/Login";
// import BlogList from "../pages/BlogList";
// import PostDetail from "../pages/PostDetail";
// import NewPost from "../pages/NewPost";
// import EditPost from "../pages/EditPost";
// import Profile from "../pages/Profile";
// import NotFound from "../pages/NotFound";
// import Settings from "../components/Settings/Settings";

// Lazy load components
const Layout = lazy(() => import("../components/Layout/Layout"));
const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/Login"));
const BlogList = lazy(() => import("../pages/BlogList"));
const PostDetail = lazy(() => import("../pages/PostDetail"));
const NewPost = lazy(() => import("../pages/NewPost"));
const EditPost = lazy(() => import("../pages/EditPost"));
const Profile = lazy(() => import("../pages/Profile"));
const NotFound = lazy(() => import("../pages/NotFound"));
const Settings = lazy(() => import("../components/Settings/Settings"));

const requireAuth = (element, isAuthenticated) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return element;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <Layout />
      </Suspense>
    ),
    errorElement: (
      <Suspense fallback={<LoadingSpinner />}>
        <NotFound />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "login",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "posts",
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<LoadingSpinner />}>
                <BlogList />
              </Suspense>
            ),
          },
          {
            path: ":id",
            element: (
              <Suspense fallback={<LoadingSpinner />}>
                <PostDetail />
              </Suspense>
            ),
          },
          {
            path: "new",
            element: (
              <Suspense fallback={<LoadingSpinner />}>
                <NewPost />
              </Suspense>
            ),
          },
          {
            path: ":id/edit",
            element: (
              <Suspense fallback={<LoadingSpinner />}>
                <EditPost />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "profile",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Profile />
          </Suspense>
        ),
      },
      {
        path: "settings",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Settings />
          </Suspense>
        ),
      },
    ],
  },
]);
