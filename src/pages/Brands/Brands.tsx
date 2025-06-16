/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Table, Spin, message, Popconfirm, Button,Image } from 'antd';
import axios from 'axios';
import type { Brand } from '../../interface/type';
import { useNavigate } from 'react-router-dom';

const Brands: React.FC = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchBrands = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3000/api/brands');
      const data = response.data || [];
      setBrands(data);
    } catch (error) {
      message.error('Lấy danh sách danh mục thất bại');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await axios.delete(`http://localhost:3000/api/brands/${id}`);
      message.success('Xóa thương hiệu thành công');
      fetchBrands();
    } catch (error) {
      message.error('Xóa danh mục thất bại');
    }
    setDeletingId(null);
  };

  const columns = [
    {
    title: 'STT',
    key: 'index',
    width: 60,
    render: (_: any, __: any, index: number) => index + 1,
  },
    {
      title: 'Tên thương hiệu',
      dataIndex: 'name',
      key: 'name',
      width: 200,
    },
    {
      title: 'Xuất Xứ',
      dataIndex: 'origin',
      key: 'origin',
      ellipsis: true,
    },
    {
      title: 'Logo',
      dataIndex: 'logo',
      key: 'logo',
       render: (url:string) =>
        url ? (
          <Image width={80} src={url} alt="brand" />
        ) : (
          <Image width={80} src="https://via.placeholder.com/80" alt="no-image" />
        ),
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date?: string) => date ? new Date(date).toLocaleString() : '-',
      width: 180,
      sorter: (a: Brand, b: Brand) => {
        return (new Date(a.createdAt || '').getTime() || 0) - (new Date(b.createdAt || '').getTime() || 0);
      }
    },
    {
      title: 'Ngày cập nhật',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (date?: string) => date ? new Date(date).toLocaleString() : '-',
      width: 180,
      sorter: (a: Brand, b: Brand) => {
        return (new Date(a.updatedAt || '').getTime() || 0) - (new Date(b.updatedAt || '').getTime() || 0);
      }
    },
    {
          title: 'Hành Động',
          key: 'action',
          render: ( record:any) => (
            <>
            <Button
                      type="link"
                      onClick={() => navigate(`/brands/update/${record._id}`)}
                      style={{ marginRight: 8 }}
                    >
                      Sửa
                    </Button>
            <Popconfirm
              title="Bạn có chắc chắn muốn xóa sản phẩm này?"
              onConfirm={() => handleDelete(record._id)}
              okText="Có"
              cancelText="Không"
            >
              <Button type="link" danger loading={deletingId === record._id}>
                Xóa
              </Button>
            </Popconfirm>
            </>
            
            
          ),
        },
  ];


  return (
    <div style={{ padding: 20 }}>
      {loading ? (
        <Spin size="large" />
      ) : (
        <Table
          rowKey="_id"
          dataSource={brands}
          columns={columns}
          pagination={{ pageSize: 10 }}
        />
      )}
    </div>
  );
};

export default Brands;
