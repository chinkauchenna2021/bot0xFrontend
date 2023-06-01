/* eslint-disable react/jsx-key */
/* eslint-disable no-empty */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useState } from "react";
import * as S from "../styles/Style";
import { IoCloseCircle } from "react-icons/io5";
import useLocalStorage from "use-local-storage";
import { randomImage } from "../../hooks/useStates";

function ClaimModal({
  setShowModal,
  showModal,
  modalAssetToken,
  modalAssetNFT,
  bothEmptyAsset,
  mainModal,
  clickOnBtn,
}) {
  const SAVEDATA = "influencer12345678912334";
  const [addressData, setAddressData] = useLocalStorage(SAVEDATA);
  const [allNftResult, setAllNftResult] = useState([]);

  const allcollection = useMemo(() => {
    (async () => {
      let collectionBank = [];
      addressData.nfts.forEach((singleNft) => {
        singleNft.result.forEach((items) => {
          collectionBank.push(items);
        });
      });
      setAllNftResult(collectionBank);
    })();
  }, [setAllNftResult]);

  const serielizeData = (metadata) => {
    if (metadata == null) return;
    let stringifiedNft = JSON.parse(metadata);
    if (stringifiedNft?.image === null || stringifiedNft?.image === undefined)
      return;

    if (stringifiedNft?.image.split("//")[0] == "ipfs:") {
      return "https://ipfs.io/ipfs/" + stringifiedNft?.image.split("//")[1];
    } else if (stringifiedNft?.image.split("/")[0] == "https://ipfs.io") {
      return (
        "https://ipfs.io/ipfs/" +
        stringifiedNft?.image.split("/")[3] +
        stringifiedNft?.image.split("/")[2]
      );
    } else {
      return stringifiedNft?.image;
    }
  };

  const descriptionNft = (metadata) => {
    let stringifiedNft = JSON.parse(metadata);
    if (stringifiedNft?.description == null) return;
    return stringifiedNft?.description;
  };
  const randomGenerator = () => {
    const { title, image, price } = randomImage();

    return { title, image, price };
  };

  return (
    <S.ModalContainer
      className={`${showModal} flex justify-center items-center  top-0 left-0 w-full h-screen backdrop-blur-sm bg-black/20`}
    >
      <div className="z-20 relative rounded-lg w-11/12 lg:w-5/12 min-h-[300px] bg-black backdrop-blur-2xl flex flex-col justify-center items-center">
        <div
          onClick={() => setShowModal("hidden")}
          className="absolute top-1 right-3 w-fit h-fit cursor-pointer "
        >
          <IoCloseCircle color="yellow" size={32} />
        </div>
        <S.ScrollBar className=" w-full overflow-hidden overflow-y-scroll max-h-[600px]">
          {modalAssetNFT && bothEmptyAsset == false ? (
            <div className=" w-full h-full flex flex-col justify-center items-center ">
              <div className="w-full text-center font-bold text-md py-3 text-white">
                Your Available NFT
              </div>
              {allNftResult?.map((nft, id) =>
                nft.metadata != null ? (
                  <div
                    key={id}
                    className="w-11/12 lg:w-7/12 my-5 border-b border-b-slate-500 px-2 py-5"
                  >
                    <div className="">
                      <img
                        loading="lazy"
                        className=""
                        src={serielizeData(nft.metadata)}
                      />
                    </div>
                    <div className="text-white w-full text-center  font-semibold py-2">
                      {nft.name}
                    </div>
                    <div className="text-white text-sm text-left">
                      {descriptionNft(nft.metadata)}
                    </div>
                    <button
                      onClick={clickOnBtn}
                      className="flex-wrap my-6 w-full py-2 capitalize text-white rounded-lg ring-1 ring-orange-400 "
                    >
                      list for quick sales
                    </button>
                  </div>
                ) : (
                  ""
                )
              )}
            </div>
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              {" "}
              No NFT Available
            </div>
          )}

          {modalAssetToken && bothEmptyAsset == false ? (
            <div className=" w-full h-full flex flex-col justify-center items-center ">
              <div className="w-full text-white text-center font-bold text-md py-4">
                Your Available Token
              </div>

              {addressData.tokenBalances?.map((token, index) => (
                <div
                  key={index}
                  className="w-11/12 lg:w-7/12 my-5 border-b border-b-slate-500 px-2 py-2"
                >
                  <div className="text-white py-8   w-full text-center font-bold text-md tracking-wider">
                    {" "}
                    {token}
                  </div>
                  <button
                    onClick={clickOnBtn}
                    className="flex-wrap my-6 w-full py-2 capitalize text-white rounded-lg ring-1 ring-orange-400 "
                  >
                    list for quick sales
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              {" "}
              No Token Available
            </div>
          )}
          {mainModal && (
            <div className="space-y-5 container w-full flex justify-center items-center flex-col">
              <div className="w-full text-center  text-white font-bold text-2xl capitalize tracking-wide pb-3">
                Random NFT (claim now)
              </div>
              <div className="w-11/12 h-full lg:w-7/12 flex justify-center items-center">
                <img
                  src={randomGenerator().image}
                  loading="lazy"
                  className="w-full h-[400px] object-contain"
                />
              </div>
              <div className="w-full flex flex-row justify-evenly items-center">
                <div className="text-white w-fit font-bold text-sm lg:text-md tracking-wider  text-orange-300 capitalize ">
                  {"classified"}
                </div>
                <div className="text-white w-fit font-semibold text-sm lg:text-md">
                  {randomGenerator().price}
                </div>
              </div>
              <div className="w-full flex justify-center items-center">
                <button
                  onClick={clickOnBtn}
                  type="button"
                  className="py-3 font-semibold rounded-full capitalize text-white bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 w-11/12 outline-none mb-4 lg:w-7/12"
                >
                  claim Random NFT
                </button>
              </div>
            </div>
          )}
        </S.ScrollBar>
      </div>
    </S.ModalContainer>
  );
}

export default ClaimModal;
