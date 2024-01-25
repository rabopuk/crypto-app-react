import { createContext, useContext, useEffect, useState } from 'react';
import { fakeFetchAssetsData, fakeFetchCryptoData } from '../api.js';
import { percentDifference } from '../utils.js';

const CryptoContext = createContext({
  assets: [],
  crypto: [],
  loading: false,
});

export const CryptoContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [crypto, setCrypto] = useState([]);
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    const preload = async () => {
      setLoading(true);

      const { result } = await fakeFetchCryptoData();
      const assets = await fakeFetchAssetsData();

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

      setCrypto(result);
      setLoading(false);
    };

    preload();
  }, []);

  return (
    <CryptoContext.Provider
      value={{ loading, crypto, assets }}
    >
      {children}
    </CryptoContext.Provider>
  );
};

export default CryptoContext;

export const useCrypto = () => {
  return useContext(CryptoContext);
};