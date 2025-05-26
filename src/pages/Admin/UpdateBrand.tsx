import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message, Spin } from 'antd';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateBrand: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [loadingBrand, setLoadingBrand] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchBrand = async () => {
      setLoadingBrand(true);
      try {
        const res = await axios.get(`http://localhost:8888/brands/${id}`);
        const brand = res.data?.data?.data;
        form.setFieldsValue({
          name: brand.name,
          origin: brand.origin,
          logo: brand.logo,
          description: brand.description,
        });
      } catch {
        message.error('Lấy thông tin thương hiệu thất bại');
      }
      setLoadingBrand(false);
    };
    fetchBrand();
  }, [id, form]);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      await axios.put(`http://localhost:8888/brands/${id}`, values);
      message.success('Cập nhật thương hiệu thành công');
      navigate('/brands');
    } catch {
      message.error('Cập nhật thương hiệu thất bại');
    }
    setLoading(false);
  };

  if (loadingBrand) return <Spin size="large" style={{ display: 'block', margin: '50px auto' }} />;

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 20 }}>
      <h2>Cập nhật thương hiệu</h2>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Tên thương hiệu"
          name="name"
          rules={[{ required: true, message: 'Vui lòng nhập tên thương hiệu' }]}
        >
          <Input placeholder="Nhập tên thương hiệu" />
        </Form.Item>

        <Form.Item label="Xuất xứ" name="origin">
          <Input placeholder="Nhập xuất xứ thương hiệu" />
        </Form.Item>

        <Form.Item label="Logo (URL)" name="logo">
          <Input placeholder="Nhập URL logo" />
        </Form.Item>


        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Cập nhật thương hiệu
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateBrand;
