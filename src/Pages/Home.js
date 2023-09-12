import React, { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Send from "../assets/send.jpg";
import Recive from "../assets/recieve.jpg";
import Buy from "../assets/buy.jpg";
import Swap from "../assets/swap.jpg";

import DataList from "../Components/DataList.jsx";
import CryptoPrices from "../Components/Prices";


import BitcoinImg from "../assets/CoinsLogo/Bitcoin-Logo.png";
import EtherumImg from "../assets/CoinsLogo/Ethereum_logo.png";
// import BnbImg from "../assets/CoinsLogo/bnb-logo.jpg";
import Footer from '../Components/Footer.jsx'

import ShibImg from '../assets/CoinsLogo/shib.jpg';

const Home = () => {
  const navigate = useNavigate();

  const [isReceiveModalOpen, setIsReceiveModalOpen] = useState(false);
  const [receiveData, setReceiveData] = useState("");
  const [balance, setBalance] = useState(0); // Initialize balance state
  const [firstRender, setFirstRender] = useState(true);
  


  useEffect(() => {
    // Retrieve values from localStorage and set balance state
    const storedBalance = parseFloat(localStorage.getItem("Balance0")) || 0;
    setBalance(storedBalance);
    console.log(localStorage.getItem("email"))
   
  }, []);



  const CoinsList = ({ img, name, price, percentage, quantitiy }) => {
    return (
      <>
        <div className="pt-4">
          <div className="flex text-sm ">
            <img
              className="h-14 w-14 rounded-full flex bg-white "
              src={img}
              alt="logo"
            />
            <div className="px-3 justify-center  flex flex-col">
              <h2 className="text-lg font-semibold">{name}</h2>
              <div className="flex items-center justify-between">
                <div className="flex">
                  <p className="text-sm mr-2">{"$ " + price}</p>
                  <p className="text-red-500">{percentage}</p>
                </div>

                {/* <div className="flex w-[60vw] items-center justify-end">
                  <h2>{quantitiy}</h2>
                </div> */}
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <h2>
            {localStorage.getItem("Balance0") !== null
    ? localStorage.getItem("Balance0")
    : 0}
            </h2>
          </div>
          <hr className="bg-white" />
        </div>
      </>
    );
  };

  const CoinsList2 = ({ img, name, price, percentage, quantitiy }) => {
    return (
      <>
        <div className="pt-4">
          <div className="flex text-sm ">
            <img
              className="h-14 w-14 rounded-full flex bg-white "
              src={img}
              alt="logo"
            />
            <div className="px-3 justify-center  flex flex-col">
              <h2 className="text-lg font-semibold">{name}</h2>
              <div className="flex items-center justify-between">
                <div className="flex">
                  <p className="text-sm mr-2">{"$ " + price}</p>
                  <p className="text-red-500">{percentage}</p>
                </div>

                {/* <div className="flex w-[60vw] items-center justify-end">
                  <h2>{quantitiy}</h2>
                </div> */}
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <h2>{quantitiy}</h2>
          </div>
          <hr className="bg-white" />
        </div>
      </>
    );
  };

  const logoutfunction = () => {
    localStorage.clear();
    navigate("/");
  };

  const email = localStorage.getItem("email");

  const openReceiveModal = () => {
    setIsReceiveModalOpen(true);
    setReceiveData(localStorage.getItem("Key0"));
  };

  const closeReceiveModal = () => {
    setIsReceiveModalOpen(false);
  };
 
  const bitcoinPrice = localStorage.getItem('bitcoin'); // Retrieve bitcoin price from localStorage
  const totalBalance = (balance * bitcoinPrice).toFixed(2); // Calculate total balance
  
  

  return (
    <>
      <div className="hidden">
        <DataList />
      </div>
      <div className="hidden">
      <CryptoPrices/>
      </div>
      <div className=" App flex items-center justify-between  px-8 py-10 text-3xl  bg-black text-white font-bold ">
        <h1>Welcome</h1>
        <button
          className="hover:text-red-500 transition-all duration-300 ease-in-out"
          onClick={logoutfunction}
        >
          Logout
        </button>
      </div>

      <section className="bg-black text-white flex items-center justify-center p-10 flex-col">
        <h1 className="text-7xl font-bold md:text-3xl sm:text-2xl xs:text-2xl">${totalBalance}</h1>
        <h className="text-sm font-base p-2 ">Multi Coin Wallet</h>
      </section>

      <section className="bg-black flex items-center justify-center gap-7  ">
        <button className="cursor-pointer h-14 w-14 ">
          <img src={Send} className="rounded-full " alt="Send" />
          <p className="text-white">Send</p>
        </button>
        <button onClick={openReceiveModal} className="cursor-pointer h-14 w-14">
          <img src={Recive} className="rounded-full " alt="Receive" />
          <p className="text-white">Receive</p>
        </button>
        <button className="cursor-pointer h-14 w-14">
          <img src={Buy} className="rounded-full " alt="Receive" />
          <p className="text-white">Buy</p>
        </button>
        <button className="cursor-pointer h-14 w-14">
          <img src={Swap} className="rounded-full " alt="Receive" />
          <p className="text-white">Swap</p>
        </button>
      </section>

      {isReceiveModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h1>Wallet Address : </h1>
            <p className="text-xl font-bold ">{receiveData}</p>
            <button
              onClick={closeReceiveModal}
              className="px-4 py-2 bg-blue-500 text-white rounded-full mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <section className="bg-black text-white px-10 py-14">
        <CoinsList
          img={BitcoinImg}
          name="FBTC"
          price={localStorage.getItem('bitcoin')}
          // percentage="-2.3"
          quantitiy="0"
        />
        <CoinsList2
          img={BitcoinImg}
          name="BTC"
          price={localStorage.getItem('bitcoin')}
          // percentage="-3.1"
          quantitiy="0"
        />

        <CoinsList2
          img={EtherumImg}
          name="Etherum"
          price={localStorage.getItem('ethereum')}
          // percentage="-1.7"
          quantitiy="0"
        />
        {/* <CoinsList2
          img={BnbImg}
          name="BNB"
          price={localStorage.getItem('bnb')}
          // percentage="-0.6"
          quantitiy="0"
        /> */}

        <CoinsList2
          img={ShibImg}
          name="Shib"
          price={localStorage.getItem('shib')}
          // percentage="-3.1"
          quantitiy="0"
        />
      </section>
      <Footer/>

    
    
      
    </>
  );
};

export default Home;
