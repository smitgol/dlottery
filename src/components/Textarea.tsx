import InputInterface from "../interfaces/InputInterface";


export default function Textarea({label, placeholder, className, value}:InputInterface) {
    return (
        <div>
            {label && <label className="text-lg font-medium  tracking-wide text-slate-100 mb-2">{label}</label>}
            <textarea className={`border-2 border-gray-800 text-slate-200 font-medium text-sm rounded-md bg-dark-input-bg-color p-2.5 w-full pl-6 focus:ring-blue-500 focus:border-blue-500 ${className}`} placeholder={placeholder}/>
        </div>
    )
}