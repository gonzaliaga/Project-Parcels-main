"use client"
import { IoChevronBackOutline } from "react-icons/io5"
import Swal from "sweetalert2"
import Link from "next/link"
import Loading from "@/components/Loading/Loading"
import {
  useUpdateUserMutation,
  useGetUsersQuery
} from "@/redux/services/userApi"
import { useAppSession } from "@/app/hook"
import { useState, FormEvent } from "react"

export default function NameUpdate() {
  const [nameState, setName] = useState("")
  const [lastName, setLastName] = useState("")
  const [error, setError] = useState("")
  const { user, status } = useAppSession()
  const [updateUser] = useUpdateUserMutation()
  const refetchUser = useGetUsersQuery({ name: "" })
  const { data } = useGetUsersQuery({ name: "" })
  const dataUser = data?.find((el) => el.email === user?.email)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (nameState === "" || lastName === "") {
      setError("Ingresa un nombre valido")
    } else if (dataUser) {
      const {
        _id,
        name,
        lastname,
        phone,
        date,
        email,
        password,
        isAdmin,
        isCompany
      } = dataUser
      const data = {
        name: nameState,
        lastname: lastName,
        phone,
        date,
        email,
        password,
        isAdmin,
        isCompany
      }
      updateUser({ id: _id, data })
      Swal.fire(`¡Listo!`, "Has cambiado tu nombre", "success")
      setName("")
      setLastName("")
    }
    refetchUser.refetch()
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mt-[1rem]">
        <div className="flex items-center gap-2">
          <Link href="/userDataRegister">
            <IoChevronBackOutline className="h-6 w-6 stroke-current" />
          </Link>
          <h3 className="text-xl font-bold leading-normal">
            Nombre de usuario
          </h3>
        </div>
        <div className="bg-white mt-4 w-[60%] mb-6 shadow-xl rounded-lg p-4 space-y-8 ">
          <h4 className="text-md font-bold leading-normal">
            ¿Cuál es tu nombre?
          </h4>
          <div className="w-full">
            <div className="relative h-10 w-full  mt-[1rem]">
              <input
                type="text"
                className={
                  error
                    ? "peer h-full w-full rounded-[7px] border border-[#c54343] border-t-transparent bg-transparent px-3 py-4 font-sans text-sm font-normal outline outline-0 transition-all placeholder-shown:border focus:border-2 focus:border-[#c54343] focus:border-t-transparent focus:outline-0 disabled:border-0"
                    : "peer h-full w-full rounded-[7px] border  border-t-transparent bg-transparent px-3 py-4 font-sans text-sm font-normal outline outline-0 transition-all placeholder-shown:border focus:border-2 focus:border-[#00ad68be] focus:border-t-transparent focus:outline-0 disabled:border-0"
                }
                placeholder=" "
                value={nameState}
                onChange={(e) => setName(e.target.value)}
              />
              <label
                className={
                  error
                    ? "before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight  transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-[#c54343] peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-[#c54343] peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-[#c54343]"
                    : "before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight  transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-[#00ad68be] peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-[#00ad68be] peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-[#00ad68be]"
                }
              >
                {error || "Nombre"}
              </label>
            </div>
            <div className="relative h-10 w-full  mt-[1rem]">
              <input
                type="text"
                className={
                  error
                    ? "peer h-full w-full rounded-[7px] border border-[#c54343] border-t-transparent bg-transparent px-3 py-4 font-sans text-sm font-normal outline outline-0 transition-all placeholder-shown:border focus:border-2 focus:border-[#c54343] focus:border-t-transparent focus:outline-0 disabled:border-0"
                    : "peer h-full w-full rounded-[7px] border  border-t-transparent bg-transparent px-3 py-4 font-sans text-sm font-normal outline outline-0 transition-all placeholder-shown:border focus:border-2 focus:border-[#00ad68be] focus:border-t-transparent focus:outline-0 disabled:border-0"
                }
                placeholder=" "
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <label
                className={
                  error
                    ? "before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight  transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-[#c54343] peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-[#c54343] peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-[#c54343]"
                    : "before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight  transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-[#00ad68be] peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-[#00ad68be] peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-[#00ad68be]"
                }
              >
                {error || "Apellido"}
              </label>
            </div>
          </div>
          <button className="w-full bg-[#039D60] py-3 text-white rounded-md">
            Guardar cambios
          </button>
        </div>
      </div>
    </form>
  )
}
