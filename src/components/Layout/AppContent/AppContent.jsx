import { Layout } from "antd";
// import s from './AppContent.module.css';

const contentStyle = {
  textAlign: 'center',
  minHeight: 'calc(100vh - 60px)',
  color: '#fff',
  backgroundColor: '#001529',
  padding: '1rem',
};

export const AppContent = () => {
  return (
    <Layout.Content style={contentStyle}>AppContent</Layout.Content>
  );
};

export default AppContent;