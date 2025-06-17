/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import {
  Table,
  Spin,
  message,
  Popconfirm,
  Button,
  Modal,
  Form,
  Select,
  Row,
  Col,
  InputNumber,
} from 'antd';
import axios from 'axios';
import type { Product, Volume } from '../../interface/type';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const { Option } = Select;

 const Variant = () => {
  const [form] = Form.useForm();
  const [variants, setVariants] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingVariant, setEditingVariant] = useState<any>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [volumes, setVolumes] = useState<Volume[]>([]);
  const [modalLoading, setModalLoading] = useState(false);

  const fetchVariants = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8888/variants');
      setVariants(response.data || []);
    } catch {
      message.error('Lấy dữ liệu biến thể sản phẩm thất bại');
    }
    setLoading(false);
  };

  const fetchVolumeAndProduct = async () => {
    try {
      const [proRes, voluRes] = await Promise.all([
        axios.get('http://localhost:8888/products'),
        axios.get('http://localhost:8888/volumes'),
      ]);
      setProducts(proRes.data?.data?.data || proRes.data?.data || []);
      setVolumes(voluRes.data || []);
    } catch {
      message.error('Lấy sản phẩm hoặc dung tích thất bại');
    }
  };

  useEffect(() => {
    fetchVariants();
    fetchVolumeAndProduct();
  }, []);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await axios.delete(`http://localhost:8888/variants/${id}`);
      message.success('Xóa biến thể thành công');
      fetchVariants();
    } catch {
      message.error('Xóa biến thể thất bại');
    }
    setDeletingId(null);
  };

  const handleEdit = (record: any) => {
    setEditingVariant(record);
    form.setFieldsValue({
      ...record,
      product_id: record.product_id?._id || record.product_id,
      volume_id: record.volume_id?._id || record.volume_id,
      price: parseFloat(record.price?.$numberDecimal || record.price || 0),
    });
    setModalVisible(true);
  };

  const handleAdd = () => {
    setEditingVariant(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleModalFinish = async (values: any) => {
    setModalLoading(true);
    try {
      if (editingVariant) {
        await axios.put(`http://localhost:8888/variants/${editingVariant._id}`, values);
        message.success('Cập nhật biến thể thành công');
      } else {
        await axios.post('http://localhost:8888/variants', values);
        message.success('Thêm biến thể thành công');
      }
      setModalVisible(false);
      fetchVariants();
    } catch {
      message.error(editingVariant ? 'Cập nhật thất bại' : 'Thêm thất bại');
    }
    setModalLoading(false);
  };

  const columns = [
    {
      title: 'Sản phẩm',
      dataIndex: 'product_id',
      render: (product: any) => product?.name || '---',
    },
    {
    title: 'Dung tích',
    dataIndex: 'volume_id',
    render: (volume: any) => volume?.label || '---',
    },
    {
    title: 'Giá',
    dataIndex: 'price',
    render: (price: any) => {
      const value = parseFloat(price?.$numberDecimal || 0);
      return value.toLocaleString('vi-VN') + '₫';
    },
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
      render: (record: any) => (
        <>
          <Button type="link" onClick={() => handleEdit(record)} icon={<EditOutlined />}/>
          <Popconfirm
            title="Xác nhận xóa biến thể này?"
            onConfirm={() => handleDelete(record._id)}
            okText="Có"
            cancelText="Không"
          >
            <Button type="link" danger loading={deletingId === record._id} icon={<DeleteOutlined />} />
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>
        Thêm biến thể
      </Button>

      {loading ? (
        <Spin size="large" />
      ) : (
        <Table
          rowKey="_id"
          columns={columns}
          dataSource={variants}
          pagination={{ pageSize: 8 }}
        />
      )}

      <Modal
        title={editingVariant ? 'Cập nhật biến thể' : 'Thêm biến thể'}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleModalFinish}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Sản phẩm"
                name="product_id"
                rules={[{ required: true, message: 'Vui lòng chọn sản phẩm' }]}
              >
                <Select placeholder="Chọn sản phẩm">
                  {products.map((product) => (
                    <Option key={product._id} value={product._id}>
                      {product.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Dung tích"
                name="volume_id"
                rules={[{ required: true, message: 'Vui lòng chọn dung tích' }]}
              >
                <Select placeholder="Chọn dung tích">
                  {volumes.map((volume) => (
                    <Option key={volume._id} value={volume._id}>
                      {volume.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Giá"
            name="price"
            rules={[{ required: true, message: 'Vui lòng nhập giá' }]}
          >
            <InputNumber
              style={{ width: '100%', textAlign: 'right' }}
              min={0}
              step={1000}
              formatter={(value) =>
                value ? `${value}`.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' ₫' : ''
              }
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={modalLoading}>
              {editingVariant ? 'Cập nhật' : 'Thêm'} biến thể
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Variant;
