"use client";
import ButtonPropsInterface from "@/interfaces/ButtonPropsInterface";
import { Children } from "react";

export default function Button({bgColor,bgColorForHover,children,disabled, className,onClick}:ButtonPropsInterface) {


    return (
        <button className={`${bgColor} cursor-pointer text-white focus:ring-4 focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 ${bgColorForHover} ${className}`} onClick={() => onClick && onClick()} disabled={disabled}>{children}</button>
    )
}