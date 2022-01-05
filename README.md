# Pussikalja Dapp

A stupid project for trying out [Ethereum dapps](https://ethereum.org/en/dapps/).

## Setting up

1. Get the MetaMask browser extension and create an account.
2. `yarn` in project root
3. Deploy a local network `yarn hardhat --network hardhat node`
4. Deploy the dapp `npx hardhat run --network localhost scripts/deploy.ts`
5. The `hardhat node` gives you some testa accounts, import one of them to MetaMask
6. `yarn parcel public/index.html` to start the frontend.
7. Go to the frontend at http://localhost:1234 and complete the connection dialog from MetaMask
8. Start codin
