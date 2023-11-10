/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { IoChevronBackOutline } from "react-icons/io5"
import Link from "next/link"
import {
  useGetUsersQuery,
  useUpdateUserMutation
} from "@/redux/services/userApi"
import { useAppSession } from "@/app/hook"
import React, { useEffect, useState } from "react"
export default function PhoneUpdate() {
  const [cel, setCel] = useState<number>(0)
  const usersInfo = useGetUsersQuery({ name: "" })
  const { data } = useGetUsersQuery({ name: "" })
  const { user } = useAppSession()
  const [updateUser] = useUpdateUserMutation()
  const dataUser = data?.find((el) => el.email === user.email)

  useEffect(() => {
    setCel(Number(dataUser?.phone))
  }, [data])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (dataUser) {
      const {
        _id,
        name,
        lastname,
        phone,
        date,
        email,
        password,
        isAdmin,
        isCompany,
        image
      } = dataUser

      const data = {
        name,
        lastname,
        phone: cel,
        date,
        email,
        password,
        isAdmin,
        isCompany,
        image
      }

      updateUser({ id: _id, data })
    }
    setTimeout(() => {
      usersInfo.refetch()
    }, 1000)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setCel(Number(value))
  }

  return (
    <form onSubmit={handleSubmit} className="mt-[1rem]">
      <div className="flex items-center gap-2">
        <Link href="/userDataRegister">
          <IoChevronBackOutline className="h-6 w-6 stroke-current" />
        </Link>
        <h3 className="text-xl font-bold leading-normal">Numero de telefono</h3>
      </div>
      <div className="bg-white mt-4 w-[60%] mb-6 shadow-xl rounded-lg p-4 space-y-8 ">
        <h4 className="text-md font-bold leading-normal">
          ¿Cual es tu numero actual?
        </h4>
        <div className="w-full">
          <div className="relative h-10 w-full  mt-[1rem]">
            <input
              type="number"
              className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-4 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-[#00ad68be] focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              placeholder=" "
              onChange={handleChange}
              value={cel}
            />
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-[#00ad68be] peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-[#00ad68be]peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-[#00ad68be] peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Telefono
            </label>
          </div>
        </div>
        <button className="w-full bg-[#039D60] py-3 text-white rounded-md">
          Guardar cambios
        </button>
      </div>
    </form>
  )
}
