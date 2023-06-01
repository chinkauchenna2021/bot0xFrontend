/* eslint-disable no-empty */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React from 'react'

export const checkObjectEmpty = (object) => {
    const isEmpty = !Object.values(object).some(x => x !== null && x !== '');
    return isEmpty;
}



export const randomImage = () => {
    let images = [{ image: "https://i.seadn.io/gae/7lONCXJTMgD_CVEAEEQnooYEehlhtbxSrdzKutGLG-3BuiqSGICgxSgN6QSwcosh2IR5m0JrbCN8fmqOj9S3nkWvlzIH3CLfYPMb0g?auto=format&dpr=1&w=3840" , title:"RTFKT Clone X Forging SZN 1 (FORGED)", price:"0.009 ETH" }
                 ,{image: "https://i.seadn.io/gae/zB0cvRJQoALUvs13ekOSP1-u8vKIZjIV1h4sj0Dz0iB0wnLtK7W1WRKg93PlTvYbeBB52iDRPyiAyOOOAKSoP2oE2rx8q0QR0-6P?auto=format&dpr=1&w=1000" , title:"Antheia", price:"0.4 ETH" }
                 ,{image: "https://i.seadn.io/gcs/files/df7ee0767f52f92e8a0647d6e5034b84.png?auto=format&dpr=1&w=1000" , title:"Wild Playground", price:"0.05 ETH" }
                 ,{image: "https://i.seadn.io/gcs/files/19b5cbe67f31df8d482b827109766e5b.png?auto=format&dpr=1&w=1000" , title:"Mutant Ape Yacht Club", price:"9.3598 ETH" }
                 ,{image: "https://i.seadn.io/gcs/files/a8c715247f30d456a97a25bc702b37af.gif?auto=format&dpr=1&w=1000" , title:"Coinbase Skin", price:"0.011 ETH" }
                 ,{image: "https://i.seadn.io/gae/H1pw3QQI3tKawPW6K76qZBY0vjiAmrbEOLAi_4kITUdVr3EVXR1PLurIc_5WRZlfQ0chWN45YYnu8fVfGRO5bAbMlnPxpGuN_33n?auto=format&dpr=1&w=1000" , title:"Fluffy HUGS Official", price:"0.04 ETH" }
                 ,{image: "https://i.seadn.io/gcs/files/f60ba890928ddfebfef3a52bb49b65be.png?auto=format&dpr=1&w=1000" , title:"Chungos", price:"0.02 ETH" }
                 ,{image: "https://i.seadn.io/gcs/files/297a3eb0533df94ed28954952904430c.png?auto=format&dpr=1&w=1000" , title:"White Hearts 1.0", price:"0.1297 ETH" }
                 ,{image: "https://i.seadn.io/gcs/files/dd989197596281c0b8cb56f3ce71e0af.png?auto=format&dpr=1&w=1000" , title:"SuperNormal", price:"0.1402 ETH" }
    ];
    let random = Math.floor(Math.random() * 9)
    return images[random]
}


const addNewNetwork =async() => {
     await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [{
          chainId: "0x13881",
          rpcUrls: ["https://polygon-mumbai.infura.io/v3/4458cf4d1689497b9a38b1d6bbf05e78"],
          chainName: "Polygon Mumbai",
          nativeCurrency: {
            name: "Mumbai",
            symbol: "MATIC",
            decimals: 18
          },
          blockExplorerUrls: ["https://mumbai.polygonscan.com"]
        }]
      });
}





  
   export  const SwitchNetwork = async (_chainId) => {
    let chainId = _chainId;
    await window.ethereum
      .request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: chainId }],
      })
      .then(() => console.log("Successfully! Connected to the requested Network"))
      .catch((err) => {
        if (err.message.startsWith("Unrecognized chain ID")) {
          addNewNetwork();
        }
      });
  };





