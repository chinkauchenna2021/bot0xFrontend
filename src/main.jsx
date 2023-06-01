/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import MainProvider from './common/provider/MainProvider'
import {
  ThirdwebProvider,
  metamaskWallet,
  coinbaseWallet,
  walletConnectV1,
  walletConnect,
  safeWallet,
  paperWallet,
  magicLink,
} from "@thirdweb-dev/react";



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <ThirdwebProvider
      supportedWallets={[
        metamaskWallet(),
        coinbaseWallet(),
        walletConnect({
          projectId: "761a58f0fa95f17a1e6e0b5b42223197",
        }),
        walletConnectV1(),
        safeWallet(),
      ]}
      activeChain="mumbai"
    >
      <MainProvider />
    </ThirdwebProvider>
  </React.StrictMode>,
)
