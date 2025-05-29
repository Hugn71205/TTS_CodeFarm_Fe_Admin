import React, { useEffect, useState } from 'react';
import { Table, Button, message, Tag, Card, Popconfirm } from 'antd';
import dayjs from 'dayjs';
import { axiosInstance } from '../../utils/axios.util';

interface User {
  _id: string;
  name: string;
  email: string;
  sdt?: string;
  isAdmin: boolean;
  isBlocked: boolean;
  createdAt: string;
}

const Customers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get('auth/list');
      setUsers(res.data || []);
    } catch (error) {
      message.error('Không thể tải danh sách người dùng');
    } finally {
      setLoading(false);
    }
  };

  const toggleBlockUser = async (user: User) => {
    const action = user.isBlocked ? 'mở khóa' : 'khóa';

    try {
      setUpdatingId(user._id);

      await axiosInstance.patch(`auth/block/${user._id}`, {
        isBlocked: !user.isBlocked,
      });

      // Cập nhật nhanh trên UI
      setUsers((prev) =>
        prev.map((u) =>
          u._id === user._id ? { ...u, isBlocked: !u.isBlocked } : u
        )
      );

      message.success(`${action.charAt(0).toUpperCase() + action.slice(1)} thành công`);
    } catch (err: any) {
      message.error(`Không thể ${action}: ${err.response?.data?.message || err.message}`);
    } finally {
      setUpdatingId(null);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const columns = [
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: User, b: User) => a.name.localeCompare(b.name),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'SĐT',
      dataIndex: 'sdt',
      key: 'sdt',
      render: (sdt: string | undefined) =>
        sdt ? sdt : <span style={{ color: '#999', fontStyle: 'italic' }}>Chưa có</span>,
    },
    {
      title: 'Vai trò',
      dataIndex: 'isAdmin',
      key: 'role',
      filters: [
        { text: 'Admin', value: true },
        { text: 'Khách', value: false },
      ],
      onFilter: (value: boolean, record: User) => record.isAdmin === value,
      render: (isAdmin: boolean) =>
        isAdmin ? <Tag color="green">Admin</Tag> : <Tag color="blue">Khách</Tag>,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'isBlocked',
      key: 'status',
      filters: [
        { text: 'Hoạt động', value: false },
        { text: 'Đã khóa', value: true },
      ],
      onFilter: (value: boolean, record: User) => record.isBlocked === value,
      render: (isBlocked: boolean) =>
        isBlocked ? (
          <Tag color="red">Đã khóa</Tag>
        ) : (
          <Tag color="green">Hoạt động</Tag>
        ),
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) =>
        dayjs(date).isValid() ? dayjs(date).format('DD/MM/YYYY') : 'Không rõ',
      sorter: (a: User, b: User) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (user: User) => {
        const actionText = user.isBlocked ? 'Mở khóa' : 'Khóa';
        const confirmText = `Bạn có chắc chắn muốn ${actionText.toLowerCase()} người dùng này không?`;

        return (
          <Popconfirm
            title={confirmText}
            onConfirm={() => toggleBlockUser(user)}
            okText="Đồng ý"
            cancelText="Hủy"
            disabled={updatingId === user._id}
          >
            <Button
              type={user.isBlocked ? 'default' : 'primary'}
              danger={!user.isBlocked}
              loading={updatingId === user._id}
            >
              {updatingId === user._id ? 'Đang xử lý...' : actionText}
            </Button>
          </Popconfirm>
        );
      },
    },
  ];

  return (
    <Card
      title="Danh sách khách hàng"
      bordered={false}
      style={{ margin: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.05)', borderRadius: 8 }}
    >
      <Table
        rowKey="_id"
        columns={columns}
        dataSource={users}
        loading={loading}
        pagination={{ pageSize: 8 }}
      />
    </Card>
  );
};

export default Customers;
