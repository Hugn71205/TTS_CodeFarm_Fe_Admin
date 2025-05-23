import { Button, Form, Input } from 'antd';


const CategoriesEdit = () => {
  return (
    <div className="bg-white p-6 rounded shadow max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Chỉnh sửa thông tin danh mục</h2>

      <Form layout="vertical">
        <Form.Item label="Tên thương hiệu" name="name">
          <Input placeholder="Nhập tên danh mục" />
        </Form.Item>

        <Form.Item label="Mô tả" name="description">
          <Input placeholder="Nhập mô tả" />
        </Form.Item>

        <Form.Item>
          <div className="flex gap-3">
            <Button type="primary">Lưu thay đổi</Button>
            <Button>Huỷ</Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CategoriesEdit;