import { useState } from 'react';
import {
  BarsOutlined,
  DashboardFilled,
  FileTextFilled,
  FolderOutlined,
  ProductFilled,
  LeftOutlined,
  RightOutlined,
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
        { key: 'categorieslist', label: 'Danh sách thương hiệu' },
        { key: 'categoriesadd', label: 'Thêm thương hiệu' },
      ],
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
