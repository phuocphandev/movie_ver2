import {HTMLInputTypeAttribute} from 'react'
import { UseFormRegister } from "react-hook-form"

type InputProps={
    register?: UseFormRegister<any>,
    error?: string
    name?: string
    type?: HTMLInputTypeAttribute
    placeholder?:string
    //custom
    label?:string 
    className?:string
    disabled?:boolean
    value?:string
}

export const Input = ({register,error,name,type,placeholder,label,className,disabled,value}:InputProps) => {
  return (
    <div className="className">
      {label && <p className="-mb-5 mt-3">{label}</p> }
      <input
      className="mt-5 outline-none block w-full p-4 text-white border border-white-300 rounded-lg bg-[#333] focus:ring-blue-500 focus:border-blue-500"
      {...register(name)}
      type={type}
      placeholder={placeholder}
      disabled={disabled}
      value={value}
      />
        <p className="text-red-500">{error}</p>
    </div>
    
  )
}

export default Input