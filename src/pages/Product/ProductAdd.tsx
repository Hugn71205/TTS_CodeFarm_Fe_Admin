import { Button, Form, Input, Select } from 'antd';

const { Option } = Select;

const ProductAdd = () => {
  return (
    <div className="bg-white p-6 rounded shadow max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Thêm sản phẩm mới</h2>

      <Form layout="vertical">
        <Form.Item label="Tên sản phẩm" name="name">
          <Input placeholder="Nhập tên sản phẩm" />
        </Form.Item>

        <Form.Item label="Ảnh sản phẩm" name="image">
          <Input placeholder="Nhập ảnh sản phẩm" />
        </Form.Item>

        <Form.Item label="Giới tính" name="gender">
          <Input placeholder="Nhập giới tính phù hợp với sản phẩm" />
        </Form.Item>

        <Form.Item label="Danh mục" name="category">
          <Select placeholder="Chọn danh mục">
            <Option value="Rau xanh">Rau xanh</Option>
            <Option value="Củ quả">Củ quả</Option>
            <Option value="Rau củ">Rau củ</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Thương hiệu" name="brand">
          <Input placeholder="Nhập thương hiệu" />
        </Form.Item>

        <Form.Item>
          <div className="flex gap-3">
            <Button type="primary">Thêm sản phẩm</Button>
            <Button>Huỷ</Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProductAdd;