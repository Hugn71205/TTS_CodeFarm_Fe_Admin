/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import {
  Table,
  Spin,
  message,
  Popconfirm,
  Button,
  Image,
  Modal,
  Form,
  Input,
  Row,
  Col,
} from 'antd';
import axios from 'axios';
import type { Brand } from '../../interface/type';

const Brands: React.FC = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);
  const [form] = Form.useForm();

  const fetchBrands = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8888/brands/');
      const data = response.data?.data?.data || [];
      setBrands(data);
    } catch (error) {
      message.error('Lấy danh sách thương hiệu thất bại');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await axios.delete(`http://localhost:8888/brands/${id}`);
      message.success('Xóa thương hiệu thành công');
      fetchBrands();
    } catch (error) {
      message.error('Xóa thương hiệu thất bại');
    }
    setDeletingId(null);
  };

  const openModalToAdd = () => {
    setEditingBrand(null);
    form.resetFields();
    setModalVisible(true);
  };

  const openModalToEdit = (brand: Brand) => {
    setEditingBrand(brand);
    form.setFieldsValue(brand);
    setModalVisible(true);
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingBrand) {
        await axios.put(`http://localhost:8888/brands/${editingBrand._id}`, values);
        message.success('Cập nhật thương hiệu thành công');
      } else {
        await axios.post('http://localhost:8888/brands/', values);
        message.success('Thêm thương hiệu thành công');
      }
      setModalVisible(false);
      fetchBrands();
    } catch (error) {
      message.error('Lưu thương hiệu thất bại');
    }
  };

  const columns = [
    {
      title: 'STT',
      key: 'index',
      width: 60,
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: 'Tên thương hiệu',
      dataIndex: 'name',
      key: 'name',
      width: 200,
    },
    {
      title: 'Xuất Xứ',
      dataIndex: 'origin',
      key: 'origin',
      ellipsis: true,
    },
    {
      title: 'Logo',
      dataIndex: 'logo',
      key: 'logo',
      render: (url: string) =>
        url ? (
          <Image width={80} src={url} alt="brand" />
        ) : (
          <Image width={80} src="https://via.placeholder.com/80" alt="no-image" />
        ),
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date?: string) => (date ? new Date(date).toLocaleString() : '-'),
      width: 180,
      sorter: (a: Brand, b: Brand) =>
        new Date(a.createdAt || '').getTime() - new Date(b.createdAt || '').getTime(),
    },
    {
      title: 'Ngày cập nhật',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (date?: string) => (date ? new Date(date).toLocaleString() : '-'),
      width: 180,
      sorter: (a: Brand, b: Brand) =>
        new Date(a.updatedAt || '').getTime() - new Date(b.updatedAt || '').getTime(),
    },
    {
      title: 'Hành Động',
      key: 'action',
      render: (record: Brand) => (
        <>
          <Button type="link" onClick={() => openModalToEdit(record)} style={{ marginRight: 8 }}>
            Sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa thương hiệu này?"
            onConfirm={() => handleDelete(record._id)}
            okText="Có"
            cancelText="Không"
          >
            <Button type="link" danger loading={deletingId === record._id}>
              Xóa
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <Button type="primary" onClick={openModalToAdd} style={{ marginBottom: 16 }}>
        Thêm thương hiệu
      </Button>

      {loading ? (
        <Spin size="large" />
      ) : (
        <Table
          rowKey="_id"
          dataSource={brands}
          columns={columns}
          pagination={{ pageSize: 10 }}
        />
      )}

      <Modal
        open={modalVisible}
        title={editingBrand ? 'Cập nhật thương hiệu' : 'Thêm thương hiệu'}
        onCancel={() => setModalVisible(false)}
        onOk={handleModalOk}
        confirmLoading={loading}
        okText={editingBrand ? 'Cập nhật' : 'Thêm mới'}
        cancelText="Hủy"
        destroyOnClose
      >
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Tên thương hiệu"
                name="name"
                rules={[{ required: true, message: 'Vui lòng nhập tên thương hiệu' }]}
              >
                <Input placeholder="Nhập tên thương hiệu" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Xuất xứ" name="origin">
                <Input placeholder="Nhập xuất xứ thương hiệu" />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="Logo (URL)" name="logo">
                <Input placeholder="Nhập URL logo thương hiệu" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default Brands;
