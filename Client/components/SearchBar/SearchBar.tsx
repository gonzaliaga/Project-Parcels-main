"use client"
import React, { useState } from "react"
import "tailwindcss/tailwind.css"
import { useGetParcelasQuery } from "@/redux/services/parcelApi"
import { setParcelas } from "@/redux/features/parcelSlice"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { HiOutlineRefresh } from "react-icons/hi"

export default function SearchBar() {

  const [keyword, setKeyword] = useState("")
  const dispatch = useAppDispatch()

  const { data } = useGetParcelasQuery("")

  const removeAccents = (str: string) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  }

  const filter = (keyword: string) => {

    if (keyword) {
      const filtered = data?.filter((e) => {
        const accentsData = removeAccents(e.name)
        const accentsInput = removeAccents(keyword)
        return accentsData.toLowerCase().includes(accentsInput.toLowerCase())
      })

      if (filtered !== undefined) {
        dispatch(setParcelas(filtered))
      }
    }else if(!keyword) {
      
      data && dispatch(setParcelas(data))}
  }

  const handleSubmit = () => {
    filter(keyword)
 
  }

  const handleKeyDown = (e: any) => {
    if (e.keyCode === 13) {
      handleSubmit()
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> ) => {
    setKeyword(e.target.value)
    filter(e.target.value)
  }

  return (
    <div className="flex items-center border rounded-md border-gray-300 focus-within:ring-2 focus-within:ring-[#00ad68be]">
      <svg
        className="w-4 h-4 mx-2 text-gray-500 dark:text-gray-400"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 20 20"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
        />
      </svg>
      <input
        type="text"
        className="block w-full p-[4px] text-sm text-gray-900 focus:outline-none"
        placeholder="Buscar..."
        value={keyword}
        onChange={(e) => handleChange(e)}
        onKeyDown={handleKeyDown}
      />
    </div>

    // <div className="w-[100%] h-12 mt-2">
    //   <input
    //     type="text"
    //     placeholder="Buscar..."
    //     className="rounded p-[4px] w-[100%]"
    //     value={keyword}
    //     onChange={(e) => setKeyword(e.target.value)}
    //     onKeyDown={handleKeyDown}
    //   />
    // </div>
  )
}
