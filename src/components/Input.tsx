"use client";
import InputInterface from "../interfaces/InputInterface";


export default function Input({label, inputType, placeholder, className, widthClass, value, onChange}:InputInterface) {

    const onChangeCallBackFunc = (e:any) => {
        if (onChange) {
            onChange(e);
        }
    }
    return (
        <div className={`block ${widthClass}`}>
            {label && <label className="text-lg font-medium  tracking-wide text-slate-100 mb-2">{label}</label>}
            <input type={inputType} className={`border-2 border-gray-800 text-slate-200 font-medium text-sm rounded-md bg-dark-input-bg-color p-2.5 w-full pl-6 focus:ring-blue-500 focus:border-blue-500 ${className}`} placeholder={placeholder} value={value} onChange={(e) => onChangeCallBackFunc(e)}/>
        </div>
    )
}