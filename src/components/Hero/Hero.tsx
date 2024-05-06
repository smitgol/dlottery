"use client";
import Image from "next/image"
import heroImage from "../../images/hero_image.jpg";
import Button from "../Button";
import { useRouter } from 'next/navigation'
import Lottie from 'react-lottie';
import animationData from '../../lottie/blockchian_animation.json';

export default function Hero() {
    const router = useRouter();

    const scrollToLottries = () => {
        const lotteryEle = document.getElementById("lotteries"); 
        window.scrollTo({
            top:lotteryEle?.offsetTop,
            behavior:"smooth"
        });
    }
    const navigateToCreateLottery = () => {
        router.push('/create-lottery');
    }
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice",
        },
    };
    return (
        <div className="pt-56 max-sm:pt-36 mx-auto w-4/5">
            <div className="flex flex-row space-between align-items-center max-sm:flex-col-reverse max-sm:gap-16 md:gap-5 max-sm:text-center">
                <div className="flex flex-col gap-8 w-1/2 max-sm:w-full">
                    <p className="text-lg text-dark-nav-color">THE FUTURE OF LOTTERIES</p>
                    <p className="xl:text-6xl lg:text-5xl text-4xl max-sm:text-5xl !leading-relaxed sm:font-bold tracking-wide whitespace-pre-line">Transparency, Security And Fairness</p>
                    <div className="flex flex-row gap-8 max-lg:gap-4 max-sm:justify-center">
                        <Button bgColor="bg-blue-600" bgColorForHover="hover:bg-blue-800" onClick={() => scrollToLottries()}>Buy Lottery</Button>
                        <Button bgColor="bg-orange-600" bgColorForHover="hover:bg-orange-800" onClick={() => navigateToCreateLottery()}>Create Lottery</Button>
                    </div>
                </div>
                <div className="w-1/2 max-sm:w-full">
                    <Lottie 
                        options={defaultOptions}
                        height={400}
                        width={400}
                    />
                </div>
            </div>
        </div>
    )
}