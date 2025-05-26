import { createBrowserRouter } from "react-router-dom"
import AdminLayout from "../components/layouts/AdminLayout"
import { Home } from "lucide-react"
import Product from "../pages/Admin/Product"
import CreateProduct from "../pages/Admin/Create/CreateProduct"
import Categories from "../pages/Admin/Categories"
import CreateCategories from "../pages/Admin/Create/CreateCategories"
import Brands from "../pages/Admin/Brands"
import CreateBrands from "../pages/Admin/Create/CreateBrands"
import Orders from "../pages/Admin/Orders"
import Customers from "../pages/Admin/Customers"
import Reviews from "../pages/Admin/Reviews"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AdminLayout />,
    children: [
      {index: true, element: <Home/>},
      {path: '/products', element: <Product/>},
      {path: '/products/add', element: <CreateProduct/>},
      {path: '/categories', element: <Categories/>},
      {path: '/categories/add', element: <CreateCategories/>},
      {path: '/brands', element: <Brands/>},
      {path: '/brands/add', element: <CreateBrands/>},
      {path: '/orders', element: <Orders/>},
      {path: '/customers', element: <Customers/>},
      {path: '/reviews', element: <Reviews/>},
      
      
    ],
  }
])
