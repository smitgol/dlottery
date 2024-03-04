import { ReactNode } from "react";

export default interface ButtonPropsInterface {
    bgColor: string,
    bgColorForHover:string,
    children: ReactNode | null,
    onClick?: () => void,
    disabled?: boolean,
    className?: string
}