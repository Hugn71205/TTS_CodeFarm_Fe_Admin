import { Table, Button, Input, Space, Popconfirm, message } from 'antd';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Product {
  key: string;
  name: string;
  description: string;
}

const mockData: Product[] = [
  {
    key: '1',
    name: 'Rau muống',
    description: 'Rau xanh',
  },
  {
    key: '2',
    name: 'Cà chua',
    description: 'Rau củ',
  },
];

const CategoriesList = () => {
  const [data, setData] = useState(mockData);
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  const handleDelete = (key: string) => {
    setData(prev => prev.filter(item => item.key !== key));
    message.success('Đã xoá sản phẩm');
  };

  const filteredData = data.filter(item =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns: ColumnsType<Product> = [
    {
      title: 'Tên danh mục',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Hành động',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => navigate(`/products/edit/${record.key}`)}>
            Sửa
          </Button>
          <Popconfirm
            title="Bạn chắc chắn xoá?"
            onConfirm={() => handleDelete(record.key)}
            okText="Xoá"
            cancelText="Huỷ"
          >
            <Button icon={<DeleteOutlined />} danger>
              Xoá
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="bg-white p-5 rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <Input
          placeholder="Tìm kiếm sản phẩm..."
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          className="w-1/3"
        />
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate('/products/add')}
        >
          Thêm danh mục
        </Button>
      </div>
      <Table columns={columns} dataSource={filteredData} pagination={{ pageSize: 5 }} />
    </div>
  );
};

export default CategoriesList;