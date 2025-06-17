/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, message, Spin, Row, Col } from 'antd';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import type { Brand, Category } from '../../interface/type';

const { Option } = Select;

const UpdateProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingProduct, setLoadingProduct] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, brandRes] = await Promise.all([
          axios.get('http://localhost:8888/categories'),
          axios.get('http://localhost:8888/brands'),
        ]);
        setCategories(catRes.data.data?.data || []);
        setBrands(brandRes.data.data?.data || []);
      } catch {
        message.error('Lấy danh mục hoặc thương hiệu thất bại');
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!id) return;
    const fetchProduct = async () => {
      setLoadingProduct(true);
      try {
        const res = await axios.get(`http://localhost:8888/products/${id}`);
        const product = res.data?.data?.data;
        form.setFieldsValue({
          name: product.name,
          image: product.image,
          gender: product.gender,
          description: product.description,
          category_id: product.category_id?._id || product.category_id,
          brand_id: product.brand_id?._id || product.brand_id,
        });
      } catch {
        message.error('Lấy thông tin sản phẩm thất bại');
      }
      setLoadingProduct(false);
    };
    fetchProduct();
  }, [id, form]);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      await axios.put(`http://localhost:8888/products/${id}`, values);
      message.success('Cập nhật sản phẩm thành công');
      navigate('/products');
    } catch {
      message.error('Cập nhật sản phẩm thất bại');
    }
    setLoading(false);
  };

  if (loadingProduct) return <Spin size="large" style={{ display: 'block', margin: '50px auto' }} />;

  return (
    <div style={{ padding: 20 }}>
      <h2>Cập nhật sản phẩm</h2>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              label="Tên sản phẩm"
              name="name"
              rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm' }]}
            >
              <Input placeholder="Nhập tên sản phẩm" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
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
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label="Link ảnh" name="image">
              <Input placeholder="Nhập URL ảnh sản phẩm" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label="Mô tả" name="description">
              <Input.TextArea rows={4} placeholder="Nhập mô tả sản phẩm" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} md={12}>
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
          </Col>

          <Col xs={24} md={12}>
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
          </Col>
        </Row>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Cập nhật sản phẩm
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateProduct;
