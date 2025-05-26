import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';

const AddBrand: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      await axios.post('http://localhost:8888/brands', values);
      message.success('Thêm thương hiệu thành công');
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
