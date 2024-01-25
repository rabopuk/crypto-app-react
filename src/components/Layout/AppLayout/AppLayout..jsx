import { Layout, Spin } from "antd";
import { useContext } from "react";
import CryptoContext from "../../../context/crypto-context.jsx";
import AppContent from "../AppContent/AppContent.jsx";
import AppHeader from "../AppHeader/AppHeader.jsx";
import AppSider from "../AppSider/AppSider.jsx";

export const AppLayout = () => {
  const { loading } = useContext(CryptoContext);

  if (loading) {
    return <Spin fullscreen />;
  }

  return (
    <Layout>
      <AppHeader />
      <Layout>
        <AppSider />
        <AppContent />
      </Layout>
    </Layout>
  );
};

export default AppLayout;