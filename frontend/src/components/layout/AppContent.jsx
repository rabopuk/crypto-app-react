import { Layout, Typography } from "antd";
import { useCrypto } from "../../context/crypto-context.jsx";
import AssetsTable from "./AssetsTable.jsx";
import PortfolioChart from "./PortfolioChart.jsx";
// import s from './AppContent.module.css';

const contentStyle = {
  textAlign: 'center',
  minHeight: 'calc(100vh - 60px)',
  color: '#fff',
  backgroundColor: '#001529',
  padding: '1rem',
};

export const AppContent = () => {
  const { assets, crypto } = useCrypto();

  const cryptoPriceMap = crypto.reduce((acc, c) => {
    acc[c.id] = c.price;
    return acc;
  }, {});

  return (
    <Layout.Content style={contentStyle}>
      <Typography.Title
        style={{ textAlign: 'left', color: '#fff' }}
        level={3}
      >
        Portfolio: {' '}
        {+assets
          .map(asset => asset.amount * cryptoPriceMap[asset.id])
          .reduce((acc, v) => (acc += v), 0)
          .toFixed(2)
        }
        $
      </Typography.Title>

      <PortfolioChart />

      <AssetsTable />
    </Layout.Content>
  );
};

export default AppContent;