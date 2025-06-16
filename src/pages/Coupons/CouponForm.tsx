import { Button, DatePicker, Form, Input, InputNumber, message, Select, Switch, Row, Col, Card } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { axiosInstance } from '../../utils/axios.util';

const { RangePicker } = DatePicker;

const CouponForm: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams();

  const isEdit = !!id;

  const onFinish = async (values: any) => {
    const [start, end] = values.date_range;
    const data = {
      ...values,
      start_date: start.toISOString(), 
      end_date: end.toISOString(), 
    };
    delete data.date_range;

    try {
      if (isEdit) {
        await axiosInstance.put(`/coupons/${id}`, data);
        message.success('Cập nhật thành công');
      } else {
        await axiosInstance.post('/coupons', data);
        message.success('Tạo mã thành công');
      }
      navigate('/coupons');
    } catch {
      message.error('Lưu thất bại');
    }
  };

  const fetchData = async () => {
  try {
    const res = await axiosInstance.get(`/coupons/${id}`);
    form.setFieldsValue({ 
      ...res.data,
      date_range: [dayjs(res.data.start_date), dayjs(res.data.end_date)] 
    });
  } catch {
    message.error('Không tìm thấy mã giảm giá');
  }
};

//...


  useEffect(() => {
    if (isEdit) fetchData();
  }, []);

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '20px' }}>
      <h2 style={{ marginBottom: 24 }}>{isEdit ? 'Sửa' : 'Thêm'} mã giảm giá</h2>

      <Card hoverable style={{ padding: 20, borderRadius: 12, boxShadow: '0 2px 12px rgb(0 0 0 / 0.05)' }}>
        <Form layout="vertical" onFinish={onFinish} form={form}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="code" label="Mã" rules={[{ required: true }]}>
                <Input placeholder="Nhập mã giảm giá…" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="discount_value" label="Giá trị giảm" rules={[{ required: true }]}>
                <InputNumber min={0} style={{ width: '100%' }} placeholder="Nhập số…" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="discount_type" label="Loại" rules={[{ required: true }]}>
                <Select placeholder="Chọn loại">
                    <Select.Option value="percent">Phần trăm</Select.Option>
                    <Select.Option value="amount">Số tiền</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="min_order_amount" label="Valor đơn hàng tối thiểu">
                <InputNumber min={0} style={{ width: '100%' }} placeholder="Nhập số…" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="usage_limit" label="Số lượt sử dụng tối đa">
                <InputNumber min={1} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="is_active" label="Trạng thái" valuePropName="checked">
                <Switch />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="description" label="Mô tả">
            <Input.TextArea rows={4} placeholder="Nhập mô tả…" />
          </Form.Item>

          <Form.Item name="date_range" label="Thời gian hiệu lực" rules={[{ required: true }]}>
            <RangePicker showTime style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              {isEdit ? 'Cập nhật' : 'Tạo'}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default CouponForm;

