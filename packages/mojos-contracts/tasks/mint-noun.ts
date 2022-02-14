import { task, types } from 'hardhat/config';

task('mint-noun', 'Mints a Mojos')
  .addOptionalParam(
    'mojosToken',
    'The `MojosToken` contract address',
    '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9',
    types.string,
  )
  .setAction(async ({ MojosToken }, { ethers }) => {
    const nftFactory = await ethers.getContractFactory('MojosToken');
    const nftContract = nftFactory.attach(MojosToken);

    const receipt = await (await nftContract.mint()).wait();
    const nounCreated = receipt.events?.[1];
    const { tokenId } = nounCreated?.args;

    console.log(`Mojos minted with ID: ${tokenId.toString()}.`);
  });
