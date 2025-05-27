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
  Alert
} from 'antd';
import {
  SearchOutlined,
  IdcardOutlined,
  UserOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
  CreditCardOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined
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
        <Title level={2} className="bhyt-lookup-title">
          <IdcardOutlined />
          Tra cứu thông tin BHYT
        </Title>
        <Paragraph type="secondary" className="bhyt-lookup-description">
          Nhập mã số BHXH để tra cứu thông tin thẻ bảo hiểm y tế
        </Paragraph>
      </div>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={8}>
          <Card title="Thông tin tra cứu" className="bhyt-form-card">
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              autoComplete="off"
            >
              <Form.Item
                label="Mã số BHXH"
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
                  prefix={<UserOutlined />}
                  size="large"
                  maxLength={10}
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
              message="Lưu ý"
              description="Mã số BHXH gồm 10 chữ số. Vui lòng kiểm tra kỹ thông tin trước khi tra cứu."
              type="info"
              showIcon
              style={{ marginTop: '16px' }}
            />
          </Card>
        </Col>

        <Col xs={24} lg={16}>
          <Card title="Kết quả tra cứu" className="bhyt-result-card">
            <Spin spinning={loading} className="bhyt-loading-overlay">
              {bhytInfo ? (
                <div>
                  <Descriptions
                    title="Thông tin thẻ BHYT"
                    bordered
                    column={{ xs: 1, sm: 1, md: 2 }}
                    size="middle"
                    className="bhyt-descriptions bhyt-result-appear"
                  >
                    <Descriptions.Item
                      label={<><UserOutlined /> Họ và tên</>}
                      span={2}
                    >
                      <Text strong style={{ fontSize: '16px' }}>
                        {bhytInfo.hoTen || 'N/A'}
                      </Text>
                    </Descriptions.Item>

                    <Descriptions.Item label={<><IdcardOutlined /> Mã số BHXH</>}>
                      {bhytInfo.maSoBHXH || 'N/A'}
                    </Descriptions.Item>

                    <Descriptions.Item label={<><CreditCardOutlined /> Mã thẻ</>}>
                      {bhytInfo.maThe || 'N/A'}
                    </Descriptions.Item>

                    <Descriptions.Item label={<><CalendarOutlined /> Ngày sinh</>}>
                      {formatDate(bhytInfo.ngaySinh)}
                    </Descriptions.Item>

                    <Descriptions.Item label="Giới tính">
                      {bhytInfo.gioiTinh || 'N/A'}
                    </Descriptions.Item>

                    <Descriptions.Item
                      label={<><EnvironmentOutlined /> Địa chỉ</>}
                      span={2}
                    >
                      {bhytInfo.diaChi || 'N/A'}
                    </Descriptions.Item>

                    <Descriptions.Item label="Giá trị từ ngày">
                      {formatDate(bhytInfo.gtTheTu)}
                    </Descriptions.Item>

                    <Descriptions.Item label="Giá trị đến ngày">
                      {formatDate(bhytInfo.gtTheDen)}
                    </Descriptions.Item>

                    <Descriptions.Item
                      label="Nơi đăng ký KCB"
                      span={2}
                    >
                      {bhytInfo.noiDKKCB || 'N/A'}
                    </Descriptions.Item>

                    <Descriptions.Item label="Mức hưởng">
                      {bhytInfo.mucHuong || 'N/A'}
                    </Descriptions.Item>

                    <Descriptions.Item label="Trạng thái">
                      <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {getStatusIcon(bhytInfo.trangThai)}
                        <Text type={getStatusColor(bhytInfo.trangThai) as any}>
                          {bhytInfo.trangThai || 'N/A'}
                        </Text>
                      </span>
                    </Descriptions.Item>
                  </Descriptions>
                </div>
              ) : hasSearched && !loading ? (
                <Empty
                  image={<IdcardOutlined style={{ fontSize: '64px', color: '#d9d9d9' }} />}
                  description="Không tìm thấy thông tin BHYT"
                >
                  <Text type="secondary">
                    Vui lòng kiểm tra lại mã số BHXH và thử lại
                  </Text>
                </Empty>
              ) : (
                <Empty
                  image={<SearchOutlined style={{ fontSize: '64px', color: '#d9d9d9' }} />}
                  description="Nhập mã số BHXH để bắt đầu tra cứu"
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
