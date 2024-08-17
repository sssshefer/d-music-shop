import { ethers } from "ethers";

export type AlbumProps = {
    index: ethers.BigNumberish;
    uid: string;
    title: string;
    price: ethers.BigNumberish;
    quantity: ethers.BigNumberish;
};