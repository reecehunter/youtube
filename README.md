# NFT Minting dApp Boilerplate

The goal of this project is to provide a simple solution for people who need a minting website for their NFT project, but don't know how to code.

With this repository, you will be able to install a template NFT minting dApp, configure it to fit your own smart contract, and style the page without needing to know how to code.

All the configuration in this repository is explained on my YouTube channel.

📺 [YouTube](https://youtube.com/c/reecehunter) <br />
🐦 [Twitter](https://twitter.com/reecehunt3r)

# Installation

Clone the project.

```
git clone https://github.com/reecehunter/youtube/minting-boilerplate.git
```

Go to the root of the project and run this command. Make sure you have node installed.

```
npm install
```

Now that project is installed, you can run it to make sure it's working, then move onto the configuration in the next section.

```
npm start
```

# Configuration

To begin configuring the dApp, navigate to the root of the project and open the `config.js` file inside the `src` folder.

Once that's open, there will be many configuration options with comments to explaining what each one does. In this guide, I will only be going over the necessary configurations required to get the dApp running with your own smart contract.

## Contract Config

Set the value of `contractAddress` with your contract's address.

Set the value of `contractABI` to your contract's ABI.

## Provider Config

Set the value of `network` to whatever network you are using. If you are in production, it will likely be `mainnet`. If you are testing, it will likely be `goerli`.

## Project Config

Set the value of `mintFunction` to the name if your minting function. It will likely be `mint`, `publicMint`, or something similar.

Once that's all configured, you will be good to go! If this was helpful or interesting, consider giving the repo a ⭐!
