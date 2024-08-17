# d-music-shop
Decentralized music shop on Ethereum blockchain

Run contracts
'''bash
npx hardhat run deploy/deploy.ts --network localhost
'''

Generate backend abi for typescript
'''bash
npx typechain --target ethers-v6 --out-dir ./front/src/typechain "artifacts/contracts/**/*[!dbg].json"
'''
