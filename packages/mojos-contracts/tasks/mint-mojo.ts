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

    // NEEDS TO CHANGE TO THE DESIRED OWNER OF THE TOKEN AND SEEDS PARAMETERS
    const mojosToMint = [
      { owner: '0xc5cab4c37D7C00B36DE99C32b1f4462B8d923d90', seed: '1,2,15,19,42' },
      { owner: '0x9c768177521C9A832B0f8567265ef02E89D0282e', seed: '1,4,40,29,20' },
      { owner: '0xFedEE9Ed0FA7F41A9a3Db7714Ffa9D6CCe34827B', seed: '1,3,1,31,35' },
      { owner: '0xd6E9C9A8002C7E2EFc99E7acab60C442fc9DF4f2', seed: '1,0,27,11,41' },
      { owner: '0x9d5b1154246F93f8EABbfdf1180d1474399FB723', seed: '1,2,26,4,27' },
      { owner: '0xbf37f27A4ac7BD29290Ed2c3aA68e6ab11Fd4d6e', seed: '1,1,12,25,27' },
      { owner: '0x12F413972cca9075Bd6c9A7bB138BD2AF1770703', seed: '1,0,44,27,26' },
      { owner: '0xAD219c627739eC3A655819e4af80007986a072c7', seed: '0,2,4,9,40' },
      { owner: '0x01447D58f50F97Ca33D7B4398fFC548Df17A79aB', seed: '0,5,10,38,46' },
      { owner: '0xf5819cC26F0481c9b86294B4c24027518a04BD5B', seed: '0,2,17,13,17' },
      { owner: '0xc5cab4c37D7C00B36DE99C32b1f4462B8d923d90', seed: '1,6,1,17,32' },
      { owner: '0x01447D58f50F97Ca33D7B4398fFC548Df17A79aB', seed: '0,3,1,22,8' },
      { owner: '0x2091125bFE4259b2CfA889165Beb6290d0Df5DeA', seed: '1,5,28,18,26' },
      { owner: '0x42FD445E08c89e264695E3687d3fD3547C75d6B2', seed: '1,1,9,33,15' },
      { owner: '0x2091125bFE4259b2CfA889165Beb6290d0Df5DeA', seed: '0,4,14,21,0' },
      { owner: '0x9c768177521C9A832B0f8567265ef02E89D0282e', seed: '1,2,1,11,1' },
      { owner: '0x9c768177521C9A832B0f8567265ef02E89D0282e', seed: '1,8,11,3,18' },
      { owner: '0x9d5b1154246F93f8EABbfdf1180d1474399FB723', seed: '1,7,23,8,39' },
      { owner: '0x15D3FfAc9B7D5dBbEE095910Db6380040222b99f', seed: '1,1,3,8,37' },
      { owner: '0xc5cab4c37D7C00B36DE99C32b1f4462B8d923d90', seed: '0,5,27,6,46' },
      { owner: '0x9c768177521C9A832B0f8567265ef02E89D0282e', seed: '0,9,10,9,31' },
      { owner: '0x9c768177521C9A832B0f8567265ef02E89D0282e', seed: '1,8,24,4,0' },
      { owner: '0x3960BeA3d9de68dB92246ed0A687430e2b782726', seed: '0,4,24,18,22' },
      { owner: '0x9c768177521C9A832B0f8567265ef02E89D0282e', seed: '0,0,6,23,7' },
      { owner: '0x01447D58f50F97Ca33D7B4398fFC548Df17A79aB', seed: '1,8,30,4,19' },
      { owner: '0x9c768177521C9A832B0f8567265ef02E89D0282e', seed: '0,5,4,16,7' },
      { owner: '0xc5cab4c37D7C00B36DE99C32b1f4462B8d923d90', seed: '1,8,1,15,45' },
      { owner: '0x9c768177521C9A832B0f8567265ef02E89D0282e', seed: '0,5,18,22,21' },
      { owner: '0x9c768177521C9A832B0f8567265ef02E89D0282e', seed: '0,3,39,9,24' },
      { owner: '0xFedEE9Ed0FA7F41A9a3Db7714Ffa9D6CCe34827B', seed: '0,7,26,13,3' },
      { owner: '0x69fa64346761C64f6174527e60CF062316F35d41', seed: '0,0,25,14,4' },
      { owner: '0x01447D58f50F97Ca33D7B4398fFC548Df17A79aB', seed: '0,3,10,4,44' },
      { owner: '0x8f4DAa33706d70677fd69e4E0d47E595bc820E95', seed: '0,6,7,0,50' },
      { owner: '0xc5cab4c37D7C00B36DE99C32b1f4462B8d923d90', seed: '0,0,4,35,7' },
      { owner: '0x9c768177521C9A832B0f8567265ef02E89D0282e', seed: '0,0,34,11,50' },
      { owner: '0x9c768177521C9A832B0f8567265ef02E89D0282e', seed: '1,9,8,15,18' },
      { owner: '0xD7A3d871df276fD3db4312A497a6D3359e27c11A', seed: '0,7,0,18,46' },
      { owner: '0x0BdbD5bf63c9a04BBD26944B319c97F50fF1803A', seed: '0,9,12,40,8' },
      { owner: '0x9c768177521C9A832B0f8567265ef02E89D0282e', seed: '1,1,27,31,36' },
      { owner: '0x9c768177521C9A832B0f8567265ef02E89D0282e', seed: '1,2,13,13,45' },
      { owner: '0xc5cab4c37D7C00B36DE99C32b1f4462B8d923d90', seed: '0,2,39,36,29' },
      { owner: '0x7314F48B229909b088f6C73353A5aB1dbb00385F', seed: '1,6,17,20,7' },
      { owner: '0x9c768177521C9A832B0f8567265ef02E89D0282e', seed: '1,0,9,5,10' },
      { owner: '0x9c768177521C9A832B0f8567265ef02E89D0282e', seed: '0,9,7,38,50' },
      { owner: '0xF3Debd893D3788C3b700E3f2ae7EC2C7619A35DB', seed: '1,6,20,11,29' },
      { owner: '0xc5cab4c37D7C00B36DE99C32b1f4462B8d923d90', seed: '0,1,27,35,1' },
      { owner: '0x9c768177521C9A832B0f8567265ef02E89D0282e', seed: '1,9,14,9,39' },
      { owner: '0x9c768177521C9A832B0f8567265ef02E89D0282e', seed: '0,6,44,12,37' },
      { owner: '0xFedEE9Ed0FA7F41A9a3Db7714Ffa9D6CCe34827B', seed: '0,3,0,4,44' },
      { owner: '0xFedEE9Ed0FA7F41A9a3Db7714Ffa9D6CCe34827B', seed: '0,5,3,37,27' },
      { owner: '0xc5cab4c37D7C00B36DE99C32b1f4462B8d923d90', seed: '1,8,29,34,1' },
      { owner: '0xFedEE9Ed0FA7F41A9a3Db7714Ffa9D6CCe34827B', seed: '1,5,38,3,48' },
      { owner: '0xFedEE9Ed0FA7F41A9a3Db7714Ffa9D6CCe34827B', seed: '1,2,42,39,1' },
      { owner: '0xc5cab4c37D7C00B36DE99C32b1f4462B8d923d90', seed: '0,7,40,33,46' },
      { owner: '0xC6cd70D7da5a97643D960c848E5EA40227B3f304', seed: '0,6,30,9,23' },
      { owner: '0xc5cab4c37D7C00B36DE99C32b1f4462B8d923d90', seed: '1,6,37,21,18' },
      { owner: '0x7314F48B229909b088f6C73353A5aB1dbb00385F', seed: '0,8,11,16,4' },
      { owner: '0xAdE76D1C45F8487E4717CbB22ae8C677e7402d04', seed: '0,9,11,32,2' },
    ];


     for (const mojo of mojosToMint) {
      try {
        console.log(` `);
        const seed = mojo.seed.split(',');
        const receipt = await(
          await nftContract.externalMint(mojo.owner, seed[0], seed[1],seed[2], seed[3], seed[4])
        ).wait();
        
        const mojoCreated = receipt.events?.[1];
        const { tokenId } = mojoCreated?.args;
        console.log(`Mojo minted with ID: ${tokenId.toString()}.`);
      } catch (error) {
        console.error(error);
      }
     }

  });
