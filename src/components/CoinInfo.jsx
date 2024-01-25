import { Flex, Typography } from "antd";

export const CoinInfo = ({ coin, withSymbol }) => (
  <Flex align="center">
    <img
      style={{ width: 40, marginRight: 10 }}
      src={coin.icon}
      alt={coin.name}
    />

    <Typography.Title
      style={{ margin: 0 }}
      level={2}
    >
      {withSymbol && (
        <span>{`(${coin.symbol})`}</span>
      )} {coin.name}
    </Typography.Title>
  </Flex>
);

export default CoinInfo;