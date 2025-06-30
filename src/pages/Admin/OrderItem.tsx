import React, { useEffect, useState } from 'react';
import { Table, Card, message, Image } from 'antd';
import axios from 'axios';
import { useParams } from 'react-router-dom';

interface OrderItem {
  _id: string;
  order_id: {
    _id: string;
    customer_info?: any;
    receiver_info?: any;
    shipping_address?: any;
   
  };
  product_variant_id: {
    _id: string;
    product_id?: string;
    volume_id?: string;
    price: { $numberDecimal: string };
  };
  product_name: string;
  image?: string;
  price: number;
  quantity: number;
  total: number;
  createdAt: string;
  updatedAt: string;
}

const OrderItemsPage = () => {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { orderId } = useParams<{ orderId: string }>();

  const fetchOrderItems = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:8888/orders-item/order/${orderId}`);
      // console.log('API response:', res.data);
      // res.data trả về trực tiếp mảng order items nên set như sau:
      setOrderItems(res.data.data.data);
    } catch (error) {
      console.error('Error loading order items:', error);
      message.error('Không thể tải danh sách order items');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (orderId) fetchOrderItems();
  }, [`orderId`]);

  const columns = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'product_name',
      key: 'product_name',
      sorter: (a: OrderItem, b: OrderItem) => a.product_name.localeCompare(b.product_name),
    },
    {
      title: 'Ảnh',
      dataIndex: 'image',
      key: 'image',
      render: (img: string) => (img ? <Image width={60} src={img} alt="product" /> : 'No Image'),
    },
    {
      title: 'Giá',
      key: 'price',
      render: (_: any, record: OrderItem) => {
        // lấy giá từ product_variant_id.price.$numberDecimal
        const price = parseFloat(record.product_variant_id.price.$numberDecimal);
        return price.toLocaleString() + '₫';
      },
      sorter: (a: OrderItem, b: OrderItem) =>
        parseFloat(a.product_variant_id.price.$numberDecimal) - parseFloat(b.product_variant_id.price.$numberDecimal),
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
      sorter: (a: OrderItem, b: OrderItem) => a.quantity - b.quantity,
    },
    {
      title: 'Tổng',
      dataIndex: 'total',
      key: 'total',
      render: (total: number) => total.toLocaleString() + '₫',
      sorter: (a: OrderItem, b: OrderItem) => a.total - b.total,
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) =>
        new Date(date).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }),
      sorter: (a: OrderItem, b: OrderItem) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    },
  ];

  return (
    <Card
      title="Danh sách Order Items"
      style={{ margin: 24, borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
    >
      <Table
        rowKey="_id"
        columns={columns}
        dataSource={orderItems}
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
    </Card>
  );
};

export default OrderItemsPage;