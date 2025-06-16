import React, { useEffect, useState } from "react";
import { Form, Input, Button, message, Spin } from "antd";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../utils/axios.util";

const UpdateBrand: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [loadingBrand, setLoadingBrand] = useState(true);

  const fetchBrand = async () => {
    setLoadingBrand(true);
    try {
      const res = await axiosInstance.get(`brands/${id}`);
      const brand = res.data;
      form.setFieldsValue({
        name: brand.name,
        origin: brand.origin,
        logo: brand.logo,
        description: brand.description,
      });
    } catch {
      message.error("Lấy thông tin thương hiệu thất bại");
    }
    setLoadingBrand(false);
  };

  useEffect(() => {
    if (!id) return;

    fetchBrand();
  }, [id, form]);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      await axiosInstance.put(`/brands/${id}`, values);
      message.success("Cập nhật thương hiệu thành công");
      navigate("/brands");
    } catch {
      message.error("Cập nhật thương hiệu thất bại");
    }
    setLoading(false);
  };

  return (
    <>
      {loadingBrand ? (
        <div style={{ textAlign: "center", marginTop: 50 }}>
          <Spin size="large" />
        </div>
      ) : (
        <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
          <h2>Cập nhật thương hiệu</h2>
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Tên thương hiệu"
              name="name"
              rules={[
                { required: true, message: "Vui lòng nhập tên thương hiệu" },
              ]}
            >
              <Input placeholder="Nhập tên thương hiệu" />
            </Form.Item>

            <Form.Item label="Xuất xứ" name="origin">
              <Input placeholder="Nhập xuất xứ thương hiệu" />
            </Form.Item>

            <Form.Item label="Logo (URL)" name="logo">
              <Input placeholder="Nhập URL logo" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                Cập nhật thương hiệu
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
    </>
  );
};

export default UpdateBrand;
