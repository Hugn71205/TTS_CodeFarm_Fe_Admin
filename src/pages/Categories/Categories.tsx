/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import {
  Table,
  Spin,
  message,
  Popconfirm,
  Button,
  Modal,
  Form,
  Input,
} from 'antd';
import axios from 'axios';
import type { Category } from '../../interface/type';

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const [form] = Form.useForm();

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:8888/categories');
      const data = res.data?.data?.data || [];
      setCategories(data);
    } catch (error) {
      message.error('Lấy danh sách danh mục thất bại');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await axios.delete(`http://localhost:8888/categories/${id}`);
      message.success('Xóa danh mục thành công');
      fetchCategories();
    } catch {
      message.error('Xóa danh mục thất bại');
    }
    setDeletingId(null);
  };

  const handleOpenModal = (category?: Category) => {
    if (category) {
      setEditingCategory(category);
      form.setFieldsValue(category);
    } else {
      setEditingCategory(null);
      form.resetFields();
    }
    setModalVisible(true);
  };

  const handleSubmit = async (values: any) => {
    try {
      if (editingCategory) {
        await axios.put(`http://localhost:8888/categories/${editingCategory._id}`, values);
        message.success('Cập nhật danh mục thành công');
      } else {
        await axios.post(`http://localhost:8888/categories`, values);
        message.success('Thêm danh mục thành công');
      }
      fetchCategories();
      setModalVisible(false);
    } catch {
      message.error(editingCategory ? 'Cập nhật thất bại' : 'Thêm thất bại');
    }
  };

  const columns = [
    {
      title: 'STT',
      key: 'index',
      width: 60,
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: 'Tên danh mục',
      dataIndex: 'name',
      key: 'name',
      width: 200,
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date?: string) => (date ? new Date(date).toLocaleString() : '-'),
      width: 180,
    },
    {
      title: 'Ngày cập nhật',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (date?: string) => (date ? new Date(date).toLocaleString() : '-'),
      width: 180,
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (record: Category) => (
        <>
          <Button
            type="link"
            onClick={() => handleOpenModal(record)}
            style={{ marginRight: 8 }}
          >
            Sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa danh mục này?"
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
      <div style={{ textAlign: 'right', marginBottom: 16 }}>
        <Button type="primary" onClick={() => handleOpenModal()}>
          Thêm danh mục
        </Button>
      </div>

      {loading ? (
        <Spin size="large" />
      ) : (
        <Table
          rowKey="_id"
          dataSource={categories}
          columns={columns}
          pagination={{ pageSize: 10 }}
        />
      )}

      <Modal
        title={editingCategory ? 'Cập nhật danh mục' : 'Thêm danh mục'}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={() => form.submit()}
        okText={editingCategory ? 'Cập nhật' : 'Thêm'}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Tên danh mục"
            name="name"
            rules={[{ required: true, message: 'Vui lòng nhập tên danh mục' }]}
          >
            <Input placeholder="Nhập tên danh mục" />
          </Form.Item>
          <Form.Item label="Mô tả" name="description">
            <Input.TextArea rows={4} placeholder="Nhập mô tả danh mục" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Categories;
