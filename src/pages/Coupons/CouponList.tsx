import { Button, Popconfirm, Table, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../utils/axios.util';

const CouponList: React.FC = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchCoupons = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get('/coupons');
      setCoupons(res.data);
    } catch (err) {
      message.error('Không thể tải danh sách mã giảm giá');
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    try {
      await axiosInstance.delete(`/coupons/${id}`);
      message.success('Xóa thành công');
      fetchCoupons();
    } catch (err) {
      message.error('Xóa thất bại');
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const columns = [
    { title: 'Mã', dataIndex: 'code' },
    { title: 'Loại', dataIndex: 'discount_type' },
    {
      title: 'Giá trị',
      dataIndex: 'discount_value',
      render: (value: any) => parseFloat(value).toLocaleString(),
    },
    {
      title: 'Giới hạn',
      dataIndex: 'usage_limit',
      render: (value: number, record: any) =>
        `${record.used_count}/${value}`,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'is_active',
      render: (active: boolean) =>
        active ? 'Đang hoạt động' : 'Ngừng hoạt động',
    },
    {
      title: 'Thao tác',
      render: (record: any) => (
        <>
          <Button type="link" onClick={() => navigate(`/coupons/edit/${record._id}`)}>
            Sửa
          </Button>
          <Popconfirm title="Xác nhận xóa?" onConfirm={() => handleDelete(record._id)}>
            <Button type="link" danger>
              Xóa
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h2>Danh sách mã giảm giá</h2>
      <Button type="primary" onClick={() => navigate('/coupons/add')} style={{ marginBottom: 16 }}>
        Thêm mã mới
      </Button>
      <Table rowKey="_id" loading={loading} dataSource={coupons} columns={columns} />
    </div>
  );
};

export default CouponList;
