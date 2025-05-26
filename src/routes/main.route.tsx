import { createBrowserRouter } from "react-router-dom"
import AdminLayout from "../components/layouts/AdminLayout"
import Product from "../pages/Admin/Product"
import AddProduct from "../pages/Admin/addProduct"
import Categories from "../pages/Admin/Categories"
import Brands from "../pages/Admin/Brands"
import AddBrand from "../pages/Admin/AddBrands"
import AddCategories from "../pages/Admin/AddCategories"
import UpdateProduct from "../pages/Admin/UpdateProduct"
import UpdateCategories from "../pages/Admin/UpdateCategories"
import UpdateBrand from "../pages/Admin/UpdateBrand"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AdminLayout />,
    children: [
      {
        path:'products',
        element:<Product/>
      },
      {
        path:'products/add',
        element:<AddProduct/>
      },
      {
        path:'products/update/:id',
        element:<UpdateProduct/>
      },
      {
        path:'categories',
        element:<Categories/>
      },
      {
        path:'categories/add',
        element:<AddCategories/>
      },{
        path:'categories/update/:id',
        element:<UpdateCategories/>
      },
      {
        path:'brands',
        element:<Brands/>
      },
      {
        path:'brands/add',
        element:<AddBrand/>
      },{
        path:'brands/update/:id',
        element:<UpdateBrand/>
      },
    ],
  }
])
