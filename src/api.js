import { cryptoAssets, cryptoData } from "./data.js";

export const fakeFetchCryptoData = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(cryptoData);
    }, 800);
  })
};

export const fakeFetchAssetsData = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(cryptoAssets);
    }, 200);
  })
};