import React, { useState, useEffect, FormEvent } from "react";
import { CurrentConnectionProps } from "@/app/types/CurrentConnectionProps";
import { ethers } from "ethers";
import { AlbumProps } from "@/app/types/AlbumProps";

type useBuyAlbumProps = {
    album: AlbumProps,
    albums: AlbumProps[]
    currentConnection: CurrentConnectionProps | undefined,
    txBeingSent: string | undefined,
    setTxBeingSent: React.Dispatch<React.SetStateAction<string | undefined>>,
    setTransactionError: React.Dispatch<any>,
    setAlbums: React.Dispatch<React.SetStateAction<AlbumProps[]>>
    event: FormEvent<HTMLFormElement>
}

const useBuyAlbum = async ({
    album,
    albums,
    currentConnection,
    txBeingSent,
    setTxBeingSent,
    setTransactionError,
    setAlbums,
    event
}: useBuyAlbumProps) => {
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

export default useBuyAlbum;