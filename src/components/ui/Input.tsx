import {HTMLInputTypeAttribute} from 'react'
import { UseFormRegister } from "react-hook-form"

type InputProps={
    register?: UseFormRegister<any>,
    error?: string
    name?: string
    type?: HTMLInputTypeAttribute
    placeholder?:string
}

export const Input = ({register,error,name,type,placeholder}:InputProps) => {
  return (
    <div>
      <input
      className="mt-5 outline-none block w-full p-4 text-white border border-white-300 rounded-lg bg-[#333] focus:ring-blue-500 focus:border-blue-500"
      {...register(name)}
      type={type}
      placeholder={placeholder}
      />
        <p className="text-red-500">{error}</p>
    </div>
    
  )
}

export default Input