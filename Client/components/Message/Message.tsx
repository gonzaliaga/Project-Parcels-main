"use client"
import {
  useDeleteMessageMutation,
  useGetMessageQuery,
  useUpdateMessageMutation
} from "@/redux/services/contactApi"
import React from "react"
import Button from "../Button/Button"
import {
  AiOutlinePhone,
  AiOutlineUser,
  AiOutlineMessage,
  AiOutlineMail
} from "react-icons/ai"

import { BiSelectMultiple } from "react-icons/bi"

const Message = () => {
  const dataMessage = useGetMessageQuery("")
  const { data, error, isLoading, isFetching } = useGetMessageQuery("")
  const [updateMessage] = useUpdateMessageMutation()
  const [deleteMessage] = useDeleteMessageMutation()

  const handleClick = async (id: string, status: boolean) => {
    await updateMessage({ id, data: { managed: status } })

    dataMessage.refetch()
  }

  const handleDelete = async (id: string) => {
    await deleteMessage({ id })

    dataMessage.refetch()
  }

  return (
    <>
      <div className="flex flex-col w-full pt-[1rem] px-[1rem]">
        <div className="w-full grid grid-cols-1 gap-4">
          <h2 className="text-lg font-medium">Pendientes:</h2>
          {data?.map(
            (el) =>
              el.managed === false && (
                <div
                  className="bg-white px-10 py-5 shadow-lg rounded-md space-y-2"
                  key={el._id}
                >
                  <div className="flex gap-2 items-center">
                    <AiOutlineUser className="h-5 w-5 text-green-600" />

                    <p className="text-gray-800 ">
                      <span className="text-gray-600 font-medium">
                        Nombre y Apellido:{" "}
                      </span>
                      {el.firstName} {el.lastName}
                    </p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <AiOutlineMail className="h-5 w-5 text-green-600" />

                    <p className="text-gray-800 ">
                      <span className="text-gray-600 font-medium">
                        Correo Electrónico:{" "}
                      </span>
                      {el.email}
                    </p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <AiOutlinePhone className="h-5 w-5 text-green-600" />
                    <p className="text-gray-800 ">
                      <span className="text-gray-600 font-medium">
                        Número Telefónico:{" "}
                      </span>
                      {el.phone}
                    </p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <BiSelectMultiple className="h-5 w-5 text-green-600" />
                    <p className="text-gray-800 ">
                      <span className="text-gray-600 font-medium">
                        Asunto:{" "}
                      </span>
                      {el.reason}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-800">
                      <div className="flex gap-2">
                        <AiOutlineMessage className="h-5 w-5 text-green-600" />
                        <div>
                          <span className="text-gray-600 font-medium">
                            Mensaje:{" "}
                          </span>
                          {el.message}
                        </div>
                      </div>
                    </p>
                  </div>
                  <div className="flex gap-2 items-center pt-4">
                    <div
                      onClick={() => handleClick(el._id, true)}
                      className="cursor-pointer"
                    >
                      <Button text={"Gestionado"} />
                    </div>
                    <div
                      onClick={() => handleDelete(el._id)}
                      className="cursor-pointer"
                    >
                      <Button text={"Eliminar"} />
                    </div>
                  </div>
                </div>
              )
          )}
        </div>
        <div className="w-full  grid grid-cols-1 gap-4 py-[1rem]">
          <h2 className="text-lg font-medium">Gestionados:</h2>
          {data?.map(
            (el) =>
              el.managed === true && (
                <div
                  className="bg-white px-10 py-5 shadow-lg rounded-md space-y-2 "
                  key={el._id}
                >
                  <h3>
                    Nombre y apellido: {el.firstName} {el.lastName}
                  </h3>
                  <h3>Correo electronico: {el.email}</h3>
                  <h3>Numero telefonico: {el.phone}</h3>
                  <span>Asunto: {el.reason}</span>
                  <p>{el.message}</p>
                  <div className="flex gap-2 items-center">
                    <div onClick={() => handleClick(el._id, false)}>
                      <Button text={"Anular gestion"} />
                    </div>
                    <div onClick={() => handleDelete(el._id)}>
                      <Button text={"Eliminar"} />
                    </div>
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    </>
  )
}

export default Message
