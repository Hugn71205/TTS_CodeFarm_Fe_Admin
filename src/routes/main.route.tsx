import { createBrowserRouter } from "react-router-dom"
import AdminLayout from "../components/layouts/AdminLayout"
import OrderItemsPage from "../pages/Admin/OrderItem"
import Variant from "../pages/Variants/Variant"
import AddVariant from "../pages/Variants/addVariant"
import UpdateVolumes from "../pages/Volumes/UpdateVolumes"
import Volumes from "../pages/Volumes/Volumes"
import AddVolumes from "../pages/Volumes/addVolumes"
import AddBrand from "../pages/Brands/AddBrands"
import Brands from "../pages/Brands/Brands"
import UpdateBrand from "../pages/Brands/UpdateBrand"
import AddCategories from "../pages/Categories/AddCategories"
import Categories from "../pages/Categories/Categories"
import UpdateCategories from "../pages/Categories/UpdateCategories"
import Customers from "../pages/Customers/Customers"
import Orders from "../pages/Orders/Orders"
import Product from "../pages/Products/Product"
import UpdateProduct from "../pages/Products/UpdateProduct"
import AddProduct from "../pages/Products/addProduct"
import Reviews from "../pages/Reviews/Reviews"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AdminLayout />,
    children: [
      {path: '/products', element: <Product/>},
      {path: '/products/add', element: <AddProduct/>},
      {path: '/volumes', element: <Volumes/>},
      {path: '/volumes/add', element: <AddVolumes/>},
      {path: '/variants', element: <Variant/>},
      {path: '/variants/add', element: <AddVariant/>},
      {path: '/categories', element: <Categories/>},
      {path: '/categories/add', element: <AddCategories/>},
      {path: '/brands', element: <Brands/>},
      {path: '/brands/add', element: <AddBrand/>},
      {path: '/orders', element: <Orders/>},
      {path: '/customers', element: <Customers/>},
      {path: '/reviews', element: <Reviews/>},
      {path: '/products/update/:id', element: <UpdateProduct/>},
      {path: '/volumes/update/:id', element: <UpdateVolumes/>},
      {path: '/categories/update/:id', element: <UpdateCategories/>},
      {path: '/brands/update/:id', element: <UpdateBrand/>},
      {path: '/orders-item/order/:orderId', element: <OrderItemsPage/>},
    ],
  }
])