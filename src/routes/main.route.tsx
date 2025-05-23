import { createBrowserRouter } from "react-router-dom"
import AdminLayout from "../components/layouts/AdminLayout"
import ProductAdd from "../pages/Product/ProductAdd";
import ProductList from '../pages/Product/Product';
import ProductEdit from "../pages/Product/ProductEdit";
import CategoriesAdd from "../pages/Category/CategoriesAdd";
import CategoriesList from "../pages/Category/Categories";
import CategoriesEdit from "../pages/Category/CategoriesEdit";
import BrandList from "../pages/Brand/Brand";
import BrandAdd from "../pages/Brand/BrandAdd";
import BrandEdit from "../pages/Brand/BrandEdit";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AdminLayout />,
    children: [
      { path: "/products", element: <ProductList /> },
      { path: "/products/add", element: <ProductAdd /> },
      { path: "/products/edit/:id", element: <ProductEdit /> },
      { path: "/categories", element: <CategoriesList /> },
      { path: "/categories/add", element: <CategoriesAdd /> },
      { path: "/categories/edit/:id", element: <CategoriesEdit /> },
      { path: "/brands", element: <BrandList /> },
      { path: "/brands/add", element: <BrandAdd /> },
      { path: "/brands/edit/:id", element: <BrandEdit /> },
    ],
  }
])
