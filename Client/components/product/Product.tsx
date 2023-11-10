import { setParcelas } from "@/redux/features/parcelSlice"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { useGetParcelasQuery } from "@/redux/services/parcelApi"
import { useEffect, useState } from "react"
import Card from "../Admin/Card"
import Link from "next/link"
import SearchBar from "../SearchBar/SearchBar"
import { useAppSession } from "@/app/hook"
import { usePathname } from "next/navigation"
import { AiOutlinePlusCircle } from "react-icons/ai"

type UserService = {
  email: string
  password: string
  isAdmin: boolean
  isCompany: boolean
}

const ProductSection = () => {
  const pathName = usePathname()
  const dispatch = useAppDispatch()
  const { data, error, isLoading, isFetching } = useGetParcelasQuery("")
  const parcelas = useAppSelector((state) => state.parcelas.parcelas)

  const { user, session, status } = useAppSession()

  useEffect(() => {
    setTimeout(() => {
      if (data) {
        parcelas.length === 0 && dispatch(setParcelas(data))
      }
    }, 2000)
    if (parcelas && Array.isArray(parcelas)) {
      dispatch(setParcelas(parcelas))
    }
  }, [parcelas, dispatch, pathName, data])

  return (
    <div className="flex flex-col flex-1 p-4  bg-white px-[50px]">
      <div className="flex w-full justify-between items-center">
        <Link href="/form">
          <div className="flex items-center gap-2 hover:text-green-600 duration-200">
            <AiOutlinePlusCircle className="h-7 w-7" />
            <h2 className="text-xl font-medium">Agregar parcela</h2>
          </div>
        </Link>
        <div className="flex justify-end">
          <SearchBar />
        </div>
      </div>
      <h2 className="text-2xl font-bold text-white">Parcelas activas</h2>
      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md">
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Nombre
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Estado
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Lugar
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Habilitación
              </th>
              <th
                scope="col"
                className="px-6 py-4 font-medium text-gray-900"
              ></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {parcelas &&
              user?.isCompany === true &&
              parcelas.map((el) => {
                if (el.deleted === false && session?.user?.email === el.user) {
                  return (
                    <Card
                      name={el.name}
                      id={el._id}
                      deleted={el.deleted}
                      key={el._id}
                    />
                  )
                }
              })}
            {parcelas &&
              user?.isAdmin === true &&
              parcelas.map((el) => {
                if (el.deleted === false) {
                  return (
                    <Card
                      name={el.name}
                      id={el._id}
                      deleted={el.deleted}
                      key={el._id}
                    />
                  )
                }
              })}
          </tbody>
        </table>
      </div>
      {/* <div className="grid grid-cols-2 mt-6 ">
        {parcelas &&
          user?.isCompany === true &&
          parcelas.map((el) => {
            if (el.deleted === false && session?.user?.email === el.user) {
              return (
                <div className=" w-full flex " key={el._id}>
                  <Card name={el.name} id={el._id} deleted={el.deleted} />
                </div>
              )
            }
          })}
        {parcelas &&
          user?.isAdmin === true &&
          parcelas.map((el) => {
            if (el.deleted === false) {
              return (
                <div className=" w-full flex " key={el._id}>
                  <Card name={el.name} id={el._id} deleted={el.deleted} />
                </div>
              )
            }
          })}
      </div> */}

      <h2 className="text-2xl font-bold text-white">Parcelas Ocultas</h2>
      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md ">
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Nombre
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Estado
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Lugar
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Habilitación
              </th>
              <th
                scope="col"
                className="px-6 py-4 font-medium text-gray-900"
              ></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {parcelas &&
              user?.isCompany === true &&
              parcelas.map((el) => {
                if (el.deleted === true && session?.user?.email === el.user) {
                  return (
                    <Card
                      name={el.name}
                      id={el._id}
                      deleted={el.deleted}
                      key={el._id}
                    />
                  )
                }
              })}
            {parcelas &&
              user?.isAdmin === true &&
              parcelas.map((el) => {
                if (el.deleted === true) {
                  return (
                    <Card
                      name={el.name}
                      id={el._id}
                      deleted={el.deleted}
                      key={el._id}
                    />
                  )
                }
              })}
          </tbody>
        </table>
      </div>
      {/* <div className="grid grid-cols-2 mt-6 ">
        {parcelas &&
          user?.isCompany === true &&
          parcelas.map((el) => {
            if (el.deleted === true && session?.user?.email === el.user) {
              return (
                <div className=" w-full flex " key={el._id}>
                  <Card name={el.name} id={el._id} deleted={el.deleted} />
                </div>
              )
            }
          })}
        {parcelas &&
          user?.isAdmin === true &&
          parcelas.map((el) => {
            if (el.deleted === true) {
              return (
                <div className=" w-full flex " key={el._id}>
                  <Card name={el.name} id={el._id} deleted={el.deleted} />
                </div>
              )
            }
          })}
      </div> */}
    </div>
  )
}

export default ProductSection
