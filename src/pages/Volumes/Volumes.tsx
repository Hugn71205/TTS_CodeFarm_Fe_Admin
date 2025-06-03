/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { Table, Spin, message, Popconfirm, Button } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import type { Volume } from "../../interface/type";

const Volumes: React.FC = () => {
  const [volumes, setVolumes] = useState<Volume[]>([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchVolumes = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8888/volumes");
      const data = response.data || [];
      setVolumes(data);
    } catch (error) {
      message.error("Lấy danh sách dung tích thất bại");
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
      message.success("Xóa dung tích thành công");
      fetchVolumes();
    } catch (error) {
      message.error("Xóa dung tích thất bại");
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
      title: "Dung tích",
      dataIndex: "size",
      key: "size",
      width: 200,
    },
    {
      title: "Mô tả",
      dataIndex: "label",
      key: "label",
      ellipsis: true,
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date?: string) => (date ? new Date(date).toLocaleString() : "-"),
      width: 180,
      sorter: (a: Volume, b: Volume) => {
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
      sorter: (a: Volume, b: Volume) => {
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
            onClick={() => navigate(`/volumes/update/${record._id}`)}
            style={{ marginRight: 8 }}
          >
            Sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa dung tích này?"
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
          dataSource={volumes}
          columns={columns}
          pagination={{ pageSize: 10 }}
        />
      )}
    </div>
  );
};

export default Volumes;
