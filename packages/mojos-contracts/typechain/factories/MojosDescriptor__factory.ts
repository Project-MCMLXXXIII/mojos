/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";

import type { MojosDescriptor } from "../MojosDescriptor";

export class MojosDescriptor__factory extends ContractFactory {
  constructor(
    linkLibraryAddresses: MojosDescriptorLibraryAddresses,
    signer?: Signer
  ) {
    super(
      _abi,
      MojosDescriptor__factory.linkBytecode(linkLibraryAddresses),
      signer
    );
  }

  static linkBytecode(
    linkLibraryAddresses: MojosDescriptorLibraryAddresses
  ): string {
    let linkedBytecode = _bytecode;

    linkedBytecode = linkedBytecode.replace(
      new RegExp("__\\$e1d8844a0810dc0e87a665b1f2b5fa7c69\\$__", "g"),
      linkLibraryAddresses["__$e1d8844a0810dc0e87a665b1f2b5fa7c69$__"]
        .replace(/^0x/, "")
        .toLowerCase()
    );

    return linkedBytecode;
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<MojosDescriptor> {
    return super.deploy(overrides || {}) as Promise<MojosDescriptor>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): MojosDescriptor {
    return super.attach(address) as MojosDescriptor;
  }
  connect(signer: Signer): MojosDescriptor__factory {
    return super.connect(signer) as MojosDescriptor__factory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): MojosDescriptor {
    return new Contract(address, _abi, signerOrProvider) as MojosDescriptor;
  }
}

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "baseURI",
        type: "string",
      },
    ],
    name: "BaseURIUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bool",
        name: "enabled",
        type: "bool",
      },
    ],
    name: "DataURIToggled",
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
    anonymous: false,
    inputs: [],
    name: "PartsLocked",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_background",
        type: "string",
      },
    ],
    name: "addBackground",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "_body",
        type: "bytes",
      },
    ],
    name: "addBody",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "_bodyAccessory",
        type: "bytes",
      },
    ],
    name: "addBodyAccessory",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "_paletteIndex",
        type: "uint8",
      },
      {
        internalType: "string",
        name: "_color",
        type: "string",
      },
    ],
    name: "addColorToPalette",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "_face",
        type: "bytes",
      },
    ],
    name: "addFace",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "_headAccessory",
        type: "bytes",
      },
    ],
    name: "addHeadAccessory",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string[]",
        name: "_backgrounds",
        type: "string[]",
      },
    ],
    name: "addManyBackgrounds",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes[]",
        name: "_bodies",
        type: "bytes[]",
      },
    ],
    name: "addManyBodies",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes[]",
        name: "_bodyAccessories",
        type: "bytes[]",
      },
    ],
    name: "addManyBodyAccessories",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "paletteIndex",
        type: "uint8",
      },
      {
        internalType: "string[]",
        name: "newColors",
        type: "string[]",
      },
    ],
    name: "addManyColorsToPalette",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes[]",
        name: "_faces",
        type: "bytes[]",
      },
    ],
    name: "addManyFaces",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes[]",
        name: "_headAccessories",
        type: "bytes[]",
      },
    ],
    name: "addManyHeadAccessories",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "arePartsLocked",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "backgroundCount",
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
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "backgrounds",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "baseURI",
    outputs: [
      {
        internalType: "string",
        name: "",
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
        name: "",
        type: "uint256",
      },
    ],
    name: "bodies",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "bodyAccessories",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "bodyAccessoryCount",
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
    name: "bodyCount",
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
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "uint48",
            name: "background",
            type: "uint48",
          },
          {
            internalType: "uint48",
            name: "body",
            type: "uint48",
          },
          {
            internalType: "uint48",
            name: "bodyAccessory",
            type: "uint48",
          },
          {
            internalType: "uint48",
            name: "face",
            type: "uint48",
          },
          {
            internalType: "uint48",
            name: "headAccessory",
            type: "uint48",
          },
        ],
        internalType: "struct IMojosSeeder.Seed",
        name: "seed",
        type: "tuple",
      },
    ],
    name: "dataURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "faceCount",
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
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "faces",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint48",
            name: "background",
            type: "uint48",
          },
          {
            internalType: "uint48",
            name: "body",
            type: "uint48",
          },
          {
            internalType: "uint48",
            name: "bodyAccessory",
            type: "uint48",
          },
          {
            internalType: "uint48",
            name: "face",
            type: "uint48",
          },
          {
            internalType: "uint48",
            name: "headAccessory",
            type: "uint48",
          },
        ],
        internalType: "struct IMojosSeeder.Seed",
        name: "seed",
        type: "tuple",
      },
    ],
    name: "generateSVGImage",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        components: [
          {
            internalType: "uint48",
            name: "background",
            type: "uint48",
          },
          {
            internalType: "uint48",
            name: "body",
            type: "uint48",
          },
          {
            internalType: "uint48",
            name: "bodyAccessory",
            type: "uint48",
          },
          {
            internalType: "uint48",
            name: "face",
            type: "uint48",
          },
          {
            internalType: "uint48",
            name: "headAccessory",
            type: "uint48",
          },
        ],
        internalType: "struct IMojosSeeder.Seed",
        name: "seed",
        type: "tuple",
      },
    ],
    name: "genericDataURI",
    outputs: [
      {
        internalType: "string",
        name: "",
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
        name: "",
        type: "uint256",
      },
    ],
    name: "headAccessories",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "headAccessoryCount",
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
    name: "isDataURIEnabled",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "lockParts",
    outputs: [],
    stateMutability: "nonpayable",
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
    inputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "palettes",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
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
        internalType: "string",
        name: "_baseURI",
        type: "string",
      },
    ],
    name: "setBaseURI",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "toggleDataURIEnabled",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "uint48",
            name: "background",
            type: "uint48",
          },
          {
            internalType: "uint48",
            name: "body",
            type: "uint48",
          },
          {
            internalType: "uint48",
            name: "bodyAccessory",
            type: "uint48",
          },
          {
            internalType: "uint48",
            name: "face",
            type: "uint48",
          },
          {
            internalType: "uint48",
            name: "headAccessory",
            type: "uint48",
          },
        ],
        internalType: "struct IMojosSeeder.Seed",
        name: "seed",
        type: "tuple",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
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
];

