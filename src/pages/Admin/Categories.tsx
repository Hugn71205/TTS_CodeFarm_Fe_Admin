/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { Table, Spin, message, Popconfirm, Button } from "antd";
import axios from "axios";
import type { Category } from "../../interface/type";
import { useNavigate } from "react-router-dom";

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8888/categories");
      const data = response.data?.data?.data || [];
      setCategories(data);
    } catch (error) {
      message.error("Lấy danh sách danh mục thất bại");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await axios.delete(`http://localhost:8888/categories/${id}`);
      message.success("Xóa danh mục thành công");
      fetchCategories(); // gọi lại để load lại danh sách
    } catch (error) {
      message.error("Xóa danh mục thất bại");
    }
    setDeletingId(null);
  };

  const columns = [
    {
      title: "STT",
      key: "index",
      width: 60,
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: "Tên danh mục",
      dataIndex: "name",
      key: "name",
      width: 200,
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date?: string) => (date ? new Date(date).toLocaleString() : "-"),
      width: 180,
      sorter: (a: Category, b: Category) => {
        return (
          (new Date(a.createdAt || "").getTime() || 0) -
          (new Date(b.createdAt || "").getTime() || 0)
        );
      },
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (date?: string) => (date ? new Date(date).toLocaleString() : "-"),
      width: 180,
      sorter: (a: Category, b: Category) => {
        return (
          (new Date(a.updatedAt || "").getTime() || 0) -
          (new Date(b.updatedAt || "").getTime() || 0)
        );
      },
    },
    {
      title: "Hành Động",
      key: "action",
      render: (record: any) => (
        <>
          <Button
            type="link"
            onClick={() => navigate(`/categories/update/${record._id}`)}
            style={{ marginRight: 8 }}
          >
            Sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa sản phẩm này?"
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
      {loading ? (
        <Spin size="large" />
      ) : (
        <Table
          rowKey="_id"
          dataSource={categories}
          columns={columns}
          pagination={{ pageSize: 10 }}
        />
      )}
    </div>
  );
};

export default Categories;
