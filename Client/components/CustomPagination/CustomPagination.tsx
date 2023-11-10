"use client"
import React from "react"

type PaginationProps = {
  max: number
  page: number
  setPage: any
  inputPage: number
  setInputPage: any
}

const CustomPagination = ({
  max,
  page,
  setPage,
  inputPage,
  setInputPage
}: PaginationProps) => {
  const handleNextPage = () => {
    setInputPage(inputPage + 1)
    setPage(page + 1)
  }

  const handlePreviousPage = () => {
    setInputPage(inputPage - 1)
    setPage(page - 1)
  }

  const previous = "< Anterior"
  const next = "Siguiente >"

  return (
    <div className="flex mt-[2rem] mb-[1.9rem] justify-center">
      <button
        onClick={handlePreviousPage}
        disabled={page === 1 || page < 1}
        className="relative inline-flex items-center border-[1px] border-[#039D60] bg-white rounded-lg ease-in-out duration-300 px-4 py-[8px] focus:z-20 mx-1 "
      >
        {previous}
      </button>
      <p className="relative inline-flex items-center border-[1px] border-[#039D60] bg-white rounded-lg ease-in-out duration-300 px-4 py-[8px] focus:z-20 mx-1 ">
        {inputPage} de {max}
      </p>
      <button
        onClick={handleNextPage}
        disabled={page === Math.ceil(max) || page > Math.ceil(max)}
        className="relative inline-flex items-center border-[1px] border-[#039D60] bg-white rounded-lg ease-in-out duration-300 px-4 py-[8px] focus:z-20 mx-1 "
      >
        {next}
      </button>
    </div>
  )
}

export default CustomPagination