const _bytecode =
  "0x60806040526000805460ff60a81b1916600160a81b17905534801561002357600080fd5b5061002d33610032565b610082565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b612c1a80620000926000396000f3fe608060405234801561001057600080fd5b506004361061025c5760003560e01c806387db11bd11610145578063ce2f4f53116100bd578063dfe8478b1161008c578063f2fde38b11610071578063f2fde38b146104dd578063f9da8863146104f0578063fc9342941461050357600080fd5b8063dfe8478b146104cd578063eba81806146104d557600080fd5b8063ce2f4f5314610479578063cf755ed71461049f578063d1e83673146104b2578063da7de207146104ba57600080fd5b8063a30ce3c011610114578063ae6f4467116100f9578063ae6f44671461044b578063b5d90ed51461045e578063ba131b301461047157600080fd5b8063a30ce3c014610425578063a69ce27d1461043857600080fd5b806387db11bd146103c45780638a85a1e8146103d75780638da5cb5b146103ea57806391b7916a1461041257600080fd5b806355f804b3116101d8578063638ac270116101a7578063715018a61161018c578063715018a614610374578063773b97711461037c578063839644da146103b157600080fd5b8063638ac270146103595780636c0360eb1461036c57600080fd5b806355f804b314610318578063598fa9da1461032b5780635e2d03071461033e5780635e70664c1461034657600080fd5b80632ea043001161022f5780633fa5fe36116102145780633fa5fe36146102e057806344cee73c146102f35780634531c0a81461030657600080fd5b80632ea04300146102ba5780633cfdafd3146102cd57600080fd5b806303f61f551461026157806304bde4dd146102765780632715c90e1461029f5780632a1d0769146102b2575b600080fd5b61027461026f3660046123bd565b610516565b005b6102896102843660046124f2565b6105fb565b604051610296919061281e565b60405180910390f35b6102746102ad3660046123bd565b6106a7565b610274610783565b6102896102c83660046124d6565b6108bd565b6102896102db36600461250b565b610a26565b6102896102ee3660046124f2565b610a92565b6102896103013660046124f2565b610aa2565b6003545b604051908152602001610296565b6102746103263660046123bd565b610ab2565b6102896103393660046125d1565b610b63565b60055461030a565b6102746103543660046123bd565b610b9b565b61028961036736600461250b565b610c77565b610289610ce3565b610274610cf0565b6000546103a19074010000000000000000000000000000000000000000900460ff1681565b6040519015158152602001610296565b6102746103bf366004612538565b610d63565b6102896103d2366004612461565b610eb0565b6102746103e536600461237b565b611027565b60005460405173ffffffffffffffffffffffffffffffffffffffff9091168152602001610296565b61027461042036600461237b565b611147565b61027461043336600461237b565b611262565b61027461044636600461237b565b61137d565b6102896104593660046124f2565b611498565b61027461046c3660046123bd565b6114a8565b60065461030a565b6000546103a1907501000000000000000000000000000000000000000000900460ff1681565b6102746104ad3660046123bd565b611584565b60075461030a565b6102896104c83660046124f2565b611660565b610274611670565b60045461030a565b6102746104eb366004612345565b61175a565b6102746104fe36600461258b565b611856565b61027461051136600461237b565b611950565b60005473ffffffffffffffffffffffffffffffffffffffff1633146105825760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064015b60405180910390fd5b60005474010000000000000000000000000000000000000000900460ff16156105ed5760405162461bcd60e51b815260206004820152601060248201527f506172747320617265206c6f636b6564000000000000000000000000000000006044820152606401610579565b6105f78282611a6b565b5050565b6003818154811061060b57600080fd5b90600052602060002001600091509050805461062690612a87565b80601f016020809104026020016040519081016040528092919081815260200182805461065290612a87565b801561069f5780601f106106745761010080835404028352916020019161069f565b820191906000526020600020905b81548152906001019060200180831161068257829003601f168201915b505050505081565b60005473ffffffffffffffffffffffffffffffffffffffff16331461070e5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610579565b60005474010000000000000000000000000000000000000000900460ff16156107795760405162461bcd60e51b815260206004820152601060248201527f506172747320617265206c6f636b6564000000000000000000000000000000006044820152606401610579565b6105f78282611aa8565b60005473ffffffffffffffffffffffffffffffffffffffff1633146107ea5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610579565b60005474010000000000000000000000000000000000000000900460ff16156108555760405162461bcd60e51b815260206004820152601060248201527f506172747320617265206c6f636b6564000000000000000000000000000000006044820152606401610579565b600080547fffffffffffffffffffffff00ffffffffffffffffffffffffffffffffffffffff16740100000000000000000000000000000000000000001781556040517f1680ee6d421f70ed6030d2fc4fcb50217a5dd617858d56562b119eca59172e579190a1565b6060600060405180604001604052806108d585611ae5565b81526020016003856000015165ffffffffffff16815481106108f9576108f9612b86565b90600052602060002001805461090e90612a87565b80601f016020809104026020016040519081016040528092919081815260200182805461093a90612a87565b80156109875780601f1061095c57610100808354040283529160200191610987565b820191906000526020600020905b81548152906001019060200180831161096a57829003601f168201915b5050505050815250905073__$e1d8844a0810dc0e87a665b1f2b5fa7c69$__6366b8c2418260026040518363ffffffff1660e01b81526004016109cb929190612860565b60006040518083038186803b1580156109e357600080fd5b505af41580156109f7573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052610a1f91908101906123f3565b9392505050565b6000546060907501000000000000000000000000000000000000000000900460ff1615610a5e57610a578383610c77565b9050610a8c565b6001610a6984611e5e565b604051602001610a7a929190612698565b60405160208183030381529060405290505b92915050565b6005818154811061060b57600080fd5b6004818154811061060b57600080fd5b60005473ffffffffffffffffffffffffffffffffffffffff163314610b195760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610579565b610b25600183836120ed565b507f6741b2fc379fad678116fe3d4d4b9a1a184ab53ba36b86ad0fa66340b1ab41ad8282604051610b57929190612831565b60405180910390a15050565b60026020528160005260406000208181548110610b7f57600080fd5b9060005260206000200160009150915050805461062690612a87565b60005473ffffffffffffffffffffffffffffffffffffffff163314610c025760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610579565b60005474010000000000000000000000000000000000000000900460ff1615610c6d5760405162461bcd60e51b815260206004820152601060248201527f506172747320617265206c6f636b6564000000000000000000000000000000006044820152606401610579565b6105f78282611f98565b60606000610c8484611e5e565b9050600081604051602001610c99919061276d565b6040516020818303038152906040529050600082604051602001610cbd91906127b2565b6040516020818303038152906040529050610cd9828287610eb0565b9695505050505050565b6001805461062690612a87565b60005473ffffffffffffffffffffffffffffffffffffffff163314610d575760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610579565b610d616000611fd5565b565b60005473ffffffffffffffffffffffffffffffffffffffff163314610dca5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610579565b60ff831660009081526002602052604090205461010090610dec908390612a18565b1115610e605760405162461bcd60e51b815260206004820152602160248201527f50616c65747465732063616e206f6e6c7920686f6c642032353620636f6c6f7260448201527f73000000000000000000000000000000000000000000000000000000000000006064820152608401610579565b60005b81811015610eaa57610e9884848484818110610e8157610e81612b86565b9050602002810190610e93919061295a565b61204a565b80610ea281612adb565b915050610e63565b50505050565b606060006040518060800160405280868152602001858152602001610ed485611ae5565b81526020016003856000015165ffffffffffff1681548110610ef857610ef8612b86565b906000526020600020018054610f0d90612a87565b80601f0160208091040260200160405190810160405280929190818152602001828054610f3990612a87565b8015610f865780601f10610f5b57610100808354040283529160200191610f86565b820191906000526020600020905b815481529060010190602001808311610f6957829003601f168201915b5050505050815250905073__$e1d8844a0810dc0e87a665b1f2b5fa7c69$__63bf1deae28260026040518363ffffffff1660e01b8152600401610fca9291906128c7565b60006040518083038186803b158015610fe257600080fd5b505af4158015610ff6573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261101e91908101906123f3565b95945050505050565b60005473ffffffffffffffffffffffffffffffffffffffff16331461108e5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610579565b60005474010000000000000000000000000000000000000000900460ff16156110f95760405162461bcd60e51b815260206004820152601060248201527f506172747320617265206c6f636b6564000000000000000000000000000000006044820152606401610579565b60005b818110156111425761113083838381811061111957611119612b86565b905060200281019061112b919061295a565b611aa8565b8061113a81612adb565b9150506110fc565b505050565b60005473ffffffffffffffffffffffffffffffffffffffff1633146111ae5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610579565b60005474010000000000000000000000000000000000000000900460ff16156112195760405162461bcd60e51b815260206004820152601060248201527f506172747320617265206c6f636b6564000000000000000000000000000000006044820152606401610579565b60005b818110156111425761125083838381811061123957611239612b86565b905060200281019061124b919061295a565b611f98565b8061125a81612adb565b91505061121c565b60005473ffffffffffffffffffffffffffffffffffffffff1633146112c95760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610579565b60005474010000000000000000000000000000000000000000900460ff16156113345760405162461bcd60e51b815260206004820152601060248201527f506172747320617265206c6f636b6564000000000000000000000000000000006044820152606401610579565b60005b818110156111425761136b83838381811061135457611354612b86565b9050602002810190611366919061295a565b611a6b565b8061137581612adb565b915050611337565b60005473ffffffffffffffffffffffffffffffffffffffff1633146113e45760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610579565b60005474010000000000000000000000000000000000000000900460ff161561144f5760405162461bcd60e51b815260206004820152601060248201527f506172747320617265206c6f636b6564000000000000000000000000000000006044820152606401610579565b60005b818110156111425761148683838381811061146f5761146f612b86565b9050602002810190611481919061295a565b612077565b8061149081612adb565b915050611452565b6007818154811061060b57600080fd5b60005473ffffffffffffffffffffffffffffffffffffffff16331461150f5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610579565b60005474010000000000000000000000000000000000000000900460ff161561157a5760405162461bcd60e51b815260206004820152601060248201527f506172747320617265206c6f636b6564000000000000000000000000000000006044820152606401610579565b6105f782826120b4565b60005473ffffffffffffffffffffffffffffffffffffffff1633146115eb5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610579565b60005474010000000000000000000000000000000000000000900460ff16156116565760405162461bcd60e51b815260206004820152601060248201527f506172747320617265206c6f636b6564000000000000000000000000000000006044820152606401610579565b6105f78282612077565b6006818154811061060b57600080fd5b60005473ffffffffffffffffffffffffffffffffffffffff1633146116d75760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610579565b600080547fffffffffffffffffffff00ffffffffffffffffffffffffffffffffffffffffff811675010000000000000000000000000000000000000000009182900460ff1615918202179091556040518181527f360c3d72ee193226275b842f85231c259c934e85459fed80fa68e502ffa9dbde9060200160405180910390a150565b60005473ffffffffffffffffffffffffffffffffffffffff1633146117c15760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610579565b73ffffffffffffffffffffffffffffffffffffffff811661184a5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201527f64647265737300000000000000000000000000000000000000000000000000006064820152608401610579565b61185381611fd5565b50565b60005473ffffffffffffffffffffffffffffffffffffffff1633146118bd5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610579565b60ff83811660009081526002602052604090205411156119455760405162461bcd60e51b815260206004820152602160248201527f50616c65747465732063616e206f6e6c7920686f6c642032353620636f6c6f7260448201527f73000000000000000000000000000000000000000000000000000000000000006064820152608401610579565b61114283838361204a565b60005473ffffffffffffffffffffffffffffffffffffffff1633146119b75760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610579565b60005474010000000000000000000000000000000000000000900460ff1615611a225760405162461bcd60e51b815260206004820152601060248201527f506172747320617265206c6f636b6564000000000000000000000000000000006044820152606401610579565b60005b8181101561114257611a59838383818110611a4257611a42612b86565b9050602002810190611a54919061295a565b6120b4565b80611a6381612adb565b915050611a25565b60068054600181018255600091909152611142907ff652222313e28459528d920b65115c16c04f3efc82aaedc97be59f3f377c0d3f0183836120ed565b60048054600181018255600091909152611142907f8a35acfbc15ff81a39ae7d344fd709f28e8600b4aa8c65c6b64bfe7fe36bd19b0183836120ed565b60408051600480825260a0820190925260609160009190816020015b6060815260200190600190039081611b015790505090506004836020015165ffffffffffff1681548110611b3757611b37612b86565b906000526020600020018054611b4c90612a87565b80601f0160208091040260200160405190810160405280929190818152602001828054611b7890612a87565b8015611bc55780601f10611b9a57610100808354040283529160200191611bc5565b820191906000526020600020905b815481529060010190602001808311611ba857829003601f168201915b505050505081600081518110611bdd57611bdd612b86565b60200260200101819052506005836040015165ffffffffffff1681548110611c0757611c07612b86565b906000526020600020018054611c1c90612a87565b80601f0160208091040260200160405190810160405280929190818152602001828054611c4890612a87565b8015611c955780601f10611c6a57610100808354040283529160200191611c95565b820191906000526020600020905b815481529060010190602001808311611c7857829003601f168201915b505050505081600181518110611cad57611cad612b86565b60200260200101819052506006836060015165ffffffffffff1681548110611cd757611cd7612b86565b906000526020600020018054611cec90612a87565b80601f0160208091040260200160405190810160405280929190818152602001828054611d1890612a87565b8015611d655780601f10611d3a57610100808354040283529160200191611d65565b820191906000526020600020905b815481529060010190602001808311611d4857829003601f168201915b505050505081600281518110611d7d57611d7d612b86565b60200260200101819052506007836080015165ffffffffffff1681548110611da757611da7612b86565b906000526020600020018054611dbc90612a87565b80601f0160208091040260200160405190810160405280929190818152602001828054611de890612a87565b8015611e355780601f10611e0a57610100808354040283529160200191611e35565b820191906000526020600020905b815481529060010190602001808311611e1857829003601f168201915b505050505081600381518110611e4d57611e4d612b86565b602090810291909101015292915050565b606081611e9e57505060408051808201909152600181527f3000000000000000000000000000000000000000000000000000000000000000602082015290565b8160005b8115611ec85780611eb281612adb565b9150611ec19050600a83612a30565b9150611ea2565b60008167ffffffffffffffff811115611ee357611ee3612bb5565b6040519080825280601f01601f191660200182016040528015611f0d576020820181803683370190505b5090505b8415611f9057611f22600183612a44565b9150611f2f600a86612b14565b611f3a906030612a18565b60f81b818381518110611f4f57611f4f612b86565b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350611f89600a86612a30565b9450611f11565b949350505050565b60038054600181018255600091909152611142907fc2575a0e9e593c00f959f8c92f12db2869c3395a3b0502d05e2516446f71f85b0183836120ed565b6000805473ffffffffffffffffffffffffffffffffffffffff8381167fffffffffffffffffffffffff0000000000000000000000000000000000000000831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b60ff83166000908152600260209081526040822080546001810182559083529120610eaa910183836120ed565b60078054600181018255600091909152611142907fa66cc928b5edb82af9bd49922954155ab7b0942694bea4ce44661d9a8736c6880183836120ed565b60058054600181018255600091909152611142907f036b6384b5eca791c62761152d0c79bb0604c104a5fb6f4eb0703f3154bb3db00183835b8280546120f990612a87565b90600052602060002090601f01602090048101928261211b576000855561217f565b82601f10612152578280017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0082351617855561217f565b8280016001018555821561217f579182015b8281111561217f578235825591602001919060010190612164565b5061218b92915061218f565b5090565b5b8082111561218b5760008155600101612190565b60008083601f8401126121b657600080fd5b50813567ffffffffffffffff8111156121ce57600080fd5b6020830191508360208260051b85010111156121e957600080fd5b9250929050565b60008083601f84011261220257600080fd5b50813567ffffffffffffffff81111561221a57600080fd5b6020830191508360208285010111156121e957600080fd5b600082601f83011261224357600080fd5b8135612256612251826129f0565b6129bf565b81815284602083860101111561226b57600080fd5b816020850160208301376000918101602001919091529392505050565b600060a0828403121561229a57600080fd5b60405160a0810181811067ffffffffffffffff821117156122bd576122bd612bb5565b6040529050806122cc83612319565b81526122da60208401612319565b60208201526122eb60408401612319565b60408201526122fc60608401612319565b606082015261230d60808401612319565b60808201525092915050565b803565ffffffffffff8116811461232f57600080fd5b919050565b803560ff8116811461232f57600080fd5b60006020828403121561235757600080fd5b813573ffffffffffffffffffffffffffffffffffffffff81168114610a1f57600080fd5b6000806020838503121561238e57600080fd5b823567ffffffffffffffff8111156123a557600080fd5b6123b1858286016121a4565b90969095509350505050565b600080602083850312156123d057600080fd5b823567ffffffffffffffff8111156123e757600080fd5b6123b1858286016121f0565b60006020828403121561240557600080fd5b815167ffffffffffffffff81111561241c57600080fd5b8201601f8101841361242d57600080fd5b805161243b612251826129f0565b81815285602083850101111561245057600080fd5b61101e826020830160208601612a5b565b600080600060e0848603121561247657600080fd5b833567ffffffffffffffff8082111561248e57600080fd5b61249a87838801612232565b945060208601359150808211156124b057600080fd5b506124bd86828701612232565b9250506124cd8560408601612288565b90509250925092565b600060a082840312156124e857600080fd5b610a1f8383612288565b60006020828403121561250457600080fd5b5035919050565b60008060c0838503121561251e57600080fd5b8235915061252f8460208501612288565b90509250929050565b60008060006040848603121561254d57600080fd5b61255684612334565b9250602084013567ffffffffffffffff81111561257257600080fd5b61257e868287016121a4565b9497909650939450505050565b6000806000604084860312156125a057600080fd5b6125a984612334565b9250602084013567ffffffffffffffff8111156125c557600080fd5b61257e868287016121f0565b600080604083850312156125e457600080fd5b6125ed83612334565b946020939093013593505050565b600081518084526020808501808196508360051b8101915082860160005b85811015612643578284038952612631848351612650565b98850198935090840190600101612619565b5091979650505050505050565b60008151808452612668816020860160208601612a5b565b601f01601f19169290920160200192915050565b6000815161268e818560208601612a5b565b9290920192915050565b600080845481600182811c9150808316806126b457607f831692505b60208084108214156126ed577f4e487b710000000000000000000000000000000000000000000000000000000086526022600452602486fd5b81801561270157600181146127305761275d565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0086168952848901965061275d565b60008b81526020902060005b868110156127555781548b82015290850190830161273c565b505084890196505b50505050505061101e818561267c565b7f4d6f6a6f200000000000000000000000000000000000000000000000000000008152600082516127a5816005850160208701612a5b565b9190910160050192915050565b7f4d6f6a6f200000000000000000000000000000000000000000000000000000008152600082516127ea816005850160208701612a5b565b7f2069732061206d656d626572206f6620746865204d6f6a6f732044414f0000006005939091019283015250602201919050565b602081526000610a1f6020830184612650565b60208152816020820152818360408301376000818301604090810191909152601f909201601f19160101919050565b604081526000835160408084015261287b60808401826125fb565b905060208501517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc08483030160608501526128b68282612650565b925050508260208301529392505050565b6040815260008351608060408401526128e360c0840182612650565b905060208501517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc08085840301606086015261291f8383612650565b9250604087015191508085840301608086015261293c83836125fb565b925060608701519150808584030160a0860152506128b68282612650565b60008083357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe184360301811261298f57600080fd5b83018035915067ffffffffffffffff8211156129aa57600080fd5b6020019150368190038213156121e957600080fd5b604051601f8201601f1916810167ffffffffffffffff811182821017156129e8576129e8612bb5565b604052919050565b600067ffffffffffffffff821115612a0a57612a0a612bb5565b50601f01601f191660200190565b60008219821115612a2b57612a2b612b28565b500190565b600082612a3f57612a3f612b57565b500490565b600082821015612a5657612a56612b28565b500390565b60005b83811015612a76578181015183820152602001612a5e565b83811115610eaa5750506000910152565b600181811c90821680612a9b57607f821691505b60208210811415612ad5577f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b50919050565b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff821415612b0d57612b0d612b28565b5060010190565b600082612b2357612b23612b57565b500690565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fdfea2646970667358221220afa3dc1870a71a9ee6e301d15694ae087f8b54aa78d1f5aaa517f96d3e9c569164736f6c63430008060033";

export interface MojosDescriptorLibraryAddresses {
  ["__$e1d8844a0810dc0e87a665b1f2b5fa7c69$__"]: string;
}
