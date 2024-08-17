import React, { useState, useEffect, FormEvent } from "react";
import { CurrentConnectionProps } from "@/app/types/CurrentConnectionProps";
import { ethers } from "ethers";
import { AlbumProps } from "@/app/types/AlbumProps";

type useAddAlbumProps = {
    currentConnection: CurrentConnectionProps | undefined
    txBeingSent: string | undefined,
    setTxBeingSent: React.Dispatch<React.SetStateAction<string | undefined>>,
    setTransactionError: React.Dispatch<any>,
    setAlbums: React.Dispatch<React.SetStateAction<AlbumProps[]>>
    event: FormEvent<HTMLFormElement>
}

const useAddAlbum = async ({
    currentConnection,
    txBeingSent,
    setTxBeingSent,
    setTransactionError,
    setAlbums,
    event
}: useAddAlbumProps) => {

    event.preventDefault();

    if (!currentConnection?.shop) {
        return false;
    }

    const shop = currentConnection?.shop;
    const formData = new FormData(event.currentTarget);

    const title = formData.get("albumTitle")?.toString();
    const price = formData.get("albumPrice")?.toString();
    const quantity = formData.get("albumQty")?.toString();

    if (title && price && quantity) {
        //uid is formed by hashing the name of the album
        const uid = ethers.solidityPackedKeccak256(["string"], [title]);

        try {
            const index = await shop?.currentIndex();

            const addTx = await shop?.addAlbum(
                uid,
                title,
                BigInt(price),
                BigInt(quantity)
            );

            setTxBeingSent(addTx?.hash);

            await addTx?.wait();

            setAlbums((albums) => [
                ...albums,
                {
                    index,
                    uid,
                    title,
                    price,
                    quantity,
                },
            ]);
        } catch (err) {
            console.error(err);

            setTransactionError(err);
        } finally {
            setTxBeingSent(undefined);
        }
    }
};

export default useAddAlbum;