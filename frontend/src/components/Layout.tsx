import React, { useState, useEffect } from 'react';
import { Layout as AntLayout } from 'antd';
import Navigation from './Navigation';

const { Content } = AntLayout;

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (mobile) {
        setCollapsed(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const siderWidth = collapsed ? 80 : 250;

  return (
    <AntLayout style={{ minHeight: '100vh' }}>
      <Navigation collapsed={collapsed} setCollapsed={setCollapsed} />
      <AntLayout
        style={{
          marginLeft: isMobile ? 0 : siderWidth,
          transition: 'margin-left 0.2s'
        }}
      >
        <Content
          style={{
            margin: isMobile ? '16px' : '24px 24px 0',
            overflow: 'initial',
            minHeight: 'calc(100vh - 48px)',
            background: '#fff',
            borderRadius: '8px',
            padding: isMobile ? '16px' : '24px',
          }}
        >
          {children}
        </Content>
      </AntLayout>
    </AntLayout>
  );
};

export default Layout;
