import { task, types } from 'hardhat/config';

task('mint-mojo', 'Mints a Mojo')
  .addOptionalParam(
    'mojosToken',
    'The `MojosToken` contract address',
    '0xCd15a1054cD7720AaABD993CebF4d5c1B475cF60',
    types.string,
  )
  .setAction(async ({ mojosToken }, { ethers }) => {
    const nftFactory = await ethers.getContractFactory('MojosToken');
    const nftContract = nftFactory.attach(mojosToken);

    const receipt = await (
      await nftContract.externalMint('0x50779Ecf871ba1a1BD97a5C7379fd8e3c35b2abB', 1, 6, 37, 21, 18)
    ).wait();
    console.log(receipt);
    const mojoCreated = receipt.events?.[1];
    console.log(mojoCreated?.args);

    // console.log(`Mojo minted with ID: ${tokenId.toString()}.`);
  });
