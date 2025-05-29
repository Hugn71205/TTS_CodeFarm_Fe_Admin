import { createBrowserRouter } from "react-router-dom"
import AdminLayout from "../components/layouts/AdminLayout"
import { Home } from "lucide-react"
import Product from "../pages/Admin/Product"

import Categories from "../pages/Admin/Categories"

import Brands from "../pages/Admin/Brands"

import Orders from "../pages/Admin/Orders"
import Customers from "../pages/Admin/Customers"
import Reviews from "../pages/Admin/Reviews"
import AddProduct from "../pages/Admin/addProduct"
import AddCategories from "../pages/Admin/AddCategories"
import AddBrand from "../pages/Admin/AddBrands"
import UpdateProduct from "../pages/Admin/UpdateProduct"
import UpdateCategories from "../pages/Admin/UpdateCategories"
import UpdateBrand from "../pages/Admin/UpdateBrand"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AdminLayout />,
    children: [
      {index: true, element: <Home/>},
      {path: '/products', element: <Product/>},
      {path: '/products/add', element: <AddProduct/>},
      {path: '/categories', element: <Categories/>},
      {path: '/categories/add', element: <AddCategories/>},
      {path: '/brands', element: <Brands/>},
      {path: '/brands/add', element: <AddBrand/>},
      {path: '/orders', element: <Orders/>},
      {path: '/customers', element: <Customers/>},
      {path: '/reviews', element: <Reviews/>},
      {path: 'products/update/:id', element: <UpdateProduct/>},
      {path: 'categories/update/:id', element: <UpdateCategories/>},
      {path: '/brands/update/:id', element: <UpdateBrand/>},
    ],
  }
])