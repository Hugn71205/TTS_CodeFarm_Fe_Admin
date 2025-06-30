import React, { useEffect, useState } from 'react';
import { Table, Tag, Card, message, Select, Space } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

interface Order {
  _id: string;
  customer_info: { username: string; phone_number: string; email: string };
  receiver_info: { username: string; phone_number: string; email: string };
  total_amount: number;
  shipping_address: {
    detail_address: string;
    province: string;
    district: string;
    ward: string;
  };
  status: string;
  is_paid: boolean;
  payment_status: string;
  payment_method: string;
  transaction_id: string;
  shipping_fee: number;
  description: string;
  tracking_number: string;
  user_note: string;
  cancel_by?: string;
  createdAt: string;
  updatedAt: string;
}

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:8888/orders");
      const data = res.data?.data?.orders || [];
      setOrders(data);
    } catch (error) {
      console.error("Lỗi tải đơn hàng:", error);
      message.error("Không thể tải danh sách đơn hàng");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId: string, status: string) => {
    try {
      await axios.patch(`http://localhost:8888/orders/${orderId}`, { status });
      console.log(orderId)
      message.success("Cập nhật trạng thái thành công");
      fetchOrders();
    } catch (err) {
      message.error("Cập nhật trạng thái thất bại");
    }
  };

  const statusOptions = [
    "pending",
    "confirmed",
    "out for delivery",
    "delivered",
    "done",
    "canceled",
  ];

  const paymentMethods = Array.from(
    new Set(orders.map((o) => o.payment_method))
  );

  const columns = [
    {
      title: "Khách hàng",
      dataIndex: ["customer_info", "username"],
      key: "customer",
      filters: Array.from(
        new Set(orders.map((o) => o.customer_info.username))
      ).map((name) => ({
        text: name,
        value: name,
      })),
      onFilter: (value, record) =>
        record.customer_info.username
          .toLowerCase()
          .includes((value as string).toLowerCase()),
    },
    {
      title: "Người nhận",
      dataIndex: ["receiver_info", "username"],
      key: "receiver",
      filters: Array.from(
        new Set(orders.map((o) => o.receiver_info.username))
      ).map((name) => ({
        text: name,
        value: name,
      })),
      onFilter: (value, record) =>
        record.receiver_info.username
          .toLowerCase()
          .includes((value as string).toLowerCase()),
    },
    {
      title: "SĐT người nhận",
      dataIndex: ["receiver_info", "phone_number"],
      key: "receiver_phone",
    },
    {
      title: "Tổng tiền",
      dataIndex: "total_amount",
      key: "total_amount",
      render: (amount: number) => `${amount.toLocaleString()}₫`,
    },
    {
      title: "Phí ship",
      dataIndex: "shipping_fee",
      key: "shipping_fee",
      render: (fee: number) => `${fee.toLocaleString()}₫`,
    },
    {
      title: "Phương thức thanh toán",
      dataIndex: "payment_method",
      key: "payment_method",
      render: (method: string) => method.toUpperCase(),
      filters: paymentMethods.map((method) => ({
        text: method.toUpperCase(),
        value: method,
      })),
      onFilter: (value, record) => record.payment_method === value,
    },
    {
      title: "Trạng thái đơn hàng",
      key: "status",
      render: (_: any, record: Order) => (
        <Select
          size="small"
          value={record.status}
          onChange={(value) => handleStatusChange(record._id, value)}
          style={{ width: 160 }}
        >
          {statusOptions.map((status) => (
            <Option key={status} value={status}>
              {status.toUpperCase()}
            </Option>
          ))}
        </Select>
      ),
      filters: statusOptions.map((status) => ({
        text: status.toUpperCase(),
        value: status,
      })),
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Ghi chú",
      dataIndex: "user_note",
      key: "user_note",
    },
    {
      title: "Người hủy",
      dataIndex: "cancel_by",
      key: "cancel_by",
      render: (val: string) => val?.toUpperCase() || "-",
      filters: Array.from(
        new Set(orders.map((o) => o.cancel_by).filter(Boolean))
      ).map((val) => ({
        text: val.toUpperCase(),
        value: val,
      })),
      onFilter: (value, record) => record.cancel_by === value,
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) =>
        new Date(date).toLocaleDateString('vi-VN', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        }),
    },
    {
    title: 'Actions',
    key: 'actions',
    render: (_: any, record: Order) => (
      <button
        onClick={() => navigate(`/orders-item/order/${record._id}`)}
        style={{
          padding: '4px 8px',
          backgroundColor: '#1890ff',
          color: 'white',
          border: 'none',
          borderRadius: 4,
          cursor: 'pointer',
        }}
      >
        Xem chi tiết
      </button>
    ),
  },
  ];

  return (
    <Card
      title="Danh sách đơn hàng"
      variant="plain"
      style={{
        margin: 24,
        borderRadius: 8,
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      }}
    >
      <Table
        rowKey="_id"
        columns={columns}
        dataSource={orders}
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
    </Card>
  );
};

export default Orders;
