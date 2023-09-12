import React, { useState, useEffect } from 'react';

function CryptoPrices() {
  const [cryptoData, setCryptoData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,shiba-inu,binancecoin&vs_currencies=usd'
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setCryptoData(data);

        // Set prices in local storage after receiving the data
        if (data.bitcoin) {
          localStorage.setItem('bitcoin', JSON.stringify(data.bitcoin.usd));
        }

        if (data.ethereum) {
          localStorage.setItem('ethereum', JSON.stringify(data.ethereum.usd));
        }

        if (data.binancecoin) {
          localStorage.setItem('binance', JSON.stringify(data.binancecoin.usd));
        }

        if (data['shiba-inu']) {
          localStorage.setItem('shib', JSON.stringify(data['shiba-inu'].usd));
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching crypto data:', error);
        setLoading(false);
      }
    };

    // Fetch initial data
    fetchCryptoData();

    // Fetch data every 10 seconds
    const intervalId = setInterval(fetchCryptoData, 10000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <h1>Live Crypto Prices</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {cryptoData.bitcoin && (
            <p>Bitcoin (BTC): ${cryptoData.bitcoin.usd}</p>
          )}
          {cryptoData.ethereum && (
            <p>Ethereum (ETH): ${cryptoData.ethereum.usd}</p>
          )}
          {cryptoData['shiba-inu'] && (
            <p>Shiba Inu (SHIB): ${cryptoData['shiba-inu'].usd}</p>
          )}
          {cryptoData.binancecoin && (
            <p>Binance Coin (BNB): ${cryptoData.binancecoin.usd}</p>
          )}
        </div>
      )}
    </div>
  );
}

export default CryptoPrices;
