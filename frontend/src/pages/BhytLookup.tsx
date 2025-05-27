import React, { useState } from 'react';
import {
  Card,
  Form,
  Input,
  Button,
  Typography,
  Row,
  Col,
  Descriptions,
  message,
  Spin,
  Empty,
  Alert,
  Space,
  Badge,
  Tooltip
} from 'antd';
import {
  SearchOutlined,
  IdcardOutlined,
  UserOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
  CreditCardOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  InfoCircleOutlined,
  MedicineBoxOutlined
} from '@ant-design/icons';
import { bhytService } from '../services/bhytService';
import type { BhytInfo } from '../services/bhytService';
import './BhytLookup.css';

const { Title, Paragraph, Text } = Typography;

const BhytLookup: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [bhytInfo, setBhytInfo] = useState<BhytInfo | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSubmit = async (values: { maSoBHXH: string }) => {
    setLoading(true);
    setHasSearched(true);
    setBhytInfo(null);

    try {
      const response = await bhytService.lookupBhyt(values.maSoBHXH);

      if (response.success && response.data) {
        setBhytInfo(response.data);
        message.success('Tra cứu thông tin BHYT thành công!');
      } else {
        message.error(response.message || 'Không tìm thấy thông tin BHYT');
      }
    } catch (error) {
      message.error('Có lỗi xảy ra khi tra cứu thông tin BHYT');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('vi-VN');
    } catch {
      return dateString;
    }
  };

  const getStatusColor = (status: string) => {
    if (status?.toLowerCase().includes('hiệu lực') || status?.toLowerCase().includes('active')) {
      return 'success';
    }
    return 'error';
  };

  const getStatusIcon = (status: string) => {
    if (status?.toLowerCase().includes('hiệu lực') || status?.toLowerCase().includes('active')) {
      return <CheckCircleOutlined style={{ color: '#52c41a' }} />;
    }
    return <CloseCircleOutlined style={{ color: '#ff4d4f' }} />;
  };

  return (
    <div className="bhyt-lookup-container">
      <div className="bhyt-lookup-header">
        <Space align="center" size={16}>
          <Badge count={<MedicineBoxOutlined style={{ color: '#1890ff' }} />}>
            <Title level={2} className="bhyt-lookup-title">
              Tra cứu thông tin BHYT
            </Title>
          </Badge>
        </Space>
        <Paragraph type="secondary" className="bhyt-lookup-description">
          Nhập mã số BHXH để tra cứu thông tin thẻ bảo hiểm y tế
        </Paragraph>
      </div>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={8}>
          <Card 
            title={
              <Space>
                <IdcardOutlined style={{ color: '#1890ff' }} />
                <span>Thông tin tra cứu</span>
              </Space>
            }
            className="bhyt-form-card"
          >
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              autoComplete="off"
            >
              <Form.Item
                label={
                  <Space>
                    <span>Mã số BHXH</span>
                    <Tooltip title="Mã số BHXH gồm 10 chữ số">
                      <InfoCircleOutlined style={{ color: '#1890ff' }} />
                    </Tooltip>
                  </Space>
                }
                name="maSoBHXH"
                rules={[
                  { required: true, message: 'Vui lòng nhập mã số BHXH!' },
                  {
                    pattern: /^\d{10}$/,
                    message: 'Mã số BHXH phải có đúng 10 chữ số!'
                  }
                ]}
              >
                <Input
                  placeholder="Nhập mã số BHXH (10 chữ số)"
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  size="large"
                  maxLength={10}
                  className="bhyt-input"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  icon={<SearchOutlined />}
                  size="large"
                  block
                  className="bhyt-search-button"
                >
                  Tra cứu
                </Button>
              </Form.Item>
            </Form>

            <Alert
              message="Lưu ý quan trọng"
              description={
                <ul className="bhyt-alert-list">
                  <li>Mã số BHXH gồm 10 chữ số</li>
                  <li>Kiểm tra kỹ thông tin trước khi tra cứu</li>
                  <li>Đảm bảo nhập đúng định dạng số</li>
                </ul>
              }
              type="info"
              showIcon
              className="bhyt-info-alert"
            />
          </Card>
        </Col>

        <Col xs={24} lg={16}>
          <Card 
            title={
              <Space>
                <MedicineBoxOutlined style={{ color: '#1890ff' }} />
                <span>Kết quả tra cứu</span>
              </Space>
            }
            className="bhyt-result-card"
          >
            <Spin spinning={loading} className="bhyt-loading-overlay">
              {bhytInfo ? (
                <div className="bhyt-result-content">
                  <div className="bhyt-status-header">
                    <Badge 
                      status={getStatusColor(bhytInfo.trangThai) as "success" | "error"}
                      text={
                        <Text strong className={`bhyt-status-text ${getStatusColor(bhytInfo.trangThai)}`}>
                          {bhytInfo.trangThai}
                        </Text>
                      }
                    />
                  </div>

                  <Descriptions
                    bordered
                    column={{ xs: 1, sm: 2 }}
                    size="middle"
                    className="bhyt-descriptions"
                  >
                    <Descriptions.Item
                      label={<Space><UserOutlined /> Họ và tên</Space>}
                      span={2}
                    >
                      <Text strong className="bhyt-primary-info">
                        {bhytInfo.hoTen || 'N/A'}
                      </Text>
                    </Descriptions.Item>

                    <Descriptions.Item 
                      label={<Space><IdcardOutlined /> Mã số BHXH</Space>}
                    >
                      {bhytInfo.maSoBHXH || 'N/A'}
                    </Descriptions.Item>

                    <Descriptions.Item 
                      label={<Space><CreditCardOutlined /> Mã thẻ</Space>}
                    >
                      {bhytInfo.maThe || 'N/A'}
                    </Descriptions.Item>

                    <Descriptions.Item 
                      label={<Space><CalendarOutlined /> Ngày sinh</Space>}
                    >
                      {formatDate(bhytInfo.ngaySinh)}
                    </Descriptions.Item>

                    <Descriptions.Item label="Giới tính">
                      {bhytInfo.gioiTinh || 'N/A'}
                    </Descriptions.Item>

                    <Descriptions.Item
                      label={<Space><EnvironmentOutlined /> Địa chỉ</Space>}
                      span={2}
                    >
                      {bhytInfo.diaChi || 'N/A'}
                    </Descriptions.Item>

                    <Descriptions.Item label="Giá trị từ ngày">
                      <Text type="success">{formatDate(bhytInfo.gtTheTu)}</Text>
                    </Descriptions.Item>

                    <Descriptions.Item label="Giá trị đến ngày">
                      <Text type="warning">{formatDate(bhytInfo.gtTheDen)}</Text>
                    </Descriptions.Item>

                    <Descriptions.Item
                      label="Nơi đăng ký KCB"
                      span={2}
                    >
                      <Text className="bhyt-hospital-info">
                        {bhytInfo.noiDKKCB || 'N/A'}
                      </Text>
                    </Descriptions.Item>

                    <Descriptions.Item label="Mức hưởng">
                      <Badge 
                        color="#1890ff"
                        text={bhytInfo.mucHuong || 'N/A'} 
                      />
                    </Descriptions.Item>
                  </Descriptions>
                </div>
              ) : hasSearched && !loading ? (
                <Empty
                  image={<IdcardOutlined className="bhyt-empty-icon" />}
                  description={
                    <Text type="secondary\" className="bhyt-empty-text">
                      Không tìm thấy thông tin BHYT
                    </Text>
                  }
                >
                  <Button type="primary" onClick={() => form.resetFields()}>
                    Thử lại
                  </Button>
                </Empty>
              ) : (
                <Empty
                  image={<SearchOutlined className="bhyt-empty-icon" />}
                  description={
                    <Text type="secondary\" className="bhyt-empty-text">
                      Nhập mã số BHXH để bắt đầu tra cứu
                    </Text>
                  }
                />
              )}
            </Spin>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default BhytLookup;