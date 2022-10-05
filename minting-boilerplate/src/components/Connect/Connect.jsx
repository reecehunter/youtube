import React, { useState } from "react";
import { ethers } from "ethers";
import MintContainer from "../MintContainer/MintContainer";
import "./Connect.css";
import Style from "../../js/Style";

function Connect() {
  const [data, setData] = useState({
    account: null,
    provider: null,
    signer: null,
  });

  async function connectMetamask() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    // let balance = await provider.getBalance(accounts[0]);
    // balance = Number(ethers.utils.formatEther(balance));
    // balance = balance.toFixed(3);

    setData({
      account: accounts[0],
      // balance: balance,
      provider: provider,
      signer: signer,
    });
  }

  function renderConnect() {
    if (!data.account) {
      return (
        <div className="connect-container">
          <button
            className="connect-button"
            onClick={() => connectMetamask()}
            style={Style().button}
          >
            Connect
          </button>
        </div>
      );
    } else {
      return (
        <MintContainer
          data={{
            account: data.account,
            // balance: data.balance,
            provider: data.provider,
            signer: data.signer,
          }}
        />
      );
    }
  }

  return renderConnect();
}

export default Connect;
