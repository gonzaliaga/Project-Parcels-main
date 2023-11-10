/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client"
import Link from "next/link"
import Button from "../Button/Button"
import style from "./detail.module.css"
import Paisaje from "../../img/svgs/Paisaje"
import Pago from "@/img/svgs/Pago"
import Camino from "@/img/svgs/Camino"
import Vegetation from "@/img/svgs/Vegetacion"
import Connection from "@/img/svgs/Connection"
import Energy from "@/img/svgs/Energy"
import LocationMaps from "../Maps/Maps"
import { useParams, useRouter } from "next/navigation"
import {
  useGetParcelaByIdQuery,
  useDeleteParcelaMutation,
  useUpdateViewsMutation,
  useDesableParcelaMutation,
  Parcela
} from "@/redux/services/parcelApi"
import {
  useAddToWishlistMutation,
  useGetUsersQuery,
  useRemoveFromWishlistMutation
} from "@/redux/services/userApi"
import Swal from "sweetalert2"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { setParcelaData } from "@/redux/features/parcelSlice"
import { useSession } from "next-auth/react"
import { useAppSession } from "@/app/hook"
import { TiWeatherPartlySunny } from "react-icons/ti"
import { LiaChartAreaSolid } from "react-icons/lia"
import { BsCurrencyDollar } from "react-icons/bs"
import { GoPackage } from "react-icons/go"
import VisibilitySensor from "react-visibility-sensor"

