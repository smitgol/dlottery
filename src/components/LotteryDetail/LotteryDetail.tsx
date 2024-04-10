"use client";
import React, { useEffect, useState } from 'react'
import heroImage from "../../images/hero_image.jpg";
import Image from "next/image"
import Button from '../Button';
import { useWalletContext } from '@/context/providers/WalletProvider';
import Web3 from "web3"
import {abi} from "../../abi/d_lottery";
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getEndingDate } from '@/app/utils/functions';

function LotteryDetail({id}:{id:string}) {
  const [lotteryData, setLotteryData] = useState<any>();
  const [lotterySum, setLotterySum] = useState(0);
  const {web3, walletAddress, web3RPC} = useWalletContext();
  useEffect(() => {
    if (web3RPC) {
      getLotteryData();
    }
  },[web3RPC]);

  const getLotteryData = async() => {
    const contract = new web3RPC!.eth.Contract(abi, process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);
    const result = await contract.methods.getLotteryWinnerPrice(id).call();
    setLotteryData(result);
    let sum = 0;
    result.winnerPrices.map((item) => {
      sum = sum + Number(item.price);
    });
    setLotterySum(sum);
  }


  const participateInLottery = async() => {
    if (walletAddress) {
      const contract = new web3!.eth.Contract(abi, process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);
      try {
        await contract.methods.participate(0, walletAddress).send({from: walletAddress, value: web3?.utils.toWei(Number(lotteryData.participateFee), "wei")}).then((result) => {
          if (result) {
            toast.success("you're in", {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              transition: Slide,
              });
            }
        });
      }
      catch(e) {
        console.log(e);
      }
      
    }
    else {
      toast.error("please connect your wallet", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Slide,
        })
    }
  }

  return (
    <div>
      {lotteryData &&
      <div className='pt-48 w-4/5 mx-auto flex flex-col gap-20 mb-20'>
        <div className='flex flex-row gap-20 items-start'>
          <div className='w-auto h-auto hover:scale-105 hover:cursor-pointer transition duration-600'>
            <Image src={lotteryData?.imageUrl} alt="hero image" height="300" width="570" className='rounded-2xl'/>
          </div>
          <div className='flex flex-col gap-8 items-start w-2/5'>
            <p className='text-5xl font-semibold'>{lotteryData.title}</p>
            <p className='text-2xl font-semibold'>Total Price: {lotterySum} wei</p>
            <div className='flex flex-row gap-2'>
              {lotteryData.winnerPrices.map((price : {price:bigint, rank: bigint}, index:number) => {
              return <span className='badge badge-success !text-sm' key={index}>{Number(price.rank)}. {Number(price.price)} wei</span>
              })}
            </div>
            <div className='flex flex-row gap-4'>
              <Button bgColor="bg-blue-700" bgColorForHover="hover:bg-blue-800" onClick={() => participateInLottery()}>Buy Lottery For {Number(lotteryData.participateFee)} wei</Button>
            </div>
            <p className='w-full text-base font-normal text-slate-400'>
              {lotteryData.description??'no description'}
            </p>
          </div>
        </div>
        <div className='flex flex-row gap-8'>
          <div className='bg-slate-900 p-6 shadow-2xl rounded-lg gap-4 flex flex-col items-end'>
            <p className="text-xl font-semibold">Total Participant</p>
            <p className="text-4xl font-semibold">{lotteryData.participates.length}</p>
          </div>
          <div className='bg-slate-900 p-6 shadow-2xl rounded-lg gap-4 flex flex-col items-end'>
            <p className="text-xl font-semibold">Minimum Participant</p>
            <p className="text-4xl font-semibold">{Number(lotteryData.minimumParticipant)}</p>
          </div>
          <div className='bg-slate-900 p-6 shadow-2xl rounded-lg gap-4 flex flex-col items-end'>
            <p className="text-xl font-semibold">Ending in</p>
            <p className="text-xl font-semibold">{getEndingDate(lotteryData.declareWinnerDate)} days</p>
          </div>
        </div>
      </div>}
      <ToastContainer />
    </div>
  )
}

export default LotteryDetail