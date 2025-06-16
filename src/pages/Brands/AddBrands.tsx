/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddBrand: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      await axios.post('http://localhost:3000/api/brands/', values);
      message.success('Thêm thương hiệu thành công');
      navigate('/brands') 
      form.resetFields();
    } catch (error) {
      message.error('Thêm thương hiệu thất bại');
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 20 }}>
      <h2>Thêm thương hiệu mới</h2>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Tên thương hiệu"
          name="name"
          rules={[{ required: true, message: 'Vui lòng nhập tên thương hiệu' }]}
        >
          <Input placeholder="Nhập tên thương hiệu" />
        </Form.Item>

        <Form.Item
          label="Xuất xứ"
          name="origin"
          rules={[{ required: true, message: 'Vui lòng nhập xuất xứ' }]}
        >
          <Input placeholder="Nhập xuất xứ của thương hiệu" />
        </Form.Item>

        <Form.Item label="Logo (URL)" name="logo">
          <Input placeholder="Nhập URL logo" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Thêm thương hiệu
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddBrand;
