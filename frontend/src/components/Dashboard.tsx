import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Statistic, Button, Typography, Space, Spin } from 'antd';
import {
  UserOutlined,
  CloudOutlined,
  ReloadOutlined,
  DashboardOutlined,
  TrophyOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

const Dashboard: React.FC = () => {
  const [weather, setWeather] = useState<WeatherForecast[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/weatherforecast', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setWeather(data);
      } else {
        console.error('Failed to fetch weather data');
      }
    } catch (error) {
      console.error('Error fetching weather:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const getWeatherIcon = (summary: string) => {
    const icons: { [key: string]: string } = {
      'Freezing': '🥶',
      'Bracing': '❄️',
      'Chilly': '🌨️',
      'Cool': '🌤️',
      'Mild': '⛅',
      'Warm': '☀️',
      'Balmy': '🌞',
      'Hot': '🔥',
      'Sweltering': '🌡️',
      'Scorching': '🌋'
    };
    return icons[summary] || '🌤️';
  };

  return (
    <div style={{ padding: '0' }}>
      <div style={{ marginBottom: '24px' }}>
        <Title level={2} style={{ margin: 0 }}>Dashboard</Title>
        <Paragraph type="secondary" style={{ margin: '8px 0 0 0' }}>
          Tổng quan về hệ thống và dữ liệu
        </Paragraph>
      </div>

      {/* Statistics Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Tổng người dùng"
              value={1128}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Hoạt động hôm nay"
              value={93}
              suffix="/ 100"
              prefix={<DashboardOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Thành tích"
              value={98.5}
              precision={1}
              suffix="%"
              prefix={<TrophyOutlined />}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Thời gian hoạt động"
              value={24}
              suffix="giờ"
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Weather Section */}
      <Card
        title={
          <Space>
            <CloudOutlined />
            <span>Dự báo thời tiết</span>
          </Space>
        }
        extra={
          <Button
            type="primary"
            icon={<ReloadOutlined />}
            onClick={fetchWeather}
            loading={loading}
          >
            Làm mới
          </Button>
        }
      >
        <Spin spinning={loading}>
          {weather.length > 0 ? (
            <Row gutter={[16, 16]}>
              {weather.slice(0, 3).map((forecast, index) => (
                <Col xs={24} sm={8} key={index}>
                  <Card
                    size="small"
                    style={{ textAlign: 'center' }}
                    bodyStyle={{ padding: '16px' }}
                  >
                    <div style={{ fontSize: '32px', marginBottom: '8px' }}>
                      {getWeatherIcon(forecast.summary)}
                    </div>
                    <Text strong style={{ display: 'block', marginBottom: '4px' }}>
                      {new Date(forecast.date).toLocaleDateString('vi-VN', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </Text>
                    <Text style={{ fontSize: '18px', fontWeight: 'bold', color: '#1890ff' }}>
                      {forecast.temperatureC}°C
                    </Text>
                    <br />
                    <Text type="secondary" style={{ fontSize: '12px' }}>
                      {forecast.summary}
                    </Text>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <CloudOutlined style={{ fontSize: '48px', color: '#d9d9d9', marginBottom: '16px' }} />
              <br />
              <Text type="secondary">Chưa có dữ liệu thời tiết</Text>
            </div>
          )}
        </Spin>
      </Card>
    </div>
  );
};

export default Dashboard;
