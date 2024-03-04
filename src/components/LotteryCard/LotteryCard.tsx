import React from 'react'
import testImg from "../../images/hero_image.jpg";
import Image from "next/image"
import { getEndingDate } from '@/app/utils/functions';
import { getTotalWinningPrice } from '@/app/utils/functions';
import { useRouter } from 'next/navigation'

const getAgoDate = (createdDate:number) => {
  let created_date = new Date(Number(createdDate) * 1000);
  let current_date = new Date();
  var diff_days = (+current_date - +created_date) / (1000 * 60 * 60 * 24);
  return Math.floor(diff_days); 
}


function LotteryCard({lotteryData}:any) {
  const router = useRouter();

  const navigateToDetailPage = (lotteryId:any) => {
    router.push('/lottery-detail/' + lotteryId);
  }
  return (
    <div className='bg-dark-card-bg-color flex flex-row w-full rounded-xl hover:cursor-pointer hover:bg-[#171A35]' onClick={() => navigateToDetailPage(lotteryData.LotteryIndex)}>
        <div className="h-auto flex w-72 rounded-l-xl overflow-hidden">
            <Image src={lotteryData?.imageUrl} alt="test img" sizes='100vw' width={'1000'} height={'10'}/>
        </div>
        <div className='px-4 py-4 flex flex-col gap-2 w-full'>
          <div className="flex justify-between w-full">
            <p className="text-sm text-slate-400 font-normal">Created {getAgoDate(lotteryData?.blockTimestamp)} day Ago</p>
            <p className="text-sm font-bold">Ends in {getEndingDate(lotteryData?.declareWinnerDate)} Day</p>
          </div>
          <p className='text-2xl font-semibold'>{lotteryData?.title}</p>
          <p className="text-lg font-semibold">{getTotalWinningPrice(lotteryData?.winnerPrice)} wei</p>
          {lotteryData?.winnerPrice.map((winner_price:any, index:number) => {
            return <div className='flex flex-row gap-2' key={index}>
            <span className='badge badge-success !text-sm'>{index+1}. {winner_price.price} wei</span>
          </div>;
          })}
        </div>
    </div>
  )
}

export default LotteryCard