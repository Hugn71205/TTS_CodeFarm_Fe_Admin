/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import {
  Table,
  Image,
  Spin,
  message,
  Popconfirm,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Row,
  Col,
} from 'antd';
import axios from 'axios';
import type { Category, Brand } from '../../interface/type';

const { Option } = Select;

const Variant = () => {
  const [form] = Form.useForm();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [modalLoading, setModalLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8888/products');
      setProducts(response.data?.data?.data || []);
    } catch {
      message.error('Lấy dữ liệu sản phẩm thất bại');
    }
    setLoading(false);
  };

  const fetchCategoryAndBrand = async () => {
    try {
      const [catRes, brandRes] = await Promise.all([
        axios.get('http://localhost:8888/categories'),
        axios.get('http://localhost:8888/brands'),
      ]);
      setCategories(catRes.data?.data?.data || []);
      setBrands(brandRes.data?.data?.data || []);
    } catch {
      message.error('Lấy danh mục hoặc thương hiệu thất bại');
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategoryAndBrand();
  }, []);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await axios.delete(`http://localhost:8888/products/${id}`);
      message.success('Xóa sản phẩm thành công');
      fetchProducts();
    } catch {
      message.error('Xóa sản phẩm thất bại');
    }
    setDeletingId(null);
  };

  const handleEdit = (record: any) => {
    setEditingProduct(record);
    form.setFieldsValue({
      ...record,
      category_id: record.category_id?._id || record.category_id,
      brand_id: record.brand_id?._id || record.brand_id,
    });
    setModalVisible(true);
  };

  const handleAdd = () => {
    setEditingProduct(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleModalFinish = async (values: any) => {
    setModalLoading(true);
    try {
      if (editingProduct) {
        await axios.put(`http://localhost:8888/products/${editingProduct._id}`, values);
        message.success('Cập nhật sản phẩm thành công');
      } else {
        await axios.post('http://localhost:8888/products', values);
        message.success('Thêm sản phẩm thành công');
      }
      setModalVisible(false);
      fetchProducts();
    } catch {
      message.error(editingProduct ? 'Cập nhật thất bại' : 'Thêm thất bại');
    }
    setModalLoading(false);
  };

  const columns = [
    {
      title: 'Ảnh',
      dataIndex: 'image',
      render: (url: string) => (
        <Image width={80} src={url || 'https://via.placeholder.com/80'} alt="product" />
      ),
    },
    { title: 'Tên', dataIndex: 'name' },
    { title: 'Giới tính', dataIndex: 'gender' },
    {
      title: 'Danh mục',
      dataIndex: ['category_id', 'name'],
      key: 'category',
    },
    {
      title: 'Thương hiệu',
      dataIndex: ['brand_id', 'name'],
      key: 'brand',
    },
    { title: 'Mô tả', dataIndex: 'description', ellipsis: true },
    {
      title: 'Ngày tạo',
      dataIndex: 'created_at',
      render: (date: string) => new Date(date).toLocaleDateString(),
      sorter: (a: any, b: any) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
    },
    {
      title: 'Hành động',
      render: (record: any) => (
        <>
          <Button type="link" onClick={() => handleEdit(record)}>Sửa</Button>
          <Popconfirm
            title="Xác nhận xóa sản phẩm này?"
            onConfirm={() => handleDelete(record._id)}
            okText="Có"
            cancelText="Không"
          >
            <Button type="link" danger loading={deletingId === record._id}>Xóa</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>
        Thêm sản phẩm
      </Button>
      {loading ? (
        <Spin size="large" />
      ) : (
        <Table rowKey="_id" columns={columns} dataSource={products} pagination={{ pageSize: 8 }} />
      )}

      <Modal
        title={editingProduct ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm'}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleModalFinish}
          initialValues={{ gender: 'Nam' }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Tên sản phẩm"
                name="name"
                rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm' }]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={12}>
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

          <Form.Item label="Link ảnh" name="image">
            <Input />
          </Form.Item>

          <Form.Item label="Mô tả" name="description">
            <Input.TextArea rows={4} />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Danh mục"
                name="category_id"
                rules={[{ required: true, message: 'Vui lòng chọn danh mục' }]}
              >
                <Select>
                  {categories.map((cat) => (
                    <Option key={cat._id} value={cat._id}>{cat.name}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Thương hiệu"
                name="brand_id"
                rules={[{ required: true, message: 'Vui lòng chọn thương hiệu' }]}
              >
                <Select>
                  {brands.map((brand) => (
                    <Option key={brand._id} value={brand._id}>{brand.name}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={modalLoading}>
              {editingProduct ? 'Cập nhật' : 'Thêm'} sản phẩm
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Variant;
