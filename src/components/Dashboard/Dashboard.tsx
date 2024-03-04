"use client"
import Image from "next/image"
import heroImage from "../../images/hero_image.jpg";
import Button from "../Button";
import {FaCircleCheck} from "react-icons/fa6";
import SearchBar from "../Input";
import LotteryCard from "../LotteryCard/LotteryCard";
import { useWalletContext } from "@/context/providers/WalletProvider";
import {useEffect, useState} from "react";
import {supabase} from "../../supaBaseConfig";
import Input from "../Input";

function Dashboard() {

  const {walletAddress } = useWalletContext();
  const [userName, setUserName] = useState<string>("");
  const [emailAddress, setEmailAddress] = useState<string>("");
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [dataIsPresent, setDataIsPresent] = useState<boolean>(false);

  useEffect(() => {
    getUserDetails();
  },[]);

  const parseWalletAddress = (walletAddress:string) => {
    return walletAddress.substring(0, 5) + "....." + walletAddress.slice(-5);
  }

  const getUserDetails = async () => {
    const {data, error} = await supabase.from('users').select().eq('walletAddress', walletAddress);
    if (data && Array.isArray(data)) {
      if (data.length > 0) {
        setDataIsPresent(true);
        setUserName(data[0].userName);
        setEmailAddress(data[0].emailAddress);
      }
    }
  }

  const updateUserDetails = async () => {
    if (dataIsPresent) {
      const {error} = await supabase.from("users").update({userName:userName, emailAddress:emailAddress}).eq('walletAddress', walletAddress);
    }
    else {
      const {error} = await supabase.from("users").insert({userName:userName, emailAddress:emailAddress, walletAddress: walletAddress});
    }
    setIsEdit(false);
    getUserDetails();
  }

  return (
    <div className="mt-32 w-4/5 mx-auto">
      <div className="flex flex-row w-full">
        <div className="flex flex-col gap-7 border-r-slate-900 border-r-2 pr-10 pl-4 pb-16 pt-6 mt-4 top-0 bottom-0 sticky min-h-[50vh] max-h-[100vh]">
          <div className="w-full h-auto">
            <Image alt="profile pic" sizes="100vw" src={heroImage} className="rounded-full shadow h-48 w-48"/>
          </div>
          <Button bgColor="bg-slate-800" bgColorForHover="hover:bg-slate-900"><FaCircleCheck className="inline mr-2"/><span>{parseWalletAddress(walletAddress)}</span></Button>
          {!isEdit && 
          <div className="flex flex-col gap-2 w-full">
              {userName != "" ? <p className="text-lg text-slate-600">{userName}</p> : <Button bgColor="bg-gray-900" bgColorForHover="hover:bg-gray-950" onClick={()=> setIsEdit(true)}>Add username</Button>}
              {emailAddress != "" ? <p className="text-lg text-slate-600">{emailAddress}</p> : <Button bgColor="bg-gray-900" bgColorForHover="hover:bg-gray-950" onClick={()=> setIsEdit(true)}>Add Email</Button>}
          </div>}
          {isEdit && <div className="flex flex-col gap-2">
          <Input label="username" inputType="text" placeholder="enter username" value={userName} onChange={(e) => setUserName(e.target.value)}/>
          <Input label="email" inputType="text" placeholder="enter email address" value={emailAddress} onChange={(e)=>setEmailAddress(e.target.value)}/>
          </div>}
            {userName =="" && emailAddress =="" ? '' : (!isEdit && <Button bgColor="bg-gray-900" bgColorForHover="hover:bg-gray-950" onClick={()=> setIsEdit(true)}>Edit Profile</Button>)}
            {isEdit && <div className="gap-8 flex justify-center">
              <Button bgColor="bg-green-700" bgColorForHover="hover:bg-green-800" onClick={() => updateUserDetails()}>Save</Button>
              <Button bgColor="bg-gray-900" bgColorForHover="hover:bg-gray-950" onClick={()=> setIsEdit(false)}>Cancel</Button>
              </div>}
        </div>
        <div className="flex flex-col gap-2 w-4/5 pt-4 mx-12">
          <div className="border-b-gray-800	justify-center flex flex-row gap-10 border-b-2">
            <p className="text-md dash-section-title dash-section-active hover:cursor-pointer">Buyed</p>
            <p className="text-md dash-section-title hover:cursor-pointer dash-section-title-hover">Liked</p>
            <p className="text-md hover:cursor-pointer dash-section-title dash-section-title-hover">Created</p>
          </div>
          <div className="my-8 grid grid-cols-1 px-6 overflow-y-auto gap-8 grid-rows-auto max-lg:grid-cols-1">
                <LotteryCard />
                <LotteryCard />
                <LotteryCard />
                <LotteryCard />
                <LotteryCard />
            </div>

        </div>
      </div>
    </div>
  )
}

export default Dashboard