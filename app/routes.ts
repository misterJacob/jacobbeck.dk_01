import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [
  index("routes/Home.tsx"),
  route("about", "routes/About.tsx"),
  route("contact", "routes/Contact.tsx"),
  route("portfolio", "routes/Portfolio.tsx"),

  
//   route("photoGallery", "routes/PhotoGallery.tsx"),
  // route(  "shopping", "routes/Shopping.tsx"),
] satisfies RouteConfig;
