import { Layout } from 'antd';
import AppContent from './components/Layout/AppContent/AppContent.jsx';
import AppHeader from './components/Layout/AppHeader/AppHeader.jsx';
import { AppSider } from './components/Layout/AppSider/AppSider.jsx';

// const layoutStyle = {
//   borderRadius: 8,
//   overflow: 'hidden',
//   width: 'calc(50% - 8px)',
//   maxWidth: 'calc(50% - 8px)',
// };

export default function App() {
  return (
    <Layout>
      <AppHeader />
      <Layout>
        <AppSider />
        <AppContent />
      </Layout>
    </Layout>
  );
}
