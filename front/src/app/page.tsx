"use client";

import React, { useState, useEffect, FormEvent } from "react";
import { ethers } from "ethers";

import { AlbumProps } from "./types/AlbumProps";
import { CurrentConnectionProps } from "./types/CurrentConnectionProps";

import WaitingForTransactionMessage from "@/components/WaitingForTransactionMessage";
import TransactionErrorMessage from "@/components/TransactionErrorMessage";
import UserAccount from "@/components/UserAccount";
import AlbumsList from "@/components/AlbumsList";
import AddAlbumForm from "@/components/AddAlbumForm";

import useAddAlbum from "@/hooks/useAddAlbum";
import useBuyAlbum from "@/hooks/useBuyAlbum";

import { allAlbumsMapper } from "@/utils/allAlbumsMapper";

export default function Home() {
  const [networkError, setNetworkError] = useState<string>();
  const [transactionError, setTransactionError] = useState<any>();
  const [txBeingSent, setTxBeingSent] = useState<string>();
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [albums, setAlbums] = useState<AlbumProps[]>([]);
  const [currentConnection, setCurrentConnection] = useState<CurrentConnectionProps>();

  useEffect(() => {
    (async () => {
      if (currentConnection?.shop && currentConnection.signer) {
        const newAlbums = allAlbumsMapper(await currentConnection.shop.allAlbums())

        setAlbums(newAlbums);
        setIsOwner(
          ethers.getAddress(await currentConnection.shop.owner()) ===
          (await currentConnection.signer.getAddress())
        )
      }
    })()
  }, [currentConnection])

  const resetState = (): void => {
    setNetworkError(undefined);
    setCurrentConnection({
      provider: undefined,
      signer: undefined,
      shop: undefined,
    });
    setTxBeingSent(undefined);
    setTransactionError(undefined);
    setIsOwner(false);
    setAlbums([])
  };

  const dismissNetworkError = () => {
    setNetworkError(undefined);
  };

  const dismissTransactionError = () => {
    setTransactionError(undefined);
  };

  const getRpcErrorMessage = (error: any): string => {
    console.log(error);
    if (error.data) {
      return error.data.message;
    }

    return error.message;
  };

  const addAlbum = async (event: FormEvent<HTMLFormElement>) =>
    await useAddAlbum({
      currentConnection,
      txBeingSent,
      setTxBeingSent,
      setTransactionError,
      setAlbums,
      event
    });

  const handleBuyAlbum = async (album: AlbumProps, event: FormEvent<HTMLFormElement>) =>
    useBuyAlbum({
      album,
      albums,
      currentConnection,
      txBeingSent,
      setTxBeingSent,
      setTransactionError,
      setAlbums,
      event
    })

  return (
    <main>
      <UserAccount
        currentConnection={currentConnection}
        setNetworkError={setNetworkError}
        resetState={resetState}
        dismissNetworkError={dismissNetworkError}
        networkError={networkError}
        setCurrentConnection={setCurrentConnection}
        txBeingSent={txBeingSent}
      />

      {txBeingSent &&
        <WaitingForTransactionMessage txHash={txBeingSent} />}

      {transactionError &&
        <TransactionErrorMessage
          message={getRpcErrorMessage(transactionError)}
          dismiss={dismissTransactionError}
        />
      }

      <AlbumsList albums={albums} handleBuyAlbum={handleBuyAlbum} />

      {isOwner && !txBeingSent && (
        <AddAlbumForm addAlbum={addAlbum} />
      )}
    </main>
  );
}
