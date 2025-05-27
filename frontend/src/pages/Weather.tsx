import React, { useState, useEffect } from 'react';
import { Card, Button, Row, Col, Typography, Spin, Empty, message } from 'antd';
import { ReloadOutlined, CloudOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

const Weather: React.FC = () => {
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
        message.success('Cập nhật dữ liệu thời tiết thành công!');
      } else {
        message.error('Không thể tải dữ liệu thời tiết');
      }
    } catch (error) {
      console.error('Error fetching weather:', error);
      message.error('Lỗi kết nối mạng');
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

  const getWeatherColor = (summary: string) => {
    const colors: { [key: string]: string } = {
      'Freezing': '#1890ff',
      'Bracing': '#52c41a',
      'Chilly': '#13c2c2',
      'Cool': '#1890ff',
      'Mild': '#faad14',
      'Warm': '#fa8c16',
      'Balmy': '#fa541c',
      'Hot': '#f5222d',
      'Sweltering': '#eb2f96',
      'Scorching': '#722ed1'
    };
    return colors[summary] || '#1890ff';
  };

  return (
    <div style={{ padding: '0' }}>
      <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <Title level={2} style={{ margin: 0 }}>Dự báo thời tiết</Title>
          <Paragraph type="secondary" style={{ margin: '8px 0 0 0' }}>
            Thông tin thời tiết 5 ngày tới
          </Paragraph>
        </div>
        <Button
          type="primary"
          icon={<ReloadOutlined />}
          onClick={fetchWeather}
          loading={loading}
          size="large"
        >
          Làm mới
        </Button>
      </div>

      <Spin spinning={loading}>
        {weather.length > 0 ? (
          <Row gutter={[16, 16]}>
            {weather.map((forecast, index) => (
              <Col xs={24} sm={12} md={8} lg={6} xl={4} key={index}>
                <Card
                  hoverable
                  style={{
                    textAlign: 'center',
                    borderColor: getWeatherColor(forecast.summary),
                    borderWidth: '2px'
                  }}
                  bodyStyle={{ padding: '20px' }}
                >
                  <div style={{ fontSize: '48px', marginBottom: '12px' }}>
                    {getWeatherIcon(forecast.summary)}
                  </div>
                  <Text strong style={{
                    display: 'block',
                    marginBottom: '8px',
                    color: '#262626'
                  }}>
                    {new Date(forecast.date).toLocaleDateString('vi-VN', {
                      weekday: 'long',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </Text>
                  <div style={{ marginBottom: '8px' }}>
                    <Text style={{
                      fontSize: '24px',
                      fontWeight: 'bold',
                      color: getWeatherColor(forecast.summary)
                    }}>
                      {forecast.temperatureC}°C
                    </Text>
                    <br />
                    <Text type="secondary">
                      ({forecast.temperatureF}°F)
                    </Text>
                  </div>
                  <Text type="secondary">{forecast.summary}</Text>
                </Card>
              </Col>
            ))}
          </Row>
        ) : !loading && (
          <Empty
            image={<CloudOutlined style={{ fontSize: '64px', color: '#d9d9d9' }} />}
            description={
              <span>
                Không có dữ liệu thời tiết
              </span>
            }
          >
            <Button type="primary" onClick={fetchWeather}>
              Thử lại
            </Button>
          </Empty>
        )}
      </Spin>
    </div>
  );
};

export default Weather;
