import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card, Layout, List, Spin, Statistic, Tag, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { fakeFetchAssetsData, fakeFetchCryptoData } from '../../../api.js';
import { capitalize, percentDifference } from '../../../utils.js';
// import s from './AppSider.module.css';

const siderStyle = {
  padding: '1rem',
};

export const AppSider = () => {
  const [loading, setLoading] = useState(false);
  const [crypto, setCrypto] = useState([]);
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    const preload = async () => {
      setLoading(true);

      const { result } = await fakeFetchCryptoData();
      const assets = await fakeFetchAssetsData();

      setCrypto(result);
      setAssets(assets.map(asset => {
        const coin = result.find(c => c.id === asset.id)

        return {
          grow: (asset.price < coin.price),
          growPercent: percentDifference(asset.price, coin.price),
          totalAmount: (asset.amount * coin.price),
          totalProfit: (asset.amount * coin.price) - (asset.amount * asset.price),
          ...asset,
        };
      }));
      setLoading(false);
    };

    preload();
  }, []);

  if (loading) {
    return <Spin fullscreen />;
  }

  return (
    <Layout.Sider width="25%" style={siderStyle}>
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
            size="large"
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
                      {asset.growPercent}%
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


      {/* <Card>
        <Statistic
          title="Idle"
          value={9.3}
          precision={2}
          valueStyle={{ color: '#cf1322' }}
          prefix={<ArrowDownOutlined />}
          suffix="%"
        />
      </Card> */}
    </Layout.Sider>
  );
}

export default AppSider;