import React, { useState } from 'react';
import { Card, Switch, Select, Button, Space, Typography, Divider, Row, Col, message } from 'antd';
import {
  BellOutlined,
  EyeOutlined,
  GlobalOutlined,
  SyncOutlined,
  SaveOutlined,
  UndoOutlined
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;
const { Option } = Select;

const Settings: React.FC = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    language: 'vi',
    autoRefresh: true,
    refreshInterval: 30
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSelectChange = (key: keyof typeof settings, value: string | number) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    message.success('Cài đặt đã được lưu thành công!');
  };

  const handleReset = () => {
    setSettings({
      notifications: true,
      darkMode: false,
      language: 'vi',
      autoRefresh: true,
      refreshInterval: 30
    });
    message.info('Đã khôi phục cài đặt mặc định');
  };

  return (
    <div style={{ padding: '0' }}>
      <div style={{ marginBottom: '24px' }}>
        <Title level={2} style={{ margin: 0 }}>Cài đặt</Title>
        <Paragraph type="secondary" style={{ margin: '8px 0 0 0' }}>
          Tùy chỉnh ứng dụng theo ý muốn
        </Paragraph>
      </div>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={12}>
          <Card
            title={
              <Space>
                <EyeOutlined />
                <span>Giao diện</span>
              </Space>
            }
            style={{ marginBottom: '24px' }}
          >
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <Text strong>Chế độ tối</Text>
                  <br />
                  <Text type="secondary" style={{ fontSize: '12px' }}>
                    Sử dụng giao diện tối
                  </Text>
                </div>
                <Switch
                  checked={settings.darkMode}
                  onChange={() => handleToggle('darkMode')}
                />
              </div>
            </div>

            <Divider style={{ margin: '16px 0' }} />

            <div>
              <div style={{ marginBottom: '8px' }}>
                <Text strong>Ngôn ngữ</Text>
                <br />
                <Text type="secondary" style={{ fontSize: '12px' }}>
                  Chọn ngôn ngữ hiển thị
                </Text>
              </div>
              <Select
                value={settings.language}
                onChange={(value) => handleSelectChange('language', value)}
                style={{ width: '100%' }}
                suffixIcon={<GlobalOutlined />}
              >
                <Option value="vi">Tiếng Việt</Option>
                <Option value="en">English</Option>
              </Select>
            </div>
          </Card>

          <Card
            title={
              <Space>
                <BellOutlined />
                <span>Thông báo</span>
              </Space>
            }
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <Text strong>Bật thông báo</Text>
                <br />
                <Text type="secondary" style={{ fontSize: '12px' }}>
                  Nhận thông báo từ ứng dụng
                </Text>
              </div>
              <Switch
                checked={settings.notifications}
                onChange={() => handleToggle('notifications')}
              />
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card
            title={
              <Space>
                <SyncOutlined />
                <span>Dữ liệu</span>
              </Space>
            }
            style={{ marginBottom: '24px' }}
          >
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <Text strong>Tự động làm mới</Text>
                  <br />
                  <Text type="secondary" style={{ fontSize: '12px' }}>
                    Tự động cập nhật dữ liệu
                  </Text>
                </div>
                <Switch
                  checked={settings.autoRefresh}
                  onChange={() => handleToggle('autoRefresh')}
                />
              </div>
            </div>

            {settings.autoRefresh && (
              <>
                <Divider style={{ margin: '16px 0' }} />
                <div>
                  <div style={{ marginBottom: '8px' }}>
                    <Text strong>Khoảng thời gian làm mới</Text>
                    <br />
                    <Text type="secondary" style={{ fontSize: '12px' }}>
                      Số giây giữa các lần cập nhật
                    </Text>
                  </div>
                  <Select
                    value={settings.refreshInterval}
                    onChange={(value) => handleSelectChange('refreshInterval', value)}
                    style={{ width: '100%' }}
                  >
                    <Option value={15}>15 giây</Option>
                    <Option value={30}>30 giây</Option>
                    <Option value={60}>1 phút</Option>
                    <Option value={300}>5 phút</Option>
                  </Select>
                </div>
              </>
            )}
          </Card>
        </Col>
      </Row>

      <Card style={{ marginTop: '24px' }}>
        <Space size="middle">
          <Button
            type="primary"
            icon={<SaveOutlined />}
            size="large"
            onClick={handleSave}
          >
            Lưu cài đặt
          </Button>
          <Button
            icon={<UndoOutlined />}
            size="large"
            onClick={handleReset}
          >
            Khôi phục mặc định
          </Button>
        </Space>
      </Card>
    </div>
  );
};

export default Settings;
