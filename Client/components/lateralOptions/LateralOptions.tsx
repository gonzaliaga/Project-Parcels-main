"use client"
import { useAppSession } from "@/app/hook"
import Link from "next/link"
import { HiOutlineChartBarSquare } from "react-icons/hi2"
import { LiaClipboardListSolid } from "react-icons/lia"
import { TbMessage2 } from "react-icons/tb"
import { PiUsers } from "react-icons/pi"
const LateralOptions = () => {
  const { status, user } = useAppSession()

  return (
    <>
      <div className="flex flex-col items-center h-[calc(100vh_80px)] overflow-hidden text-gray-400 bg-white shadow-lg py-4 pr-4">
        <div className="w-full px-2">
          <div className="flex flex-col items-start w-full mt-2 border-gray-700">
            <div className="flex items-center w-full px-2 mb-2">
              <svg
                className="w-8 h-8 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
              </svg>
              <span className="ml-2 text-sm font-bold">Parcels</span>
            </div>
            {status === "authenticated" && user.isAdmin === true && (
              <Link href={"/admin/stadistic"}>
                <div className="flex items-center w-full h-12 px-3 mt-2 rounded hover:text-[#00ad68be]">
                  <HiOutlineChartBarSquare className="w-6 h-6 stroke-current" />
                  <span className="ml-2 text-sm font-medium">Estadisticas</span>
                </div>
              </Link>
            )}
            <Link href={"/admin/product"}>
              <div className="flex items-center w-full h-12 px-3 mt-2 rounded hover:text-[#00ad68be]">
                <LiaClipboardListSolid className="w-6 h-6 stroke-current" />
                <span className="ml-2 text-sm font-medium">Productos</span>
              </div>
            </Link>
            {status === "authenticated" && user.isAdmin === true && (
              <Link href={"/admin/messages"}>
                <div className="relative flex items-center w-full h-12 px-3 mt-2 rounded hover:text-[#00ad68be]">
                  <TbMessage2 className="w-6 h-6 stroke-current" />
                  <span className="ml-2 text-sm font-medium">Mensajes</span>
                  <span className="absolute top-0 left-0 w-2 h-2 mt-3 ml-3 bg-green-500 rounded-full"></span>
                </div>
              </Link>
            )}
            {status === "authenticated" && user.isAdmin === true && (
              <Link href={"/admin/users"}>
                <div className="relative flex items-center w-full h-12 px-3 mt-2 rounded hover:text-[#00ad68be]">
                  <PiUsers className="w-6 h-6 stroke-current" />

                  <span className="ml-2 text-sm font-medium">Usuarios</span>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default LateralOptions
