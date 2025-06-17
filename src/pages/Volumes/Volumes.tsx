/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import {
  Table,
  Button,
  Popconfirm,
  Modal,
  Form,
  Input,
  message,
  Spin,
} from 'antd';
import axios from 'axios';
import type { Volume } from '../../interface/type';

const Volumes: React.FC = () => {
  const [volumes, setVolumes] = useState<Volume[]>([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVolume, setEditingVolume] = useState<Volume | null>(null);
  const [form] = Form.useForm();

  const fetchVolumes = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8888/volumes');
      setVolumes(response.data || []);
    } catch {
      message.error('Lấy danh sách dung tích thất bại');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchVolumes();
  }, []);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await axios.delete(`http://localhost:8888/volumes/${id}`);
      message.success('Xóa dung tích thành công');
      fetchVolumes();
    } catch {
      message.error('Xóa dung tích thất bại');
    }
    setDeletingId(null);
  };

  const openAddModal = () => {
    setEditingVolume(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const openEditModal = (volume: Volume) => {
    setEditingVolume(volume);
    form.setFieldsValue({ size: volume.size, label: volume.label });
    setIsModalOpen(true);
  };

  const handleSubmit = async (values: any) => {
    try {
      if (editingVolume) {
        await axios.put(`http://localhost:8888/volumes/${editingVolume._id}`, values);
        message.success('Cập nhật dung tích thành công');
      } else {
        await axios.post('http://localhost:8888/volumes', values);
        message.success('Thêm dung tích thành công');
      }
      setIsModalOpen(false);
      fetchVolumes();
    } catch {
      message.error(editingVolume ? 'Cập nhật thất bại' : 'Thêm thất bại');
    }
  };

  const columns = [
    {
      title: 'STT',
      render: (_: any, __: any, index: number) => index + 1,
      width: 60,
    },
    {
      title: 'Dung tích',
      dataIndex: 'size',
      key: 'size',
    },
    {
      title: 'Mô tả',
      dataIndex: 'label',
      key: 'label',
      ellipsis: true,
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      render: (date?: string) => (date ? new Date(date).toLocaleString() : '-'),
      width: 180,
    },
    {
      title: 'Ngày cập nhật',
      dataIndex: 'updatedAt',
      render: (date?: string) => (date ? new Date(date).toLocaleString() : '-'),
      width: 180,
    },
    {
      title: 'Hành động',
      key: 'actions',
      render: (record: Volume) => (
        <>
          <Button type="link" onClick={() => openEditModal(record)}>
            Sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa?"
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
      <Button type="primary" onClick={openAddModal} style={{ marginBottom: 16 }}>
        Thêm dung tích
      </Button>
      {loading ? (
        <Spin size="large" />
      ) : (
        <Table rowKey="_id" dataSource={volumes} columns={columns} pagination={{ pageSize: 10 }} />
      )}

      <Modal
        title={editingVolume ? 'Cập nhật dung tích' : 'Thêm dung tích'}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Dung tích"
            name="size"
            rules={[{ required: true, message: 'Vui lòng nhập dung tích' }]}
          >
            <Input placeholder="Nhập dung tích" />
          </Form.Item>

          <Form.Item label="Mô tả" name="label">
            <Input.TextArea rows={3} placeholder="Nhập mô tả" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              {editingVolume ? 'Cập nhật' : 'Thêm mới'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Volumes;