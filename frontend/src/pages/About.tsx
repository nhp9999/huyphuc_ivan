import React from 'react';
import { Card, Row, Col, Typography, Space, Tag, Divider } from 'antd';
import {
  RocketOutlined,
  MailOutlined,
  GlobalOutlined,
  PhoneOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

const About: React.FC = () => {
  const techStack = [
    { name: 'React 18', description: 'Frontend framework', icon: '⚛️' },
    { name: 'TypeScript', description: 'Type-safe JavaScript', icon: '📘' },
    { name: 'Vite', description: 'Build tool', icon: '⚡' },
    { name: '.NET 8', description: 'Backend API', icon: '🔷' },
    { name: 'JWT', description: 'Authentication', icon: '🔐' },
    { name: 'Ant Design', description: 'UI Components', icon: '🎨' }
  ];

  const features = [
    'Xác thực JWT an toàn',
    'Responsive design',
    'API thời tiết',
    'Cài đặt tùy chỉnh',
    'Quản lý hồ sơ',
    'Navigation hiện đại'
  ];

  return (
    <div style={{ padding: '0' }}>
      <div style={{ marginBottom: '24px' }}>
        <Title level={2} style={{ margin: 0 }}>Giới thiệu</Title>
        <Paragraph type="secondary" style={{ margin: '8px 0 0 0' }}>
          Thông tin về ứng dụng và nhóm phát triển
        </Paragraph>
      </div>

      <Card style={{ marginBottom: '24px', textAlign: 'center' }} bodyStyle={{ padding: '40px' }}>
        <RocketOutlined style={{ fontSize: '64px', color: '#1890ff', marginBottom: '16px' }} />
        <Title level={3} style={{ margin: '16px 0 8px 0' }}>React + .NET App</Title>
        <Tag color="blue" style={{ marginBottom: '16px' }}>Phiên bản 1.0.0</Tag>
        <Paragraph style={{ fontSize: '16px', maxWidth: '600px', margin: '0 auto' }}>
          Ứng dụng web hiện đại được xây dựng với React TypeScript và .NET Web API,
          cung cấp trải nghiệm người dùng mượt mà và hiệu suất cao.
        </Paragraph>
      </Card>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={12}>
          <Card title="Công nghệ sử dụng" style={{ height: '100%' }}>
            <Row gutter={[16, 16]}>
              {techStack.map((tech, index) => (
                <Col xs={24} sm={12} key={index}>
                  <Card
                    size="small"
                    hoverable
                    style={{ textAlign: 'center' }}
                    bodyStyle={{ padding: '16px' }}
                  >
                    <div style={{ fontSize: '32px', marginBottom: '8px' }}>
                      {tech.icon}
                    </div>
                    <Text strong style={{ display: 'block', marginBottom: '4px' }}>
                      {tech.name}
                    </Text>
                    <Text type="secondary" style={{ fontSize: '12px' }}>
                      {tech.description}
                    </Text>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title="Tính năng chính" style={{ height: '100%' }}>
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              {features.map((feature, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <CheckCircleOutlined style={{ color: '#52c41a', fontSize: '16px' }} />
                  <Text>{feature}</Text>
                </div>
              ))}
            </Space>
          </Card>
        </Col>
      </Row>

      <Card title="Liên hệ" style={{ marginTop: '24px' }}>
        <Paragraph style={{ marginBottom: '20px' }}>
          Nếu bạn có câu hỏi hoặc góp ý, vui lòng liên hệ:
        </Paragraph>
        <Row gutter={[24, 16]}>
          <Col xs={24} sm={8}>
            <Space>
              <MailOutlined style={{ color: '#1890ff' }} />
              <Text>support@myapp.com</Text>
            </Space>
          </Col>
          <Col xs={24} sm={8}>
            <Space>
              <GlobalOutlined style={{ color: '#1890ff' }} />
              <Text>www.myapp.com</Text>
            </Space>
          </Col>
          <Col xs={24} sm={8}>
            <Space>
              <PhoneOutlined style={{ color: '#1890ff' }} />
              <Text>+84 123 456 789</Text>
            </Space>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default About;
