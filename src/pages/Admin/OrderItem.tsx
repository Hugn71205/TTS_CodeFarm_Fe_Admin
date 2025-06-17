/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import {
  Table,
  Card,
  message,
  Image,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Space,
} from 'antd';
import axios from 'axios';
import { useParams } from 'react-router-dom';

interface OrderItem {
  _id?: string;
  order_id: string;
  product_variant_id: string;
  product_name: string;
  image?: string;
  price: number;
  quantity: number;
  total?: number;
  createdAt?: string;
  updatedAt?: string;
}

const OrderItemsPage: React.FC = () => {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [editItem, setEditItem] = useState<OrderItem | null>(null);
  const [form] = Form.useForm();
  const { orderId } = useParams<{ orderId: string }>();

  const fetchOrderItems = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/order-items/order/${orderId}`);
      setOrderItems(res.data);
    } catch (error) {
      message.error('Không thể tải danh sách order items');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (orderId) fetchOrderItems();
  }, [orderId]);

  const handleOpen = (item?: OrderItem) => {
    setEditItem(item || null);
    if (item) {
      form.setFieldsValue(item);
    } else {
      form.resetFields();
    }
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/order-items/${id}`);
      message.success('Xóa thành công');
      fetchOrderItems();
    } catch (error) {
      message.error('Lỗi khi xóa');
    }
  };

  const handleSubmit = async (values: OrderItem) => {
    try {
      const payload = {
        ...values,
        order_id: orderId,
        total: values.price * values.quantity,
      };

      if (editItem?._id) {
        await axios.put(`/api/order-items/${editItem._id}`, payload);
        message.success('Cập nhật thành công');
      } else {
        await axios.post('/api/order-items', payload);
        message.success('Tạo mới thành công');
      }

      setOpen(false);
      fetchOrderItems();
    } catch (error) {
      message.error('Lỗi khi lưu dữ liệu');
    }
  };

  const columns = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'product_name',
      key: 'product_name',
    },
    {
      title: 'Ảnh',
      dataIndex: 'image',
      key: 'image',
      render: (img: string) => (img ? <Image width={60} src={img} /> : 'Không có'),
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `${price.toLocaleString()}₫`,
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Tổng',
      key: 'total',
      render: (_: any, record: OrderItem) =>
        `${(record.price * record.quantity).toLocaleString()}₫`,
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) =>
        new Date(date).toLocaleDateString('vi-VN'),
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_: any, record: OrderItem) => (
        <Space>
          <Button onClick={() => handleOpen(record)}>Sửa</Button>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa?"
            onConfirm={() => handleDelete(record._id!)}
          >
            <Button danger>Xóa</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Card
      title="Danh sách Order Items"
      extra={<Button type="primary" onClick={() => handleOpen()}>Thêm</Button>}
      style={{ margin: 24, borderRadius: 8 }}
    >
      <Table
        rowKey="_id"
        columns={columns}
        dataSource={orderItems}
        loading={loading}
        pagination={{ pageSize: 10 }}
      />

      <Modal
        open={open}
        title={editItem ? 'Cập nhật Order Item' : 'Thêm Order Item'}
        onCancel={() => setOpen(false)}
        onOk={() => form.submit()}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item name="product_name" label="Tên sản phẩm" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="image" label="Ảnh">
            <Input />
          </Form.Item>

          <Form.Item name="price" label="Giá" rules={[{ required: true }]}>
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item name="quantity" label="Số lượng" rules={[{ required: true }]}>
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item name="product_variant_id" label="ID biến thể" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default OrderItemsPage;
