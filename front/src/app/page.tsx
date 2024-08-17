"use client";

import React, { useState, useEffect, FormEvent } from "react";
import { ethers } from "ethers";
import WaitingForTransactionMessage from "@/components/WaitingForTransactionMessage";
import TransactionErrorMessage from "@/components/TransactionErrorMessage";
import "./style.css"
import UserAccount from "@/components/UserAccount";

import { AlbumProps } from "./types/AlbumProps";
import { CurrentConnectionProps } from "./types/CurrentConnectionProps";
import useAddAlbum from "@/hooks/useAddAlbum";
import AlbumsList from "@/components/AlbumsList";
import AddAlbumForm from "@/components/AddAlbumForm";

export default function Home() {
  const [networkError, setNetworkError] = useState<string>();
  const [transactionError, setTransactionError] = useState<any>();
  const [txBeingSent, setTxBeingSent] = useState<string>();
  const [currentBalance, setCurrentBalance] = useState<string>();
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [albums, setAlbums] = useState<AlbumProps[]>([]);

  const [currentConnection, setCurrentConnection] = useState<CurrentConnectionProps>();

  useEffect(() => {
    (async () => {
      if (currentConnection?.provider && currentConnection.signer) {
        setCurrentBalance(
          (
            await currentConnection.provider.getBalance(
              currentConnection.signer.address,
              await currentConnection.provider.getBlockNumber()
            )
          ).toString()

        )
      }
    })();
  }, [currentConnection, txBeingSent])

  useEffect(() => {
    (async () => {
      if (currentConnection?.shop && currentConnection.signer) {
        const newAlbums = (await currentConnection.shop.allAlbums()).map(
          (album): AlbumProps => {
            return {
              index: album[0].toString(),
              uid: album[1],
              title: album[2],
              price: album[3],
              quantity: album[4],
            };
          }
        );

        setAlbums((albums) => [...albums, ...newAlbums]);

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
    setCurrentBalance(undefined);
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

  const handleBuyAlbum = async (
    album: AlbumProps,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    if (!currentConnection?.shop) {
      return false;
    }

    try {
      const buyTx = await currentConnection.shop.buy(album.index, { value: album.price });
      setTxBeingSent(buyTx.hash);
      await buyTx.wait();

      setAlbums(
        albums.map((a) => {
          if (a.index === album.index) {
            album.quantity =
              BigInt(album.quantity) - BigInt(1);
            return album;
          } else {
            return a;
          }
        })
      );
    } catch (err) {
      console.error(err);

      setTransactionError(err);
    } finally {
      setTxBeingSent(undefined);
    }
  };

  return (
    <main>
      <UserAccount
        currentConnection={currentConnection}
        setNetworkError={setNetworkError}
        resetState={resetState}
        dismissNetworkError={dismissNetworkError}
        networkError={networkError}
        setCurrentConnection={setCurrentConnection}
        currentBalance={currentBalance}
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
        <AddAlbumForm addAlbum={addAlbum}/>
      )}
    </main>
  );
}
