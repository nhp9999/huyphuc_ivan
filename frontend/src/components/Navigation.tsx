import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Layout, Menu, Avatar, Dropdown, Button, Typography } from 'antd';
import {
  DashboardOutlined,
  UserOutlined,
  CloudOutlined,
  SettingOutlined,
  InfoCircleOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  RocketOutlined,
  IdcardOutlined
} from '@ant-design/icons';
import { useAuth } from '../contexts/AuthContext';

const { Sider } = Layout;
const { Text } = Typography;

interface NavigationProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const Navigation: React.FC<NavigationProps> = ({ collapsed, setCollapsed }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: '/dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
    },
    {
      key: '/bhyt-lookup',
      icon: <IdcardOutlined />,
      label: 'Tra cứu BHYT',
    },
    {
      key: '/profile',
      icon: <UserOutlined />,
      label: 'Hồ sơ',
    },
    {
      key: '/weather',
      icon: <CloudOutlined />,
      label: 'Thời tiết',
    },
    {
      key: '/settings',
      icon: <SettingOutlined />,
      label: 'Cài đặt',
    },
    {
      key: '/about',
      icon: <InfoCircleOutlined />,
      label: 'Giới thiệu',
    },
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);
  };

  const userMenuItems = [
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Đăng xuất',
      onClick: logout,
    },
  ];

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        zIndex: 1000,
      }}
      theme="light"
      width={250}
      collapsedWidth={80}
    >
      {/* Header with Logo and Collapse Button */}
      <div style={{
        padding: '16px',
        borderBottom: '1px solid #f0f0f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <RocketOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
          {!collapsed && (
            <Text strong style={{ fontSize: '18px', color: '#1890ff' }}>
              MyApp
            </Text>
          )}
        </div>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: '16px',
            width: 32,
            height: 32,
          }}
        />
      </div>

      {/* Menu */}
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        items={menuItems}
        onClick={handleMenuClick}
        style={{
          borderRight: 0,
          marginTop: '8px'
        }}
      />

      {/* User Info Footer */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '16px',
        borderTop: '1px solid #f0f0f0',
        backgroundColor: '#fafafa'
      }}>
        <Dropdown
          menu={{ items: userMenuItems }}
          placement="topLeft"
          trigger={['click']}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            padding: '8px',
            borderRadius: '6px',
            transition: 'background-color 0.3s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#f0f0f0';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
          >
            <Avatar size="small" icon={<UserOutlined />}>
              {user?.username?.charAt(0).toUpperCase()}
            </Avatar>
            {!collapsed && (
              <div style={{ flex: 1, minWidth: 0 }}>
                <Text strong style={{ fontSize: '14px', display: 'block' }}>
                  {user?.username}
                </Text>
                <Text type="secondary" style={{ fontSize: '12px', display: 'block' }}>
                  {user?.email}
                </Text>
              </div>
            )}
          </div>
        </Dropdown>
      </div>
    </Sider>
  );
};

export default Navigation;
