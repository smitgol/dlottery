"use client";
import { createContext, useContext, useEffect, useState } from "react";
import Web3 from "web3"
import { WalletProvider } from "../../interfaces/WalletProvider";
import React from 'react'

export const WalletContext = createContext<WalletProvider | null>(null);


export const useWalletContext = () => {
  const context = useContext(WalletContext);

  if (!context) {
    throw new Error('useWalletContext must be used within a WalletProvider');
  }

  return context;
}


const WalletProvider = ({children}:any) => {
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [web3, setWeb3] = useState<Web3|null>();
  const [web3RPC, setWeb3RPC] = useState<Web3 | null>();

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.enable();

        // Create a Web3 instance
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);

        // Get the current wallet address
        const accounts = await web3Instance.eth.getAccounts();
        setWalletAddress(accounts[0]); // Assuming the user has at least one account connected
      } catch (error) {
        console.error('Error connecting to wallet:', error);
      }
    } else {
      console.error('MetaMask not found. Please install MetaMask to use this app.');
    }
  };

  const disconnectWallet = async () => {
    if (web3) {    
      setWalletAddress("");
      setWeb3(null)
    }
  }

  // Check if the wallet is already connected when the component mounts
  useEffect(() => {
    //connectWallet();
    const rpcUrl = "https://sepolia-rollup.arbitrum.io/rpc";
    const web3_provider = new Web3(new Web3.providers.HttpProvider(rpcUrl));
    setWeb3RPC(web3_provider)
  }, []);
  return (
      <WalletContext.Provider value={{ web3, walletAddress, connectWallet, disconnectWallet, web3RPC }}>
        {children}
      </WalletContext.Provider>
  );
}

export default WalletProvider;


