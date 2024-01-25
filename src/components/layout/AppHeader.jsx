import { Button, Drawer, Layout, Modal, Select, Space } from "antd";
import { useEffect, useState } from "react";
import { useCrypto } from "../../context/crypto-context.jsx";
import AddAssetForm from "../AddAssetForm.jsx";
import CoinInfoModal from "../CoinInfoModal.jsx";
// import s from './AppHeader.module.css';

const headerStyle = {
  width: '100%',
  textAlign: 'center',
  height: 60,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1rem',
};

// const options = [
//   {
//     label: 'China',
//     value: 'china',
//     emoji: '🇨🇳',
//     desc: 'China (中国)',
//   },
//   {
//     label: 'USA',
//     value: 'usa',
//     emoji: '🇺🇸',
//     desc: 'USA (美国)',
//   },
//   {
//     label: 'Japan',
//     value: 'japan',
//     emoji: '🇯🇵',
//     desc: 'Japan (日本)',
//   },
//   {
//     label: 'Korea',
//     value: 'korea',
//     emoji: '🇰🇷',
//     desc: 'Korea (韩国)',
//   },
// ];

export const AppHeader = () => {
  const [select, setSelect] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [coin, setCoin] = useState(null);
  const { crypto } = useCrypto();

  useEffect(() => {
    const keypress = (e) => {
      if (e.key === '/') {
        setSelect(prev => !prev);
      }
    };

    document.addEventListener('keypress', keypress);

    return () => document.removeEventListener('keypress', keypress);
  });

  const handleSelect = (value) => {
    // console.log(`selected: ${value}`);
    setCoin(crypto.find(c => c.id === value))
    setIsModalOpen(true);
  };

  // const showModal = () => {
  //   setIsModalOpen(true);
  // };

  // const handleOk = () => {
  //   setIsModalOpen(false);
  // };

  // const handleCancel = () => {
  //   setIsModalOpen(false);
  // };

  return (
    <Layout.Header style={headerStyle}>
      <Select
        // mode="multiple"
        style={{
          width: 250,
        }}
        open={select}
        onSelect={handleSelect}
        onClick={() => setSelect(prev => !prev)}
        value="press / to open"
        // optionLabelProp="label"
        options={crypto.map(coin => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space>
            {/* <span role="img" aria-label={option.data.label}>
              {option.data.emoji}
            </span>
            {option.data.desc} */}
            <img
              src={option.data.icon}
              alt={option.data.label}
              style={{ width: 20 }}
            />{option.data.label}
          </Space>
        )}
      />

      <Modal
        // title="Basic Modal"
        open={isModalOpen}
        // onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <CoinInfoModal coin={coin} />
      </Modal>

      <Button
        type="primary"
        onClick={() => setIsDrawerOpen(true)}
      >
        Add Asset
      </Button>

      <Drawer
        title="Add Asset"
        width={600}
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        destroyOnClose
      >
        <AddAssetForm onCLose={() => setIsDrawerOpen(false)} />
      </Drawer>
    </Layout.Header>
  );
};

export default AppHeader;