import React from 'react';
import { Card, Avatar, Descriptions, Button, Space, Typography, Tag, Upload, message } from 'antd';
import { UserOutlined, EditOutlined, LockOutlined, DeleteOutlined, CameraOutlined } from '@ant-design/icons';
import { useAuth } from '../contexts/AuthContext';

const { Title, Paragraph } = Typography;

const Profile: React.FC = () => {
  const { user } = useAuth();

  const handleAvatarChange = (info: any) => {
    if (info.file.status === 'uploading') {
      message.loading('Đang tải ảnh lên...');
      return;
    }
    if (info.file.status === 'done') {
      message.success('Cập nhật ảnh đại diện thành công!');
    }
  };

  const beforeUpload = (file: File) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('Chỉ hỗ trợ file JPG/PNG!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Ảnh phải nhỏ hơn 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  return (
    <div style={{ padding: '0' }}>
      <div style={{ marginBottom: '24px' }}>
        <Title level={2} style={{ margin: 0 }}>Hồ sơ cá nhân</Title>
        <Paragraph type="secondary" style={{ margin: '8px 0 0 0' }}>
          Quản lý thông tin tài khoản của bạn
        </Paragraph>
      </div>

      <Card
        style={{ marginBottom: '24px' }}
        bodyStyle={{ padding: '32px' }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '32px' }}>
          <div style={{ textAlign: 'center' }}>
            <Avatar
              size={120}
              icon={<UserOutlined />}
              style={{ marginBottom: '16px', backgroundColor: '#1890ff' }}
            >
              {user?.username?.charAt(0).toUpperCase()}
            </Avatar>
            <Upload
              name="avatar"
              listType="picture"
              showUploadList={false}
              beforeUpload={beforeUpload}
              onChange={handleAvatarChange}
            >
              <Button icon={<CameraOutlined />} type="dashed" size="small">
                Đổi ảnh đại diện
              </Button>
            </Upload>
          </div>

          <div style={{ flex: 1 }}>
            <Descriptions
              title="Thông tin cá nhân"
              column={1}
              labelStyle={{ fontWeight: 600, width: '150px' }}
              contentStyle={{ color: '#262626' }}
            >
              <Descriptions.Item label="Tên đăng nhập">
                {user?.username}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                {user?.email}
              </Descriptions.Item>
              <Descriptions.Item label="ID người dùng">
                {user?.id}
              </Descriptions.Item>
              <Descriptions.Item label="Trạng thái">
                <Tag color="green">Đang hoạt động</Tag>
              </Descriptions.Item>
            </Descriptions>
          </div>
        </div>
      </Card>

      <Card title="Hành động" bodyStyle={{ padding: '24px' }}>
        <Space size="middle" wrap>
          <Button
            type="primary"
            icon={<EditOutlined />}
            size="large"
          >
            Chỉnh sửa thông tin
          </Button>
          <Button
            icon={<LockOutlined />}
            size="large"
          >
            Đổi mật khẩu
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            size="large"
          >
            Xóa tài khoản
          </Button>
        </Space>
      </Card>
    </div>
  );
};

export default Profile;
