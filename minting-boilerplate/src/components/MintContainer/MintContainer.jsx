import React, { useEffect, useState, useRef } from "react";
import { ethers } from "ethers";
import "./MintContainer.css";
import Style from "../../js/Style";
import Topbar from "../Topbar/Topbar";
import handleError from "../../js/handleError";
import Popup from "../Popup/Popup";
import {
  projectConfig,
  errorMessages,
  contractConfig,
  websiteStyling,
} from "../../config";
import Loader from "../Loader/Loader";

function MintContainer({ data }) {
  const [amount, setAmount] = useState(1);
  const [price, setPrice] = useState(projectConfig.mintPrice);
  const [popupData, setPopupData] = useState({
    show: false,
    color: "",
    message: "",
  });
  const mintButton = useRef(null);
  const [txPending, setTxPending] = useState(false);

  useEffect(() => {
    if (projectConfig.mintPriceType === "wei")
      setPrice(Number(ethers.utils.formatEther(projectConfig.mintPrice)));
  }, []);

  function increment() {
    if (amount >= projectConfig.mintMaxAmount) return;
    setAmount((prev) => prev + 1);
  }

  function decrement() {
    if (amount <= 1) return;
    setAmount((prev) => prev - 1);
  }

  function disableButton() {
    mintButton.current.setAttribute("disabled", "");
    mintButton.current.style.transition = "none";
    mintButton.current.style.cursor = "default";
    mintButton.current.style.backgroundColor =
      websiteStyling.buttonBackgroundColorDisabled;
    mintButton.current.style.color = websiteStyling.buttonFontColorDisabled;
  }

  function enableButton() {
    mintButton.current.removeAttribute("disabled");
    mintButton.current.style.transition = "transform 0.2s ease";
    mintButton.current.style.cursor = "pointer";
    mintButton.current.style.backgroundColor =
      websiteStyling.buttonBackgroundColor;
    mintButton.current.style.color = websiteStyling.buttonFontColor;
  }

  function renderLoader() {
    if (txPending) return <Loader />;
  }

  async function mint(nftPrice, mintAmount) {
    disableButton();
    setTxPending(true);

    const contract = new ethers.Contract(
      contractConfig.contractAddress,
      contractConfig.contractABI,
      data.provider
    );

    const contractWithSigner = contract.connect(data.signer);

    contractWithSigner[projectConfig.mintFunction](nftPrice, mintAmount)
      .then(async (tx) => {
        setPopupData({
          show: true,
          color: websiteStyling.transactionPendingPopupColor,
          message: "Your NFTs are being minted.",
        });
        await tx.wait();
        setPopupData({
          show: true,
          color: websiteStyling.transactionSuccessPopupColor,
          message: "Success! Your NFTs were minted.",
        });
        enableButton();
        setTxPending(false);
      })
      .catch((err) => {
        const errData = handleError(err);
        setPopupData({
          show: true,
          color: websiteStyling.transactionErrorPopupColor,
          message: errData.message,
        });
        enableButton();
        setTxPending(false);
      });
  }

  return (
    <section className="mint-section">
      <Popup data={popupData} />

      <Topbar
        account={
          data.account.substring(0, 5) + "..." + data.account.substring(37, 42)
        }
      />

      <div
        className="mint-container"
        style={{
          border: `2px solid ${websiteStyling.borderColor}`,
        }}
      >
        <h1 style={{ fontSize: websiteStyling.headerFontSize }}>
          {projectConfig.mintTitle}
        </h1>
        <p style={Style().paragraph}>{projectConfig.mintDescription}</p>

        <div className="price" style={Style().border}>
          <p style={Style().paragraph}>Price each:</p>
          <p style={Style().paragraph}>{price ? price : "..."} Ξ</p>
        </div>

        <div className="amount" style={Style().border}>
          <p style={Style().paragraph}>Amount:</p>
          <span>
            <a onClick={decrement} style={Style().increment}>
              -
            </a>
            <p style={Style().paragraph}>{amount}</p>
            <a onClick={increment} style={Style().increment}>
              +
            </a>
          </span>
        </div>

        <div className="total">
          <p style={Style().paragraph}>Total price:</p>
          <p style={Style().paragraph}>{(price * amount).toFixed(3)} Ξ</p>
        </div>

        <button
          ref={mintButton}
          onClick={() => mint(projectConfig.mintPrice * amount, amount)}
          style={Style().button}
        >
          Mint {renderLoader()}
        </button>
      </div>
    </section>
  );
}

export default MintContainer;
