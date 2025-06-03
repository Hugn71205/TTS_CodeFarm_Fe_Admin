/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import { Form, Input, Button, Select, message } from 'antd';
import axios from 'axios';
import type { Brand, Category } from '../../interface/type';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const AddVariant = () => {
  const [form] = Form.useForm();
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, brandRes] = await Promise.all([
          axios.get('http://localhost:8888/categories'),
          axios.get('http://localhost:8888/brands'),
        ]);
        setCategories(catRes.data.data?.data || []);
      setBrands(brandRes.data.data?.data || []);
      } catch (error) {
        message.error('Lấy danh mục hoặc thương hiệu thất bại');
      }
    };
    fetchData();
  }, []);

  const onFinish = async (values:any) => {
    setLoading(true);
    try {
      await axios.post('http://localhost:8888/products', values);
      message.success('Thêm sản phẩm thành công');
      navigate('/products')
      form.resetFields();
    } catch (error) {
      message.error('Thêm sản phẩm thất bại');
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 20 }}>
      <h2>Thêm sản phẩm mới</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ gender: 'Nam' }}
      >
        <Form.Item
          label="Tên sản phẩm"
          name="name"
          rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm' }]}
        >
          <Input placeholder="Nhập tên sản phẩm" />
        </Form.Item>

        <Form.Item label="Link ảnh" name="image">
          <Input placeholder="Nhập URL ảnh sản phẩm" />
        </Form.Item>

        <Form.Item
          label="Giới tính"
          name="gender"
          rules={[{ required: true, message: 'Vui lòng chọn giới tính' }]}
        >
          <Select>
            <Option value="Nam">Nam</Option>
            <Option value="Nữ">Nữ</Option>
            <Option value="Unisex">Unisex</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Mô tả" name="description">
          <Input.TextArea rows={4} placeholder="Nhập mô tả sản phẩm" />
        </Form.Item>

        <Form.Item
          label="Danh mục"
          name="category_id"
          rules={[{ required: true, message: 'Vui lòng chọn danh mục' }]}
        >
          <Select placeholder="Chọn danh mục">
            {categories.map((cat) => (
              <Option key={cat._id} value={cat._id}>
                {cat.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Thương hiệu"
          name="brand_id"
          rules={[{ required: true, message: 'Vui lòng chọn thương hiệu' }]}
        >
          <Select placeholder="Chọn thương hiệu">
            {brands.map((brand) => (
              <Option key={brand._id} value={brand._id}>
                {brand.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Thêm sản phẩm
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddVariant;
