import React from 'react'
import Skeleton from 'react-loading-skeleton';


const SkeletonCom = () => {
  return (
    <div className='bg-dark-card-bg-color flex flex-row w-full rounded-xl hover:cursor-pointer hover:bg-[#171A35]'>
        <div className="h-auto flex w-72 rounded-l-xl overflow-hidden">
            <Skeleton />
        </div>
        <div className='px-4 py-4 flex flex-col gap-2 w-full'>
        <div className="flex justify-between w-full">
            <p className="text-sm text-slate-400 font-normal"><Skeleton /></p>
            <p className="text-sm font-bold"><Skeleton /></p>
        </div>
        <p className='text-2xl font-semibold'><Skeleton /></p>
        <p className="text-lg font-semibold"><Skeleton /></p>
        </div>
    </div>
  )
}

export default SkeletonCom