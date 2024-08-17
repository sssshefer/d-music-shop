import type { BrowserProvider } from "ethers";
import type { Album, MusicShop } from "@/typechain";
import { ethers } from "ethers";

export type CurrentConnectionProps = {
    provider: BrowserProvider | undefined;
    shop: MusicShop | undefined;
    signer: ethers.JsonRpcSigner | undefined;
  };