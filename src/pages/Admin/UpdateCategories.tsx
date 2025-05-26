import React, { useState, useEffect } from 'react';
import { Button, Input, message, Form, Spin } from 'antd';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateCategories: React.FC = () => {
  const [form] = Form.useForm();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loadingCategory, setLoadingCategory] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchCategory = async () => {
      setLoadingCategory(true);
      try {
        const res = await axios.get(`http://localhost:8888/categories/${id}`);
        const category = res.data?.data?.data;
        form.setFieldsValue({
          name: category.name,
          description: category.description,
        });
      } catch {
        message.error('Lấy danh mục thất bại');
      }
      setLoadingCategory(false);
    };
    fetchCategory();
  }, [id, form]);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      await axios.put(`http://localhost:8888/categories/${id}`, values);
      message.success('Cập nhật danh mục thành công');
      navigate('/categories'); // chuyển về danh sách
    } catch {
      message.error('Cập nhật danh mục thất bại');
    }
    setLoading(false);
  };

  if (loadingCategory) return <Spin size="large" style={{ display: 'block', margin: '50px auto' }} />;

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 20 }}>
      <h2>Cập nhật danh mục</h2>
      <Form form={form} layout="vertical" onFinish={onFinish}>
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

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Cập nhật danh mục
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateCategories;
