import { createBrowserRouter } from "react-router-dom"
import AdminLayout from "../components/layouts/AdminLayout"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AdminLayout />,
    children: [
      
    ],
  }
])
