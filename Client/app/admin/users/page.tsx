"use client"
import { useAppSession } from "@/app/hook"
import Button from "@/components/Button/Button"
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation
} from "@/redux/services/userApi"
import React, { useState } from "react"
import { BiSearch } from "react-icons/bi"

const Users = () => {
  const [search, setSearch] = useState({ name: "" })
  const [psw, setPsw] = useState("")
  const users = useGetUsersQuery(search)
  const { data, isLoading } = useGetUsersQuery(search)
  const { user, session } = useAppSession()
  const [deleteUser] = useDeleteUserMutation()
  const [updateUser] = useUpdateUserMutation()

  const handleDeleteUser = async (id: string) => {
    await deleteUser({ id })
    users.refetch()
  }

  const handleUpdateAdmin = async (
    id: string,
    name: string,
    lastname: string,
    phone: number,
    date: string,
    email: string,
    password: string,
    isAdmin: boolean,
    isCompany: boolean
  ) => {
    const data = {
      name,
      lastname,
      phone,
      date,
      email,
      password,
      isAdmin: !isAdmin,
      isCompany
    }
    await updateUser({ id, data })
    users.refetch()
  }
  const handleUpdateCompany = async (
    id: string,
    name: string,
    lastname: string,
    phone: number,
    date: string,
    email: string,
    password: string,
    isAdmin: boolean,
    isCompany: boolean
  ) => {
    const data = {
      name,
      lastname,
      phone,
      date,
      email,
      password,
      isAdmin,
      isCompany: !isCompany
    }
    await updateUser({ id, data })
    users.refetch()
  }

  const handleChangePsw = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setPsw(value)
  }

  const handleUpdatePsw = async (
    id: string,
    name: string,
    lastname: string,
    phone: number,
    date: string,
    email: string,
    password: string,
    isAdmin: boolean,
    isCompany: boolean
  ) => {
    if (psw) {
      const data = {
        name,
        lastname,
        phone,
        date,
        email,
        password: psw,
        isAdmin,
        isCompany
      }
      await updateUser({ id, data })
    } else {
      const data = {
        name,
        lastname,
        phone,
        date,
        email,
        password,
        isAdmin,
        isCompany
      }
      await updateUser({ id, data })
    }

    setPsw("")
    users.refetch()
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setSearch({ name: value })
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSearch({ name: "" })
  }

  return (
    <>
      <div className="w-[80%] mx-auto">
        <form
          onSubmit={handleSubmit}
          className="relative h-10 flex items-center w-full mt-[1rem] mb-[2rem]"
        >
          <div className="flex items-center border rounded-md border-gray-300 focus-within:ring-2 focus-within:ring-[#00ad68be]">
            <BiSearch className="w-5 h-5 ml-2 text-gray-500" />

            <input
              type="text"
              className="block w-full p-[5px] text-sm text-gray-900 focus:outline-none"
              placeholder="Buscar usuario..."
              onChange={handleChange}
              value={search.name}
            />
          </div>
        </form>

        <div className="grid grid-cols-2 w-30 gap-3">
          {data?.map((el, index) => {
            return (
              <div
                key={el._id}
                className="px-5 py-4 bg-white rounded-lg flex flex-col items-center shadow-lg"
              >
                <div className=" grid grid-cols-4 items-center w-full">
                  <div className="flex flex-col col-span-3 gap-4">
                    <h2>Nombre: {el.name}</h2>
                    <p>Correo: {el.email}</p>
                    <p>Admin: {el.isAdmin ? "administrador" : "no admin"}</p>
                    <p>
                      Corporativo:{" "}
                      {el.isCompany ? "Corporativo" : "no corporativo"}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-4">
                    <div
                      className="w-full [&>button]:w-full"
                      onClick={() => handleDeleteUser(el._id)}
                    >
                      <button
                        className="w-full bg-gradient-to-r from-[#ACD453] to-[#039D60] p-[1px] hover:from-[#8cad43] hover:to-[#006F43]  duration-200  rounded-md"
                        type="button"
                      >
                        <div className="bg-white hover:bg-slate-100 duration-200 font-medium h-full w-full px-2 py-1  rounded-md">
                          Eliminar
                        </div>
                      </button>
                    </div>
                    <div
                      className="w-full [&>button]:w-full"
                      onClick={() =>
                        handleUpdateAdmin(
                          el._id,
                          el.name,
                          el.lastname,
                          el.phone,
                          el.date,
                          el.email,
                          el.password,
                          el.isAdmin,
                          el.isCompany
                        )
                      }
                    >
                      <button
                        className="w-full bg-gradient-to-r from-[#ACD453] to-[#039D60] p-[1px] hover:from-[#8cad43] hover:to-[#006F43]  duration-200  rounded-md"
                        type="button"
                      >
                        <div className="bg-white hover:bg-slate-100 duration-200 font-medium h-full w-full px-2 py-1  rounded-md">
                          Admin
                        </div>
                      </button>
                    </div>
                    <div
                      className="w-full [&>button]:w-full"
                      onClick={() =>
                        handleUpdateCompany(
                          el._id,
                          el.name,
                          el.lastname,
                          el.phone,
                          el.date,
                          el.email,
                          el.password,
                          el.isAdmin,
                          el.isCompany
                        )
                      }
                    >
                      <button
                        className="w-full bg-gradient-to-r from-[#ACD453] to-[#039D60] p-[1px] hover:from-[#8cad43] hover:to-[#006F43]  duration-200  rounded-md"
                        type="button"
                      >
                        <div className="bg-white hover:bg-slate-100 duration-200 font-medium h-full w-full px-2 py-1  rounded-md">
                          Company
                        </div>
                      </button>
                    </div>
                  </div>
                </div>

                <form className="relative flex items-center gap-3 h-10 w-full justify-between mt-[1rem]">
                  <input
                    type="password"
                    className="peer h-full w-[200px] rounded-[7px] border border-blue-gray-200 border-t-transparent  px-3 py-4 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-[#51a8a1] focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    placeholder=" "
                    onChange={handleChangePsw}
                  />
                  <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-[200px] select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-[#51a8a1] peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-[#51a8a1] peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-[#51a8a1] peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Actualizar contraseña
                  </label>
                  <div
                    onClick={() =>
                      handleUpdatePsw(
                        el._id,
                        el.name,
                        el.lastname,
                        el.phone,
                        el.date,
                        el.email,
                        el.password,
                        el.isAdmin,
                        el.isCompany
                      )
                    }
                  >
                    {" "}
                    <Button text={"Actualizar"} />
                  </div>
                </form>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Users
