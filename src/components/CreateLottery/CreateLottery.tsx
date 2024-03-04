"use client";
import React, { useState } from 'react'
import Input from '../Input'
import Textarea from '../Textarea'
import Button from '../Button'
import { MdDelete } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { useWalletContext } from "@/context/providers/WalletProvider";
import {abi} from "../../abi/d_lottery";
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import { getRandomNumberInRange } from '@/app/utils/functions';
import { images } from '@/lotteryImages';

function CreateLottery() {
  const [winnerPrize, setWinnerPrize] = useState([""]);
  const [title, setTitle] = useState("");
  const [participantFee, setParticipantFee] = useState(0);
  const [minParticipant, setMinParticipant] = useState(2);
  const [contestEndDate, setContestEndDate] = useState("");
  const [description, setDescription] = useState("");
  const {web3, walletAddress, connectWallet} = useWalletContext();
  const router = useRouter()

  const AddWinner = () => {
    setWinnerPrize((state) => [...winnerPrize, ''])
  }

  const deleteWinner = (index:number) => {
    setWinnerPrize(prevArray => prevArray.filter((item, preArryIndex) => index !== preArryIndex));  
  };

  const callCreateLotteryToSmartContract = async() => {
    try {
      const winnerPrizeForContract = winnerPrize.map((price, index) => {
        return {price, rank: index+1};
      });
      const imageUrl = images[getRandomNumberInRange(0, images.length-1)];
      const contract = new web3!.eth.Contract(abi, process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);
      const adminAddress:string =process.env.NEXT_PUBLIC_ADMIN_ADDRESS??"";
      await contract.methods.createLottery(winnerPrizeForContract,adminAddress, Math.floor(new Date(contestEndDate).getTime() / 1000), participantFee, title, description, minParticipant, imageUrl).send({from: walletAddress, gas: '20000000'}).then((result) => {
        if (result) {
          toast.success("lottery created successfully", {
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
            router.push('/');
          }
      });
    }
    catch(e:any) {
      console.log(e)
      toast.error(e.message, {
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
    
  }

  const createLottery = async() => {
    if (!walletAddress) {
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
    if (walletAddress) {
      await callCreateLotteryToSmartContract();
    }
    
  }
  const checkForMinParticipant = () => {
    let totalWinnerPrize: number = winnerPrize.reduce((a, b) => a + parseInt(b), 0);
    return totalWinnerPrize < (participantFee * minParticipant)
  }

  const checkIfInvalid = () => {
    return winnerPrize.length==0 || title=='' || participantFee==0 || contestEndDate == '' || !checkForMinParticipant()  
  }
  return (
    <div className='mt-32 w-4/5 mx-auto flex flex-col items-center'>
        <h1 className='font-bold text-4xl text-center'>Create Lottery</h1>
        <div className="mt-14 flex flex-col justify-start items-start gap-8 translate-x-[15%] max-md:translate-x-0">
          <div className='flex flex-row gap-16'>
            <Input inputType='text' placeholder='title' label='Title*' value={title} onChange={(e) => setTitle(e.target.value)} />
            <Input inputType='text' placeholder='wining price in eth' label='Participant Fee(in wei)*' widthClass='!w-1/3' value={participantFee} onChange={(e) => setParticipantFee(e.target.value)}/>
          </div>
          <div className="flex flex-row gap-16">
            <Input inputType='number' placeholder='minimum participant' label='Minimum Participant*' widthClass='!w-1/3' value={minParticipant} onChange={(e) => setMinParticipant(e.target.value)}/>
            <Input inputType='date' placeholder='contest end date' label='Contest end date*' widthClass='!w-1/3' value={contestEndDate} onChange={(e) => setContestEndDate(e.target.value)}/>
          </div>
          <div className="flex flex-col gap-4">
            <div className='text-base'>Winners Prize(in wei)*</div>
            {winnerPrize && winnerPrize.map((prize, index) => {
              return <div className='flex flex-row gap-4 items-center' key={index}>
                  <p>{index+1}.</p>
                  <Input inputType='text' placeholder='prize' value={prize} onChange={(e) => setWinnerPrize((oldVal) => [...oldVal.slice(0, index), e.target.value, ...oldVal.slice(index+1)])}/>
                  <MdDelete size={'26px'} onClick={() => deleteWinner(index)} className='cursor-pointer'/>
                  {index+1===winnerPrize.length &&<FaPlus size={'20px'} className='cursor-pointer' onClick={() => AddWinner()}/>}
                </div>
            })}
          </div>
            <Textarea placeholder='description' label='Description' value={description} onChange={(e) => console.log(e)}/>
        </div>
        {checkIfInvalid() &&<div className="mt-3">
          <p className='text-red-600'>please fill missing field</p>
        </div>}
        <ToastContainer />
        <div className='mt-8'>
          <Button bgColor='bg-blue-700' bgColorForHover='hover:bg-blue-800' className='disabled:bg-blue-400' onClick={() => createLottery()} disabled={checkIfInvalid()}>Create Lottery</Button>
        </div>
    </div>
  )
}

export default CreateLottery