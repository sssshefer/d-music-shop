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
  const availableAlbums = () => {
    const albumsList = albums.map((album) => {
      return (
        <li key={album.uid}>
          <>
            {album.title} (#{album.index.toString()})<br />
            Price: {album.price.toString()}
            <br />
            Items left: {album.quantity.toString()}
            <br />
            {BigInt(album.quantity) > BigInt(0) && (
              <button onClick={(e) => handleBuyAlbum(album, e)}>
                Buy 1 copy
              </button>
            )}
          </>
        </li>
      );
    });

    return albumsList;
  };

  return (
    <main>
      <UserAccount currentConnection={currentConnection} setNetworkError={setNetworkError} resetState={resetState} dismissNetworkError={dismissNetworkError}
        networkError={networkError} setCurrentConnection={setCurrentConnection} />
      {txBeingSent && <WaitingForTransactionMessage txHash={txBeingSent} />}
      {transactionError && (
        <TransactionErrorMessage
          message={getRpcErrorMessage(transactionError)}
          dismiss={dismissTransactionError}
        />
      )}
      {currentBalance && (
        <p>Your balance: {ethers.formatEther(currentBalance)} ETH</p>
      )}

      {albums.length > 0 && <ul>{availableAlbums()}</ul>}

      {isOwner && !txBeingSent && (
        <form onSubmit={addAlbum}>
          <h2>Add album</h2>

          <label>
            Title:
            <input type="text" name="albumTitle" />
          </label>

          <label>
            Price:
            <input type="text" name="albumPrice" />
          </label>

          <label>
            Quantity:
            <input type="text" name="albumQty" />
          </label>

          <input type="submit" value="Add!" />
        </form>
      )}
    </main>
  );
}
