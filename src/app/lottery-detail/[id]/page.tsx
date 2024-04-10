"use client";
import LotteryDetail from "@/components/LotteryDetail/LotteryDetail";
import { useParams } from 'next/navigation';
import { notFound } from 'next/navigation'

export default function Page() {
    const { id } = useParams();
    if (!id) {
        notFound()
    }
    return <LotteryDetail id={id}/>
}