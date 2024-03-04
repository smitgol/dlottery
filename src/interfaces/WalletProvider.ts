import Web3 from "web3"

export interface WalletProvider {
    web3: Web3 | undefined | null,
    web3RPC: Web3 | undefined | null,
    walletAddress: string,
    connectWallet: () => Promise<void>,
    disconnectWallet: () => void
}