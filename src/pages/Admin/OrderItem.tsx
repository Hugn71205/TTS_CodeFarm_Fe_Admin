import React, { useEffect, useState } from "react";
import { Table, Card, message, Image } from "antd";
import axios from "axios";
import { useParams } from "react-router-dom";

interface OrderItem {
  _id?: string;
  order_id: string;
  product_variant_id: any; 
  product_name: string;
  image?: string;
  price: number;
  quantity: number;
  total?: number;
  createdAt?: string;
  updatedAt?: string;
}

const OrderItemsPage: React.FC = () => {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { orderId } = useParams<{ orderId: string }>();

  const fetchOrderItems = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:8888/orders-item/order/${orderId}`
      );
      console.log(res.data)
      const data = Array.isArray(res.data) ? res.data : [];
      setOrderItems(data);
    } catch (error) {
      message.error("Không thể tải danh sách order items");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  console.log("orderId:", orderId); // Kiểm tra giá trị
  if (orderId) fetchOrderItems();
}, [orderId]);


  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "product_name",
      key: "product_name",
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
      render: (img: string) =>
        img ? <Image width={60} src={img} /> : "Không có",
    },
    {
      title: "Giá",
      key: "price",
      render: (_: any, record: OrderItem) => {
        const price =
          typeof record.product_variant_id === "object" &&
          record.product_variant_id?.price?.$numberDecimal
            ? parseFloat(record.product_variant_id.price.$numberDecimal)
            : record.price;

        return price?.toLocaleString("vi-VN") + "₫";
      },
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Tổng",
      key: "total",
      render: (_: any, record: OrderItem) =>
        `${(record.price * record.quantity).toLocaleString("vi-VN")}₫`,
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date?: string) =>
        date ? new Date(date).toLocaleDateString("vi-VN") : "Không rõ",
    },
  ];

  return (
    <Card title="Danh sách Order Items" style={{ margin: 24, borderRadius: 8 }}>
      <Table
        rowKey="_id"
        columns={columns}
        dataSource={Array.isArray(orderItems) ? orderItems : []}
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
    </Card>
  );
};

export default OrderItemsPage;
