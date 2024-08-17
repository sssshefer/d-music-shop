import React from "react";
import { CurrentConnectionProps } from "@/app/types/CurrentConnectionProps";
import ConnectWallet from "./ConnectWallet";
import { ethers } from "ethers";

type UserAccountProps = {
    currentConnection: CurrentConnectionProps | undefined;
    setNetworkError: React.Dispatch<React.SetStateAction<string | undefined>>;
    resetState: () => void;
    dismissNetworkError: React.MouseEventHandler<HTMLButtonElement>;
    networkError: string | undefined;
    setCurrentConnection:React.Dispatch<React.SetStateAction<CurrentConnectionProps | undefined>>,
    currentBalance:string|undefined
};

const UserAccount:
    React.FunctionComponent<UserAccountProps> = ({
        currentConnection,
        dismissNetworkError,
        networkError,
        setNetworkError,
        resetState,
        setCurrentConnection,
        currentBalance

    }) => {
        return (
            <div >
                {!currentConnection?.signer && (
                    <ConnectWallet
                        networkError={networkError}
                        dismiss={dismissNetworkError}
                        setNetworkError={setNetworkError}
                        resetState={resetState}
                        setCurrentConnection={setCurrentConnection}
                        currentConnection={currentConnection}
                    />
                )}

                {currentConnection?.signer && (
                    <p>Your address: {currentConnection.signer.address}</p>
                )}
                {currentBalance && (
        <p>Your balance: {ethers.formatEther(currentBalance)} ETH</p>
      )}
            </div>
        );
    };

export default UserAccount;