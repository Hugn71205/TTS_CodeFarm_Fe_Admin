/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddVolumes: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      await axios.post('http://localhost:8888/volumes', values);
      message.success('Thêm dung tích thành công');
      navigate('/volumes')
      form.resetFields();
    } catch (error) {
      message.error('Thêm dung tích thất bại');
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 20 }}>
      <h2>Thêm dung tích mới</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ name: '', description: '' }}
      >
        <Form.Item
          label="Dung tích"
          name="size"
          rules={[{ required: true, message: 'Vui lòng dung tích' }]}
        >
          <Input placeholder="Nhập dung tích" />
        </Form.Item>

        <Form.Item label="Mô tả" name="label">
          <Input.TextArea rows={4} placeholder="Nhập mô tả dung tích" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Thêm dung tích
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddVolumes;