const DetailSection = () => {
  const params = useParams()
  const parcela = {
    id: params.id.toString()
  }
  const { session, status, user } = useAppSession()
  const refetchUser = useGetUsersQuery({ name: "" })
  const { data: users } = useGetUsersQuery({ name: "" })
  const userWish = user && users?.find((el) => el._id === user._id)

  // const user = useAppSelector((state) => state.user.userData)
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [deleteParcela] = useDeleteParcelaMutation()
  const [desableParcela] = useDesableParcelaMutation()
  const [updateViews] = useUpdateViewsMutation()
  const { data, error, isLoading, isFetching } = useGetParcelaByIdQuery(parcela)
  const [addToWishlist] = useAddToWishlistMutation()
  const [removeFromWishlist] = useRemoveFromWishlistMutation()
  const wishes = userWish?.wishes || []

  useEffect(() => {
    if (data) {
      dispatch(setParcelaData(data))
      updateViews(parcela)
    }
  }, [data])

  if (isLoading || isFetching) return <p>Loading</p>
  if (error) return <p>Some error</p>

  const optionEdit = () => {
    return (
      <div className="flex gap-2 mr-2">
        <Link href={`/form/${parcela.id}`}>
          <Button text={"Editar"}></Button>
        </Link>
        <div onClick={deleteParcel}>
          <Button text={"Deshabilitar"}></Button>
        </div>
      </div>
    )
  }

  const deleteParcel = () => {
    Swal.fire({
      title: "¿Deseas deshabilitar esta parcela?",
      text: "Si aceptas se inhabilitará el producto",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, deshabilita",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          "Inhabilitado con éxito",
          "Tu parcela ha sido desactivada",
          "success"
        )
        desableParcela(parcela)
        setTimeout(() => {
          router.push("/parcelas")
        }, 3000)
      }
    })
  }
  interface NotificationType {
    isOpen: boolean
    type: "approved" | "failure" | null
    content: string
  }

  const handleAddToWishlist = async (id: string, data: Parcela) => {
    await addToWishlist({ id, data: data })

    refetchUser.refetch()
  }

  const handleRemoveFromWishlist = async (id: string) => {
    if (data) {
      await removeFromWishlist({ id, data: data._id })
    }
    refetchUser.refetch()
  }

  const Home = () => {
    const [notification, setNotification] = useState<NotificationType>({
      isOpen: false,
      type: null,
      content: ""
    })

    useEffect(() => {
      const urlParams = new URLSearchParams(window.location.search)
      const status = urlParams.get("status")

      if (status === "approved") {
        setNotification({
          content: "¡Pago aprobado!",
          isOpen: true,
          type: "approved"
        })
      } else if (status === "failure") {
        setNotification({
          content: "¡Pago fallido!",
          isOpen: true,
          type: "failure"
        })
      }

      setTimeout(() => {
        setNotification({
          isOpen: false,
          type: null,
          content: ""
        })
      }, 5000)
    }, [])
  }

  return (
    <>
      <img
        src={data?.image[0]}
        alt="parcela"
        className="absolute object-cover top-0 left-0 w-full h-screen  -z-10 animate-aparition "
      />
      <div className=" rounded-3xl border-solid border-spacing-0 w-[100%] sm:w-[640px] md:w-[768px] lg:w-[1024px] xl:w-[1280px] 2xl:w-[1536px] m-auto  relative overflow-hidden">
        <div className="flex flex-col justify-center m-auto w-full h-screen relative">
          <h1
            className={`absolute left-[6%] bottom-[50%] lg:bottom-[6%]  md:text-3xl f text-white text-3xl font-black ${style.shadowText}`}
          >
            {data?.name}
          </h1>

          <div className="absolute bottom-0 sm:right-[50%] sm:translate-x-[50%] translate-y-[50%] lg:right-[6%] lg:translate-x-0 p-4 w-[100%] sm:w-[100%] lg:w-[45%] bg-white lg:p-8 mt-3 rounded-2xl text-black shadow-lg ">
            <div className="flex gap-2 items-center mt-5">
              <div>
                <GoPackage className="h-7 w-7 text-green-600" />
              </div>
              <div>
                <h3 className="font-bold text-2xl ">Lote No. {data?.lote}</h3>
              </div>
            </div>
            <p className="my-10 tracking-tighter text-gray-500 font-medium">
              {data?.description}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mx-auto justify-center my-10">
              <div className="text-center p-5 bg-white rounded-lg shadow-md">
                <LiaChartAreaSolid className="h-7 w-7 text-green-600 mx-auto" />
                <h3 className="tracking-tighter text-gray-500 font-medium mt-3">
                  Área: {data?.area?.toLocaleString()} m<sup>2</sup>
                </h3>
              </div>
              <div className="text-center p-5 bg-white rounded-lg shadow-md">
                <BsCurrencyDollar className="h-7 w-7 text-green-600 mx-auto" />
                <h3 className="tracking-tighter text-gray-500 font-medium mt-3">
                  Precio: ${data?.price?.toLocaleString()} CLP
                </h3>
              </div>
              <div className="text-center p-5 bg-white rounded-lg shadow-md">
                <TiWeatherPartlySunny className="h-7 w-7 text-green-600 mx-auto" />
                <h3 className="tracking-tighter text-gray-500 font-medium mt-3">
                  Temperatura: 19°C
                </h3>
              </div>
            </div>
          </div>
        </div>

        <div className="w-[100%] sm:w-[100%] lg:w-[45%] p-8  rounded-br-2xl text-white mb-20 mt-[350px] lg:mt-0">
          <VisibilitySensor partialVisibility>
            {({ isVisible }: { isVisible: boolean }) => (
              <h3
                className={`font-bold text-black text-lg mb-8 ${
                  isVisible
                    ? "animate-fade animate-once animate-delay-100 animate-ease-linear"
                    : "opacity-0"
                }`}
              >
                Características
              </h3>
            )}
          </VisibilitySensor>
          <VisibilitySensor partialVisibility>
            {({ isVisible }: { isVisible: boolean }) => (
              <div
                className={`grid grid-cols-1 lg:grid-cols-2 [&>div]:w-[98%] text-gray-950 ${
                  isVisible
                    ? "animate-fade-right animate-once animate-delay-100 animate-ease-linear"
                    : "opacity-0"
                }`}
              >
                <div className="m-1 p-[20px] grid grid-cols-1  bg-[#d9f3e2] text-[#00b34b] rounded-2xl shadow-md">
                  <div className="flex items-center mb-4">
                    <Paisaje />
                    <h2 className="pl-2 font-bold">Proyecto Diverso</h2>
                  </div>
                  <p className="text-justify font-medium">
                    Perfecto para invertir, segunda vivienda o residencia
                    principal.
                  </p>
                </div>
                <div className="m-1 p-[20px] grid grid-cols-1  bg-[#d9f3e2] text-[#00b34b] rounded-2xl shadow-md">
                  <div className="flex items-center mb-4">
                    <Pago />
                    <h2 className=" pl-2 font-bold">Facilidades de Pago</h2>
                  </div>
                  <p className="text-justify font-medium">
                    Crédito directo, pago en cuotas y descuentos en efectivo.
                  </p>
                </div>

                <div className="m-1 p-[20px] grid grid-cols-1  bg-[#d9f3e2] text-[#00b34b] rounded-2xl shadow-md">
                  <div className="flex items-center mb-4">
                    <Camino />
                    <h2 className=" pl-2 font-bold">Acceso óptimo</h2>
                  </div>
                  <p className="text-justify font-medium">
                    Camino de acceso apto para cualquier vehículo.
                  </p>
                </div>
                <div className="m-1 p-[20px] grid grid-cols-1  bg-[#d9f3e2] text-[#00b34b] rounded-2xl shadow-md">
                  <div className="flex items-center mb-4">
                    <Vegetation />
                    <h2 className=" pl-2 font-bold">
                      Superficie y Vegetación Mixta
                    </h2>
                  </div>
                  <p className="text-justify font-medium">
                    Planicies, pendientes, estero, árboles frutales y vegetación
                    variada.
                  </p>
                </div>

                <div className="m-1 p-[20px] grid grid-cols-1  bg-[#d9f3e2] text-[#00b34b] rounded-2xl shadow-md">
                  <div className="flex items-center mb-4 ">
                    <Connection />
                    <h2 className=" mb-2 pl-2 font-bold">
                      Conectividad digital
                    </h2>
                  </div>
                  <p className="text-justify font-medium">
                    Excelente señal telefónica y conectividad 4G en el sector.
                  </p>
                </div>
                <div className="m-1 p-[20px] grid grid-cols-1  bg-[#d9f3e2] text-[#00b34b] rounded-2xl shadow-md">
                  <div className="flex items-center mb-4">
                    <Energy />
                    <h2 className=" pl-2 font-bold">
                      Factibilidad de Energía Eléctrica.
                    </h2>
                  </div>
                  <p className="text-justify font-medium">
                    Tendido eléctrico de fácil desarrollo comunitario.
                  </p>
                </div>
              </div>
            )}
          </VisibilitySensor>
        </div>
        <VisibilitySensor partialVisibility>
          {({ isVisible }: { isVisible: boolean }) => (
            <div
              className={`w-[90%] sm:w-[80%] lg:w-[100%] mx-auto mt-[30px] mb-16 ${
                isVisible
                  ? "animate-fade-up animate-once animate-delay-100 animate-ease-linear"
                  : "opacity-0"
              }`}
            >
              <h2 className={`mb-10 text-2xl text-black text-center font-bold`}>
                Galeria
              </h2>
              <div className="w-full rounded-3xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
                {data ? (
                  Array.isArray(data.image) &&
                  data.image.map((el: string, index: number) => (
                    <div className="shadow-xl rounded-3xl m-2">
                      <img
                        key={index}
                        src={el}
                        alt={el}
                        className="w-full bg-slate-300 h-[300px]  object-cover rounded-3xl"
                      />
                    </div>
                  ))
                ) : (
                  <div>No se encontraron datos</div>
                )}
              </div>
            </div>
          )}
        </VisibilitySensor>
        <VisibilitySensor partialVisibility>
          {({ isVisible }: { isVisible: boolean }) => (
            <div
              className={`w-[100%] h-[500px] rounded-3xl overflow-hidden m-5 mx-auto bg-gray-600 mb-28 ${
                isVisible
                  ? "animate-fade-up animate-once animate-delay-100 animate-ease-linear"
                  : "opacity-0"
              }`}
            >
              <LocationMaps location={data?.location ?? ""} />
            </div>
          )}
        </VisibilitySensor>

        {/* <Button text={"Agregar a carro"}></Button> */}
        <div className="fixed flex justify-end bottom-6 w-[300px] sm:w-[640px] md:w-[768px] lg:w-[1024px] xl:w-[1280px] 2xl:w-[1536px]">
          {user && user?.email === data?.user && optionEdit()}
          {user && user?.email !== data?.user && user.isAdmin && optionEdit()}

          {status === "authenticated" ? (
            data?.status === "Disponible" ? (
              <Link href={`/pago/${parcela.id}`} className="mr-2 shadow-lg">
                <Button text={"Comprar Ahora"}></Button>
              </Link>
            ) : (
              ""
            )
          ) : (
            <Link href="/login" className="mr-2 shadow-lg">
              <Button text={"Comprar Ahora"}></Button>
            </Link>
          )}

          {status === "authenticated" ? (
            wishes.filter((el) => el._id === data?._id).length > 0 ? (
              <div
                className="mr-12 shadow-lg"
                onClick={() => data && handleRemoveFromWishlist(user?._id)}
              >
                <Button text={"Quitar Deseo"}></Button>
              </div>
            ) : (
              <div
                className="mr-12 shadow-lg"
                onClick={() =>
                  data && user && handleAddToWishlist(user?._id, data)
                }
              >
                <Button text={"Agregar Deseo"}></Button>
              </div>
            )
          ) : (
            <Link href="/login" className="mr-12 shadow-lg">
              <Button text={"Agregar Deseo"}></Button>
            </Link>
          )}
        </div>
      </div>
    </>
  )
}

export default DetailSection
