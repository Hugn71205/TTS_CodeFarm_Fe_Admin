import { Button, Form, Input } from 'antd';


const BrandAdd = () => {
  return (
    <div className="bg-white p-6 rounded shadow max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Thêm thương hiệu mới</h2>

      <Form layout="vertical">
        <Form.Item label="Tên thương hiệu" name="name">
          <Input placeholder="Nhập tên thương hiệu" />
        </Form.Item>

        <Form.Item label="Xuất xứ" name="origin">
          <Input placeholder="Nhập thương hiệu" />
        </Form.Item>

        <Form.Item label="Logo" name="logo">
          <Input placeholder="Nhập link logo" />
        </Form.Item>

        <Form.Item>
          <div className="flex gap-3">
            <Button type="primary">Thêm thương hiệu</Button>
            <Button>Huỷ</Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default BrandAdd;