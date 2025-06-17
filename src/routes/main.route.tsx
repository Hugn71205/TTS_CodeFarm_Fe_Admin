import { createBrowserRouter } from "react-router-dom"
import AdminLayout from "../components/layouts/AdminLayout"
import OrderItemsPage from "../pages/Admin/OrderItem"
import Volumes from "../pages/Volumes/Volumes"
import Brands from "../pages/Brands/Brands"
import Categories from "../pages/Categories/Categories"
import Customers from "../pages/Customers/Customers"
import Orders from "../pages/Orders/Orders"
import Product from "../pages/Products/Product"
import Reviews from "../pages/Reviews/Reviews"
import AddProduct from "../pages/Products/addProduct"
import UpdateProduct from "../pages/Products/UpdateProduct"
import Variant from "../pages/Variants/Variant"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AdminLayout />,
    children: [
      {path: '/products', element: <Product/>},
      {path: '/products/add', element: <AddProduct/>},
      {path: '/products/update/:id', element: <UpdateProduct/>},
      {path: '/volumes', element: <Volumes/>},
      {path: '/variants', element: <Variant/>},
      {path: '/categories', element: <Categories/>},
      {path: '/brands', element: <Brands/>},
      {path: '/orders', element: <Orders/>},
      {path: '/customers', element: <Customers/>},
      {path: '/reviews', element: <Reviews/>},
      {path: '/orders-item/order/:id', element: <OrderItemsPage/>},
    ],
  }
])