"use client";
import Button from "../Button";
import Input from "../Input";
import {FiSearch} from "react-icons/fi";
import LotteryCard from "../LotteryCard/LotteryCard";
import apolloClient from "@/context/ApolloClient";
import { gql } from "@apollo/client";
import { useEffect, useState } from "react";
import _ from "lodash";

export default function ExploreLotteries() {
    const [lotteryData, setLotteryData] = useState<any[]>([]);
    useEffect(() => {
        if (lotteryData.length==0) {
            getLotteries();
        }
    }), [];

    const getLotteries = async() => {
        const { data } = await apolloClient.query({
            query: gql`
              query Countries {
                lotteryEvents {
                    id
                    LotteryIndex
                    declareWinnerDate
                    participateFee
                    title
                    imageUrl
                    blockTimestamp
                }
                winnerPriceEvents {
                    lotteryIndex
                    price
                    rank
                }
              }
            `,
        });
        if (data) {
            //let assignedData = _.cloneDeep(data);
            let lotteryEvents = Object.assign([], data.lotteryEvents);
            let winnerPriceEvents = Object.assign([], data.winnerPriceEvents);
            let lotteryDataArr = lotteryEvents.map((lottery:any) => {
                return {...lottery, winnerPrice: winnerPriceEvents.filter((winner_price:any) => winner_price.lotteryIndex == lottery.LotteryIndex)}
            });
            setLotteryData(lotteryDataArr);
        }
    }

    return (
        <div className="mt-20 w-4/5 mx-auto flex flex-col gap-16" id="lotteries">
            <h4 className="text-4xl text-center text-slate-100">Explore Lotteries</h4>
            <div className="mb-8 grid grid-cols-2 gap-8 grid-rows-auto max-lg:grid-cols-1">
                {lotteryData && lotteryData.map((lottery:any, index:number) => {
                    return <LotteryCard key={index} lotteryData={lottery} />
                })}
            </div>
        </div>
    )
}