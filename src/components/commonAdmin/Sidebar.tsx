import { useState } from "react";
import {
  DashboardFilled,
  FileTextFilled,
  ProductFilled,
  LeftOutlined,
  RightOutlined,
  FilterFilled,
  FolderFilled,
  SwitcherFilled,
  TruckFilled,
  DatabaseFilled,
} from "@ant-design/icons";
import { Menu } from "antd";
import type { MenuProps } from "antd";
import { useNavigate } from "react-router-dom";
import logo from '../../assets/th-removebg-preview - Copy.png'
import { TbUserFilled } from "react-icons/tb";

const AdminSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setCollapsed(!collapsed);

  type MenuItem = Required<MenuProps>["items"][number];

  const items: MenuItem[] = [
    {
      key: "dashboard",
      label: "Dashboard",
      icon: <DashboardFilled />,
    },
    {
      key: "products",
      label: "Quản lý sản phẩm",
      icon: <ProductFilled />,
      children: [
        { key: "productlist", label: "Danh sách sản phẩm" },
        { key: "productadd", label: "Thêm sản phẩm" },
      ],
    },
    {
      key: "volumes",
      label: "Quản lý dung tích",
      icon: <FilterFilled />,
      children: [
        { key: "volumelist", label: "Danh sách dung tích" },
        { key: "volumeadd", label: "Thêm dung tích" },
      ],
    },
    {
      key: "variants",
      label: "Quản lý biến thể",
      icon: <SwitcherFilled />,
      children: [
        { key: "variantlist", label: "Danh sách biến thể" },
        { key: "variantadd", label: "Thêm biến thể" },
      ],
    },
    {
      key: "categories",
      label: "Quản lý danh mục",
      icon: <DatabaseFilled />,
      children: [
        { key: "categorieslist", label: "Danh sách danh mục" },
        { key: "categoriesadd", label: "Thêm danh mục" },
      ],
    },
    {
      key: "brands",
      label: "Quản lý thương hiệu",
      icon: <FolderFilled />,
      children: [
        { key: "brandslist", label: "Danh sách thương hiệu" },
        { key: "brandsadd", label: "Thêm thương hiệu" },
      ],
    },
    {
      key: "customers",
      label: "Quản lý người dùng",
      icon: <TbUserFilled />,
      children: [
        { key: "customerslist", label: "Danh sách người dùng" },
        { key: "customersadd", label: "Thêm người dùng" },
      ],
    },
    {
      key: "orders",
      label: "Quản lý đơn hàng",
      icon: <TruckFilled />,
      children: [
        { key: "orderslist", label: "Danh sách đơn hàng" },
        { key: "ordersadd", label: "Thêm đơn hàng" },
      ],
    },
    {
      key: "report",
      label: "Thống kê",
      icon: <FileTextFilled />,
    },
  ];

  const onClick: MenuProps["onClick"] = ({ key }) => {
    switch (key) {
      case "productlist":
        navigate("/products");
        break;
      case "productadd":
        navigate("/products/add");
        break;
      case "variantlist":
        navigate("/variants");
        break;
      case "variantadd":
        navigate("/variants/add");
        break;
      case "volumelist":
        navigate("/volumes");
        break;
      case "volumeadd":
        navigate("/volumes/add");
        break;
      case "categorieslist":
        navigate("/categories");
        break;
      case "categoriesadd":
        navigate("/categories/add");
        break;
      case "brandslist":
        navigate("/brands");
        break;
      case "brandsadd":
        navigate("/brands/add");
        break;
      case "customerslist":
        navigate("/customers");
        break;
      case "orderslist":
        navigate("/orders");
        break;
      default:
        navigate("/");
        break;
    }
  };

  return (
    <div
      className={`
        bg-white h-screen shadow transition-all duration-300
        relative flex flex-col
        ${collapsed ? "w-16" : "w-64"}
      `}
    >
      {/* Logo */}
      <div className="h-16 w-16 flex items-center justify-center border-b">
        <img
          src={logo}
          className={`transition-all duration-300 ${
            collapsed ? "w-8" : "w-28"
          }`}
        />
      </div>

      {/* Toggle Button */}
      <div
        onClick={toggleSidebar}
        className="absolute -right-3 top-20 w-6 h-6 bg-white border rounded-full shadow flex items-center justify-center cursor-pointer hover:bg-gray-100 transition z-10"
      >
        {collapsed ? <RightOutlined /> : <LeftOutlined />}
      </div>

      {/* Menu */}
      <Menu
        onClick={onClick}
        defaultSelectedKeys={["dashboard"]}
        mode="inline"
        inlineCollapsed={collapsed}
        items={items}
        className="h-full border-none"
      />
    </div>
  );
};

export default AdminSidebar;