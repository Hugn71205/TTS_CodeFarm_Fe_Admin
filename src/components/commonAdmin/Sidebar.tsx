import { useState } from 'react';
import {
  BarsOutlined,
  DashboardFilled,
  FileTextFilled,
  FolderOutlined,
  ProductFilled,
  LeftOutlined,
  RightOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  StarOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import { useNavigate } from 'react-router-dom';

const AdminSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setCollapsed(!collapsed);

  type MenuItem = Required<MenuProps>['items'][number];

  const items: MenuItem[] = [
    {
      key: 'dashboard',
      label: 'Dashboard',
      icon: <DashboardFilled />,
    },
    {
      key: 'products',
      label: 'Quản lý sản phẩm',
      icon: <ProductFilled />,
      children: [
        { key: 'productlist', label: 'Danh sách sản phẩm' },
        { key: 'productadd', label: 'Thêm sản phẩm' },
      ],
    },
    {
      key: 'categories',
      label: 'Quản lý danh mục',
      icon: <BarsOutlined />,
      children: [
        { key: 'categorieslist', label: 'Danh sách danh mục' },
        { key: 'categoriesadd', label: 'Thêm danh mục' },
      ],
    },
    {
      key: 'brands',
      label: 'Quản lý thương hiệu',
      icon: <FolderOutlined />,
      children: [
        { key: 'brandslist', label: 'Danh sách thương hiệu' },
        { key: 'brandsadd', label: 'Thêm thương hiệu' },
      ],
    },
    {
      key: 'orderslist',
      label: 'Quản lý đơn hàng',
      icon: <ShoppingCartOutlined />,
    },
    {
      key: 'Customers',
      label: 'Quản lý khách hàng',
      icon: <UserOutlined />,
    },
    {
      key: 'Reviews',
      label: 'Quản lý bình luận',
      icon: <StarOutlined />,
    },
    {
      key: 'report',
      label: 'Thống kê',
      icon: <FileTextFilled />,
    },
  ];

  const onClick: MenuProps['onClick'] = ({ key }) => {
    switch (key) {
      case 'productlist':
        navigate('/products');
        break;
      case 'productadd':
        navigate('/products/add');
        break;
      case 'categorieslist':
        navigate('/categories');
        break;
      case 'categoriesadd':
        navigate('/categories/add');
        break;
      case 'brandslist':
        navigate('/brands');
        break;
      case 'brandsadd':
        navigate('/brands/add');
        break;
      case 'orderslist':
        navigate('/orders');
        break;
      case 'Customers':
        navigate('/customers');
        break;
      case 'Reviews':
        navigate('/reviews');
        break;

      default:
        navigate('/');
        break;
    }
  };

  return (
    <div
      className={`
        bg-white h-screen shadow transition-all duration-300
        relative flex flex-col
        ${collapsed ? 'w-16' : 'w-64'}
      `}
    >
      {/* Toggle Button */}
      <div
        onClick={toggleSidebar}
        className="absolute -right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-white border rounded-full shadow flex items-center justify-center cursor-pointer hover:bg-gray-100 transition z-10"
      >
        {collapsed ? <RightOutlined /> : <LeftOutlined />}
      </div>

      {/* Menu */}
      <Menu
        onClick={onClick}
        defaultSelectedKeys={['dashboard']}
        mode="inline"
        inlineCollapsed={collapsed}
        items={items}
        className="h-full border-none"
      />
    </div>
  );
};

export default AdminSidebar;