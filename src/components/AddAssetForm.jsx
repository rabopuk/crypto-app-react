import {
  Button,
  DatePicker,
  Divider,
  Form,
  InputNumber,
  Result,
  Select,
  Space,
} from 'antd';
import { useRef, useState } from 'react';
import { useCrypto } from '../context/crypto-context.jsx';
import CoinInfo from './CoinInfo.jsx';

const validateMessages = {
  required: '${label} is required',
  types: {
    number: '${label} is not valid number',
  },
  number: {
    range: '${label} must be between ${min} and ${max} range',
  },
};

export const AddAssetForm = ({ onCLose }) => {
  const { crypto, addAsset } = useCrypto();
  const [coin, setCoin] = useState(null);
  const [form] = Form.useForm();
  const assetRef = useRef();
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <Result
        status='success'
        title='New Asset added!'
        subTitle={`Added ${assetRef.current.amount} of ${coin.name} by price ${assetRef.current.price}`}
        extra={[
          <Button type='primary' key='console' onClick={onCLose}>
            Close
          </Button>,
        ]}
      />
    );
  }

  if (!coin) {
    return (
      <Select
        // mode="multiple"
        style={{
          width: '100%',
        }}
        // open={select}
        onSelect={v => setCoin(crypto.find(c => c.id === v))}
        placeholder='Select coin'
        options={crypto.map(coin => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={option => (
          <Space>
            <img
              style={{ width: 20 }}
              src={option.data.icon}
              alt={option.data.label}
            />{' '}
            {option.data.label}
          </Space>
        )}
      />
    );
  }

  const onFinish = values => {
    console.log('Success:', values);

    const newAsset = {
      id: coin.id,
      amount: values.amount,
      price: values.price,
      date: values.date?.$d ?? new Date(),
    };

    assetRef.current = newAsset;
    setSubmitted(true);
    addAsset(newAsset);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
    setSubmitted(false);
  };

  const handleAmountChange = value => {
    const price = form.getFieldValue('price');

    form.setFieldsValue({
      total: +(value * price).toFixed(2),
    });
  };

  const handlePriceChange = value => {
    const amount = form.getFieldValue('amount');

    form.setFieldsValue({
      total: +(value * amount).toFixed(2),
    });
  };

  return (
    <Form
      form={form}
      name='basic'
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 10,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        price: +coin.price.toFixed(2),
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      validateMessages={validateMessages}
    >
      <CoinInfo coin={coin} />

      <Divider />

      <Form.Item
        label='Amount'
        name='amount'
        rules={[
          {
            required: true,
            type: 'number',
            min: 0,
          },
        ]}
      >
        <InputNumber
          style={{ width: '100%' }}
          placeholder='Enter coin amount'
          onChange={handleAmountChange}
        />
      </Form.Item>

      <Form.Item label='Price' name='price'>
        <InputNumber onChange={handlePriceChange} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item label='Date & Time' name='date'>
        <DatePicker showTime style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item label='Total' name='total'>
        <InputNumber
          disabled
          placeholder='Total amount'
          style={{ width: '100%' }}
        />
      </Form.Item>

      <Form.Item>
        <Button type='primary' htmlType='submit'>
          Add Asset
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddAssetForm;
