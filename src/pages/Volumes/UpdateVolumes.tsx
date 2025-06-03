/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { Button, Input, message, Form, Spin } from 'antd';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateVolumes: React.FC = () => {
  const [form] = Form.useForm();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loadingVolume, setLoadingVolume] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchVolume = async () => {
      setLoadingVolume(true);
      try {
        const res = await axios.get(`http://localhost:8888/volumes/${id}`);
        const volume = res.data;
        form.setFieldsValue({
          size: volume.size,
          label: volume.label,
        });
      } catch {
        message.error('Lấy dung tích thất bại');
      }
      setLoadingVolume(false);
    };
    fetchVolume();
  }, [id, form]);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      await axios.put(`http://localhost:8888/volumes/${id}`, values);
      message.success('Cập nhật dung tích thành công');
      navigate('/volumes');
    } catch {
      message.error('Cập nhật dung tích thất bại');
    }
    setLoading(false);
  };

  if (loadingVolume) return <Spin size="large" style={{ display: 'block', margin: '50px auto' }} />;

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 20 }}>
      <h2>Cập nhật dung tích</h2>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Dung tích"
          name="size"
          rules={[{ required: true, message: 'Vui lòng nhập dung tích' }]}
        >
          <Input placeholder="Nhập dung tích" />
        </Form.Item>

        <Form.Item label="Mô tả" name="label">
          <Input.TextArea rows={4} placeholder="Nhập mô tả dung tích" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Cập nhật dung tích
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateVolumes;
