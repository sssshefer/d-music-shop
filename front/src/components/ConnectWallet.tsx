import React from "react";
import NetworkErrorMessage from "./NetworkErrorMessage";
import { ethers } from "ethers";
import { CurrentConnectionProps } from "../app/types/CurrentConnectionProps";
import { MusicShop__factory } from "@/typechain";

type ConnectWalletProps = {
    currentConnection:CurrentConnectionProps|undefined;
    dismiss: React.MouseEventHandler<HTMLButtonElement>;
    networkError: string | undefined;
    setNetworkError: React.Dispatch<React.SetStateAction<string | undefined>>;
    resetState: ()=>void;
    setCurrentConnection:React.Dispatch<React.SetStateAction<CurrentConnectionProps | undefined>>
};
const MUSIC_SHOP_ADDRESS = "0x5fbdb2315678afecb367f032d93f642f64180aa3";

declare let window: any;
const HARDHAT_NETWORK_ID = "0x539";

const ConnectWallet: React.FunctionComponent<ConnectWalletProps> = ({
    networkError,
    dismiss,
    setNetworkError,
    resetState,
    setCurrentConnection,
    currentConnection
}) => {

    const connectWallet = async () => {
        //check if metamask is installed in browser
        if (window.ethereum === undefined) {
            setNetworkError("Please install Metamask!");

            return;
        }

        //check Hardhat network is used
        if (!(await checkNetwork())) {
            return;
        }

        //get accounts from Metamask
        const [selectedAccount] = await window.ethereum.request({
            method: "eth_requestAccounts",
        });

        await initializeUser(ethers.getAddress(selectedAccount));

        window.ethereum.on(
            "accountsChanged",
            async ([newAccount]: [newAccount: string]) => {
                if (newAccount === undefined) {
                    return resetState();
                }

                await initializeUser(ethers.getAddress(newAccount));
            }
        )

        window.ethereum.on("chainChanged", ([_networkId]: any) => {
            resetState();
        })
    }

    async function checkNetwork(): Promise<boolean> {
        const chosenChainId = await window.ethereum.request({
            method: "eth_chainId"
        });

        if (chosenChainId === HARDHAT_NETWORK_ID)
            return true;

        setNetworkError("Please connect to Hardhat network (localhost:8545)!");

        return false;
    }

    const initializeUser = async (selectedAccount: string) => {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner(selectedAccount);

        setCurrentConnection({
            ...currentConnection,
            provider,
            signer,
            shop: MusicShop__factory.connect(MUSIC_SHOP_ADDRESS, signer),
        });
    };

    return (
        <>
            <div>
                {networkError && (
                    <NetworkErrorMessage message={networkError} dismiss={dismiss} />
                )}
            </div>

            <p>Please connect your account...</p>
            <button type="button" onClick={connectWallet}>
                Connect wallet
            </button>
        </>
    );
};

export default ConnectWallet;