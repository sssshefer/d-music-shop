"use client";

import React, { useState, useEffect, FormEvent } from "react";

import { ethers } from "ethers";
import { MusicShop__factory } from "@/typechain";
import type { Album, MusicShop } from "@/typechain";

import type { BrowserProvider } from "ethers";

import ConnectWallet from "@/components/ConnectWallet";
import WaitingForTransactionMessage from "@/components/WaitingForTransactionMessage";
import TransactionErrorMessage from "@/components/TransactionErrorMessage";

const HARDHAT_NETWORK_ID = "0x539";
const MUSIC_SHOP_ADDRESS = "0x5fbdb2315678afecb367f032d93f642f64180aa3";

declare let window: any;

type CurrentConnectionProps = {
  provider: BrowserProvider | undefined;
  shop: MusicShop | undefined;
  signer: ethers.JsonRpcSigner | undefined;
};

export default function Home() {
  const [networkError, setNetworkError] = useState<string>();
  const [transactionError, setTransactionError] = useState<any>();
  const [txBeingSent, setTxBeingSent] = useState<string>();
  const [currentBalance, setCurrentBalance] = useState<string>();

  const [currentConnection, setCurrentConnection] = useState<CurrentConnectionProps>();

  useEffect(() => {
    (async () => {
      if (currentConnection?.provider && currentConnection.signer) {
        setCurrentBalance(
          (
            await currentConnection.provider.getBalance(
              currentConnection.signer.address
            )
          ).toString()

        )
      }
    })();
  }, [currentConnection, txBeingSent])

  const _connectWallet = async () => {
    //check if metamask is installed in browser
    if (window.ethereum === undefined) {
      setNetworkError("Please install Metamask!");

      return;
    }

    //check Hardhat network is used
    if (!(await _checkNetwork())) {
      return;
    }

    //get accounts from Metamask
    const [selectedAccount] = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    await _initializeUser(ethers.getAddress(selectedAccount));

    window.ethereum.on(
      "accountsChanged",
      async ([newAccount]: [newAccount: string]) => {
        if (newAccount === undefined) {
          return _resetState();
        }

        await _initializeUser(ethers.getAddress(newAccount));
      }
    )

    window.ethereum.on("chainChanged", ([_networkId]: any) => {
      _resetState();
    })
  }

  async function _checkNetwork(): Promise<boolean> {
    const chosenChainId = await window.ethereum.request({
      method: "eth_chainId"
    });

    if (chosenChainId === HARDHAT_NETWORK_ID)
      return true;

    setNetworkError("Please connect to Hardhat network (localhost:8545)!");

    return false;
  }

  const _initializeUser = async (selectedAccount: string) => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner(selectedAccount);

    setCurrentConnection({
      ...currentConnection,
      provider,
      signer,
      shop: MusicShop__factory.connect(MUSIC_SHOP_ADDRESS, signer),
    });
  };

  const _resetState = () => {
    setNetworkError(undefined);
    setCurrentConnection({
      provider: undefined,
      signer: undefined,
      shop: undefined,
    });
    setTxBeingSent(undefined);
    setTransactionError(undefined);
    setCurrentBalance(undefined);
  };

  const _dismissNetworkError = () => {
    setNetworkError(undefined);
  };

  const _dismissTransactionError = () => {
    setTransactionError(undefined);
  };

  const _getRpcErrorMessage = (error: any): string => {
    console.log(error);
    if (error.data) {
      return error.data.message;
    }

    return error.message;
  };

  return (
    <main>
      {!currentConnection?.signer && (
        <ConnectWallet
          connectWallet={_connectWallet}
          networkError={networkError}
          dismiss={_dismissNetworkError}
        />
      )}

      {currentConnection?.signer && (
        <p>Your address: {currentConnection.signer.address}</p>
      )}
      {txBeingSent && <WaitingForTransactionMessage txHash={txBeingSent} />}
      {transactionError && (
        <TransactionErrorMessage
          message={_getRpcErrorMessage(transactionError)}
          dismiss={_dismissTransactionError}
        />
      )}
      {currentBalance && (
        <p>Your balance: {ethers.formatEther(currentBalance)} ETH</p>
      )}
    </main>
  );
}
