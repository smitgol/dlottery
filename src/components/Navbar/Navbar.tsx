"use client";
import {useContext, useState, useEffect, useRef} from "react";
import Link from 'next/link';
import { WalletContext, useWalletContext } from "@/context/providers/WalletProvider";
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'
import Dropdown from 'react-overlays/Dropdown'
import "./navbar.css"
import { getRandomNumberInRange } from "@/app/utils/functions";
export default function NavBar() {

    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const {web3, walletAddress, connectWallet, disconnectWallet} = useWalletContext();
    const [isOpen, setISOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);


    useEffect(() => {
        let handler = (e:MouseEvent) => {
            if (!dropdownRef.current?.contains(e.target as Node)) {
                setISOpen(false);
            }
        }
        document.addEventListener('mousedown', handler);
        return () => {
            document.removeEventListener('mousedown', handler)
        }
    });

    function handleOnConnectwalletClick() {
      connectWallet();
    }

    const disconnectWalletCall = () => {
        disconnectWallet();
        setISOpen(false);
    }

    return (
        <nav className={`border-gray-200 fixed top-0 left-0 right-0 shadow-lg z-10 bg-dark-bg-color`}>
            <div className="md:w-4/5 px-3 mx-auto max-sm:px-12">
            <div className="flex flex-wrap items-center justify-between py-5">
                <Link href="/" className="font-bold text-lg">
                    D Lottery App
                </Link>
                <button type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" onClick={() => { setMenuIsOpen(!menuIsOpen)}}>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                </button>
                <div className={`md:block w-full md:w-auto ${menuIsOpen ? '' : 'hidden'} `}>
                <ul className="max-sm:bg-dark-menu-bg-color-sm font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 dark:border-gray-700 items-center">
                    <li>
                    <Link href="/" className="block py-2 pl-3 pr-4 text-base text-dark-nav-color rounded md:p-0 font-bold hover:text-slate-100" aria-current="page">Home</Link>
                    </li>
                    <li>
                    <Link href="/create-lottery" className="block py-2 pl-3 pr-4 text-base text-dark-nav-color rounded md:p-0 font-bold hover:text-slate-100" >Create Lottery</Link>
                    </li>
                    <li>
                        {walletAddress != "" ? 
                            <div className="dropdown">
                                <div className="cursor-pointer" onClick={() => setISOpen(!isOpen)}>
                                    <Jazzicon diameter={35} seed={jsNumberForAddress(walletAddress)} /> 
                                </div>
                                <div className={`dropdown-content rounded-md ${isOpen ? 'show' : 'hide'}`} ref={dropdownRef}>
                                    <Link className="dropdown-item rounded-md font-semibold text-sm" href="/dash" onClick={() => setISOpen(false)}>Profile</Link>
                                    <div className="dropdown-item rounded-md font-semibold text-sm" onClick={()=> disconnectWalletCall()}>Disconnect</div>
                                </div>
                            </div>

                        : <a className="block py-2 px-4 text-base text-slate-100 rounded p-2 font-bold hover:text-slate-100 bg-blue-700 rounded-lg hover:cursor-pointer" onClick={handleOnConnectwalletClick}>Connect Wallet</a>}
                    
                    </li>
                </ul>
                </div>
            </div>
            </div>
        </nav>
    )
}