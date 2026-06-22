import { type RouteConfig, route, index } from "@react-router/dev/routes";

export default [
  // Parent layout wrapper matching "/"
  route("/", "routes/Home.tsx", [
    index("routes/LandingPage.tsx"), // Default view: Hero + Main content
    route("about", "routes/About.tsx"),
    route("portfolio", "routes/Portfolio.tsx"),
    route("contact", "routes/Contact.tsx"),
  ]),

  // Your independent specialized routes
  route("photogallery", "routes/PhotoGallery.tsx"),
  route("shop", "./layouts/ShoppingDashBoard.tsx", [
    index("./routes/Shopping.tsx"),
  ]),
  route("login", "./routes/LoginPage.tsx"),
  route("transfer", "routes/TaxiTrans.tsx"),
  route("places_to_go", "routes/PlacesToGo.tsx"),
] satisfies RouteConfig;
