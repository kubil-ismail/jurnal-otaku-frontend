import { lazy } from "react";

const Routes = [
  // DEFAULT PAGES
  {
    path: "/",
    component: lazy(() => import("pages/Home")),
    name: "Home",
  },
  /*
   ---------------------------------------------
    YOUR URL PAGES
   ---------------------------------------------
  */
  {
    path: "/news/detail/:id",
    component: lazy(() => import("pages/News/Detail")),
    name: "News",
  },
  {
    path: "/news",
    component: lazy(() => import("pages/News/index")),
    name: "News",
  },
  {
    path: "/reviews/detail/:id",
    component: lazy(() => import("pages/Reviews/Detail")),
    name: "Reviews",
  },
  {
    path: "/reviews",
    component: lazy(() => import("pages/Reviews/index")),
    name: "Reviews",
  },
  {
    path: "/my-reviews",
    component: lazy(() => import("pages/Reviews/MyReviews")),
    name: "My Reviews",
  },
  {
    path: "/anime",
    component: lazy(() => import("pages/Anime")),
    name: "Anime",
  },
  /*
    ---------------------------------------------
    PLEASE KEEP PUT IT AT THE BOTTOM
    ---------------------------------------------
  */
  {
    path: "/logout",
    component: lazy(() => import("pages/Logout")),
    name: "Logout",
  },
  {
    path: "*",
    component: lazy(() => import("pages/404")),
    name: "Page not found",
  },
];

export default Routes;
