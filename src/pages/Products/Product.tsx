/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { Table, Image, Spin, message, Popconfirm, Button } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
   const [deletingId, setDeletingId] = useState(null);
   const navigate = useNavigate();


const fetchProducts = async () => {
  setLoading(true);
  try {
    const response = await axios.get('http://localhost:8888/products');
    const productsArray = response.data?.data?.data || []; // lấy đúng mảng sản phẩm
    setProducts(productsArray);
  } catch (error) {
    message.error('Lấy dữ liệu sản phẩm thất bại');
    console.error(error);
  }
  setLoading(false);
};


  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id:any) => {
    setDeletingId(id);
    try {
      await axios.delete(`http://localhost:8888/products/${id}`);
      message.success('Xóa sản phẩm thành công');
      fetchProducts();
    } catch (error) {
      message.error('Xóa sản phẩm thất bại');
    }
    setDeletingId(null);
  };

  const columns = [
    {
      title: 'Ảnh',
      dataIndex: 'image',
      key: 'image',
      render: (url:string) =>
        url ? (
          <Image width={80} src={url} alt="product" />
        ) : (
          <Image width={80} src="https://via.placeholder.com/80" alt="no-image" />
        ),
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Giới tính',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: 'Danh mục',
      dataIndex: ['category_id', 'name'],
      key: 'category',
    },
    {
      title: 'Thương hiệu',
      dataIndex: ['brand_id', 'name'],
      key: 'brand',
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (date:Date) => new Date(date).toLocaleDateString(),
sorter: (a: any, b: any) =>
  new Date(a.created_at as string).getTime() - new Date(b.created_at as string).getTime(),
    },
     {
      title: 'Hành Động',
      key: 'action',
     render: (record: any) => (
      <>
        <Button
          icon={<EditOutlined />}
          type="link"
          onClick={() => navigate(`/products/update/${record._id}`)}
          style={{ marginRight: 8 }}
        />

        <Popconfirm
          title="Bạn có chắc chắn muốn xóa sản phẩm này?"
          onConfirm={() => handleDelete(record._id)}
          okText="Có"
          cancelText="Không"
        >
          <Button icon={<DeleteOutlined />} type="link" danger loading={deletingId === record._id}/>
        </Popconfirm>
      </>
    ),
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      {loading ? (
        <Spin size="large" />
      ) : (
        <Table
  rowKey="_id"
  columns={columns}
  dataSource={Array.isArray(products) ? products : []}
  pagination={{ pageSize: 8 }}
/>

      )}
    </div>
  );
};

export default Product;
