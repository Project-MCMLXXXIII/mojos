import { task, types } from 'hardhat/config';

task('mint-mojo', 'Mints a Mojo')
  .addOptionalParam(
    'mojosToken',
    'The `MojosToken` contract address',
    '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9',
    types.string,
  )
  .setAction(async ({ mojosToken }, { ethers }) => {
    const nftFactory = await ethers.getContractFactory('MojosToken');
    const nftContract = nftFactory.attach(mojosToken);

    const receipt = await (await nftContract.mint()).wait();
    const mojoCreated = receipt.events?.[1];
    const { tokenId } = mojoCreated?.args;

    console.log(`Mojo minted with ID: ${tokenId.toString()}.`);
  });
