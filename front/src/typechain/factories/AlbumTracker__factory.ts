/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../common";
import type { AlbumTracker, AlbumTrackerInterface } from "../AlbumTracker";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_albumAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_albumIndex",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_stateNum",
        type: "uint256",
      },
    ],
    name: "AlbumStateChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "albums",
    outputs: [
      {
        internalType: "contract Album",
        name: "album",
        type: "address",
      },
      {
        internalType: "enum AlbumTracker.AlbumState",
        name: "state",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "title",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_price",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_title",
        type: "string",
      },
    ],
    name: "createAlbum",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "currentIndex",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_index",
        type: "uint256",
      },
    ],
    name: "triggerDelivery",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_index",
        type: "uint256",
      },
    ],
    name: "triggerPayment",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561000f575f80fd5b50338061003557604051631e4fbdf760e01b81525f600482015260240160405180910390fd5b61003e81610044565b50610093565b5f80546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b611129806100a05f395ff3fe60806040526004361062000083575f3560e01c80638da5cb5b11620000525780638da5cb5b1462000105578063cd31831e146200012d578063ea5df0591462000151578063f2fde38b1462000187575f80fd5b806326987b601462000087578063715018a614620000b1578063732a7c2514620000ca578063800fb83f14620000ee575b5f80fd5b34801562000093575f80fd5b506200009e60025481565b6040519081526020015b60405180910390f35b348015620000bd575f80fd5b50620000c8620001ab565b005b348015620000d6575f80fd5b50620000c8620000e8366004620006c6565b620001c2565b620000c8620000ff36600462000785565b620002f4565b34801562000111575f80fd5b505f546040516001600160a01b039091168152602001620000a8565b34801562000139575f80fd5b50620000c86200014b36600462000785565b62000471565b3480156200015d575f80fd5b50620001756200016f36600462000785565b6200051e565b604051620000a89493929190620007f6565b34801562000193575f80fd5b50620000c8620001a53660046200084c565b620005e4565b620001b562000627565b620001c05f62000655565b565b5f828260025430604051620001d790620006a4565b620001e694939291906200087b565b604051809103905ff08015801562000200573d5f803e3d5ffd5b50600280545f90815260016020819052604080832080546001600160a01b0319166001600160a01b03871617905583548352808320805460ff60a01b19169055835483528083209091018790558254825290209192500162000263838262000940565b50600280545f818152600160205260409020546001600160a01b038416927fe28e5c2e7d83020de68c591156a78def7a41d65e270662a5289df0d0e5021c4d9291600160a01b900460ff1690811115620002c157620002c16200079d565b6040805192835260208301919091520160405180910390a260028054905f620002ea8362000a0d565b9190505550505050565b5f8082815260016020526040902054600160a01b900460ff1660028111156200032157620003216200079d565b14620003745760405162461bcd60e51b815260206004820181905260248201527f5468697320616c62756d20697320616c7265616479207075726368617365642160448201526064015b60405180910390fd5b5f81815260016020819052604090912001543414620003d65760405162461bcd60e51b815260206004820152601d60248201527f576520616363657074206f6e6c792066756c6c207061796d656e74732100000060448201526064016200036b565b5f818152600160208190526040909120805460ff60a01b1916600160a01b835b02179055505f818152600160205260409020546001600160a01b038116907fe28e5c2e7d83020de68c591156a78def7a41d65e270662a5289df0d0e5021c4d908390600160a01b900460ff1660028111156200045657620004566200079d565b6040805192835260208301919091520160405180910390a250565b6200047b62000627565b60015f82815260016020526040902054600160a01b900460ff166002811115620004a957620004a96200079d565b14620004f85760405162461bcd60e51b815260206004820152601b60248201527f5468697320616c62756d206973206e6f74207061696420666f7221000000000060448201526064016200036b565b5f81815260016020526040902080546002919060ff60a01b1916600160a01b83620003f6565b600160208190525f91825260409091208054918101546002820180546001600160a01b03851694600160a01b900460ff169391906200055d90620008b6565b80601f01602080910402602001604051908101604052809291908181526020018280546200058b90620008b6565b8015620005da5780601f10620005b057610100808354040283529160200191620005da565b820191905f5260205f20905b815481529060010190602001808311620005bc57829003601f168201915b5050505050905084565b620005ee62000627565b6001600160a01b0381166200061957604051631e4fbdf760e01b81525f60048201526024016200036b565b620006248162000655565b50565b5f546001600160a01b03163314620001c05760405163118cdaa760e01b81523360048201526024016200036b565b5f80546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6106c18062000a3383390190565b634e487b7160e01b5f52604160045260245ffd5b5f8060408385031215620006d8575f80fd5b82359150602083013567ffffffffffffffff80821115620006f7575f80fd5b818501915085601f8301126200070b575f80fd5b813581811115620007205762000720620006b2565b604051601f8201601f19908116603f011681019083821181831017156200074b576200074b620006b2565b8160405282815288602084870101111562000764575f80fd5b826020860160208301375f6020848301015280955050505050509250929050565b5f6020828403121562000796575f80fd5b5035919050565b634e487b7160e01b5f52602160045260245ffd5b5f81518084525f5b81811015620007d757602081850181015186830182015201620007b9565b505f602082860101526020601f19601f83011685010191505092915050565b6001600160a01b03851681525f600385106200082057634e487b7160e01b5f52602160045260245ffd5b84602083015283604083015260806060830152620008426080830184620007b1565b9695505050505050565b5f602082840312156200085d575f80fd5b81356001600160a01b038116811462000874575f80fd5b9392505050565b848152608060208201525f620008956080830186620007b1565b6040830194909452506001600160a01b039190911660609091015292915050565b600181811c90821680620008cb57607f821691505b602082108103620008ea57634e487b7160e01b5f52602260045260245ffd5b50919050565b601f8211156200093b57805f5260205f20601f840160051c81016020851015620009175750805b601f840160051c820191505b8181101562000938575f815560010162000923565b50505b505050565b815167ffffffffffffffff8111156200095d576200095d620006b2565b62000975816200096e8454620008b6565b84620008f0565b602080601f831160018114620009ab575f8415620009935750858301515b5f19600386901b1c1916600185901b17855562000a05565b5f85815260208120601f198616915b82811015620009db57888601518255948401946001909101908401620009ba565b5085821015620009f957878501515f19600388901b60f8161c191681555b505060018460011b0185555b505050505050565b5f6001820162000a2b57634e487b7160e01b5f52601160045260245ffd5b506001019056fe608060405234801561000f575f80fd5b506040516106c13803806106c183398101604081905261002e9161009b565b5f849055600161003e8482610205565b50600391909155600480546001600160a01b0319166001600160a01b03909216919091179055506102c49050565b634e487b7160e01b5f52604160045260245ffd5b80516001600160a01b0381168114610096575f80fd5b919050565b5f805f80608085870312156100ae575f80fd5b8451602080870151919550906001600160401b03808211156100ce575f80fd5b818801915088601f8301126100e1575f80fd5b8151818111156100f3576100f361006c565b604051601f8201601f19908116603f0116810190838211818310171561011b5761011b61006c565b816040528281528b86848701011115610132575f80fd5b5f93505b828410156101535784840186015181850187015292850192610136565b5f8684830101528098505050505050506040850151915061017660608601610080565b905092959194509250565b600181811c9082168061019557607f821691505b6020821081036101b357634e487b7160e01b5f52602260045260245ffd5b50919050565b601f82111561020057805f5260205f20601f840160051c810160208510156101de5750805b601f840160051c820191505b818110156101fd575f81556001016101ea565b50505b505050565b81516001600160401b0381111561021e5761021e61006c565b6102328161022c8454610181565b846101b9565b602080601f831160018114610265575f841561024e5750858301515b5f19600386901b1c1916600185901b1785556102bc565b5f85815260208120601f198616915b8281101561029357888601518255948401946001909101908401610274565b50858210156102b057878501515f19600388901b60f8161c191681555b505060018460011b0185555b505050505050565b6103f0806102d15f395ff3fe608060405260043610610041575f3560e01c80632986c0e5146102015780634a79d50c14610229578063879f9c961461024a578063a035b1fe14610273575f80fd5b366101fd5760025460ff161561009e5760405162461bcd60e51b815260206004820181905260248201527f5468697320616c62756d20697320616c7265616479207075726368617365642160448201526064015b60405180910390fd5b345f54146100ee5760405162461bcd60e51b815260206004820152601d60248201527f576520616363657074206f6e6c792066756c6c207061796d656e7473210000006044820152606401610095565b60045460035460405160248101919091525f916001600160a01b031690349060440160408051601f198184030181529181526020820180516001600160e01b031663800fb83f60e01b179052516101459190610335565b5f6040518083038185875af1925050503d805f811461017f576040519150601f19603f3d011682016040523d82523d5f602084013e610184565b606091505b50509050806101eb5760405162461bcd60e51b815260206004820152602d60248201527f536f7272792c20776520636f756c64206e6f742070726f6365737320796f757260448201526c103a3930b739b0b1ba34b7b71760991b6064820152608401610095565b6002805460ff19166001908117909155005b5f80fd5b34801561020c575f80fd5b5061021660035481565b6040519081526020015b60405180910390f35b348015610234575f80fd5b5061023d610287565b6040516102209190610350565b348015610255575f80fd5b506002546102639060ff1681565b6040519015158152602001610220565b34801561027e575f80fd5b506102165f5481565b6001805461029490610382565b80601f01602080910402602001604051908101604052809291908181526020018280546102c090610382565b801561030b5780601f106102e25761010080835404028352916020019161030b565b820191905f5260205f20905b8154815290600101906020018083116102ee57829003601f168201915b505050505081565b5f5b8381101561032d578181015183820152602001610315565b50505f910152565b5f8251610346818460208701610313565b9190910192915050565b602081525f825180602084015261036e816040850160208701610313565b601f01601f19169190910160400192915050565b600181811c9082168061039657607f821691505b6020821081036103b457634e487b7160e01b5f52602260045260245ffd5b5091905056fea26469706673582212209462a4e06a100068706cbd05db2769e9d3333b8ad6004d32b94ce933b88d7b2d64736f6c63430008180033a2646970667358221220c547d80394271bfb54467bd30c8102606854e1d5df2159fc446d15b00519e15264736f6c63430008180033";

type AlbumTrackerConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: AlbumTrackerConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class AlbumTracker__factory extends ContractFactory {
  constructor(...args: AlbumTrackerConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {});
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      AlbumTracker & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): AlbumTracker__factory {
    return super.connect(runner) as AlbumTracker__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): AlbumTrackerInterface {
    return new Interface(_abi) as AlbumTrackerInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): AlbumTracker {
    return new Contract(address, _abi, runner) as unknown as AlbumTracker;
  }
}
