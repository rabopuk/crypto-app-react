import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card, Layout, List, Statistic, Tag, Typography } from 'antd';
import { useContext } from 'react';
import CryptoContext from '../../context/crypto-context.jsx';
import { capitalize } from '../../utils.js';
// import s from './AppSider.module.css';

const siderStyle = {
  padding: '1rem',
};

export const AppSider = () => {
  const { assets } = useContext(CryptoContext);

  return (
    <Layout.Sider width="30%" style={siderStyle}>
      {assets.map(asset => (
        <Card
          key={asset.id}
          style={{ marginBottom: '1rem' }}
        >
          <Statistic
            title={capitalize(asset.id)}
            value={asset.totalAmount}
            precision={2}
            valueStyle={{ color: asset.grow ? '#3f8600' : '#cf1322' }}
            prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            suffix="$"
          />

          <List
            size="small"
            dataSource={[
              { title: 'Total profit', value: asset.totalProfit, withTag: true },
              { title: 'Asset amount', value: asset.amount, isPlain: true, },
              // { title: 'Difference', value: asset.growPercent, },
            ]}
            renderItem={(item) => (
              <List.Item>
                <span>{item.title}</span>
                <span>
                  {item.withTag && (
                    <Tag
                      color={asset.grow ? 'green' : 'red'}
                    >
                      {asset.growPercent} %
                    </Tag>
                  )}
                  {item.isPlain && item.value}
                  {!item.isPlain && (
                    <Typography.Text
                      type={asset.grow ? 'success' : 'danger'}
                    >
                      {item.value.toFixed(2)}$
                    </Typography.Text>
                  )}
                </span>
              </List.Item>
            )}
          />
        </Card>
      ))}
    </Layout.Sider>
  );
}

export default AppSider;