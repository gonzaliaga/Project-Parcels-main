/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import Image from "next/image"
import logo from "../../img/forestImage.jpg"
import Link from "next/link"
import ButtonGoogle from "@/components/ButtonGoogle/ButtonGoogle"
import { FormEvent, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Swal from "sweetalert2"
import { signIn } from "next-auth/react"
import { useAppSession } from "../hook"
import { setUserData } from "@/redux/features/userSlice"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import Loading from "@/components/Loading/Loading"

type CustomEvent = {
  target: HTMLInputElement
}

export default function Login() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { user, status } = useAppSession()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [input, setInput] = useState({
    email: "",
    password: ""
  })

  const handleInputChange = (event: CustomEvent) => {
    const { name, value } = event.target
    if (name === "name") {
      setInput({
        ...input,
        email: value
      })
    }
    if (name === "password") {
      setInput({
        ...input,
        password: value
      })
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLButtonElement>) => {
    const res = await signIn("credentials", {
      email: input.email,
      password: input.password,
      redirect: false
    })

    if (res?.error) {
      setError(res.error as string)
    } else if (res?.ok && res.url) {
      Swal.fire(`¡Bienvenido!`, "Has iniciado sesión", "success")
      return router.push("/")
    } else {
      setError("Error de autenticación")
    }
  }

  useEffect(() => {
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Parece que algo salió mal!",
        footer: '<a href="">¿Tienes una cuenta registrada?</a>'
      })
    }
  }, [error])

  useEffect(() => {
    const handleLogin = async () => {
      if (user) {
        setIsLoading(true)
        dispatch(setUserData(user))
        Swal.fire(
          `Bienvenido/a ${user?.name}`,
          "Has iniciado sesión",
          "success"
        )
        router.push("/")
      }
    }
    handleLogin()
  }, [user, dispatch, user, router])

  if (status === "loading" || isLoading) {
    return <Loading />
  } else if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex w-[768px] h-[496px] mt-[5rem] animate-fade animate-once animate-duration-700 animate-delay-100 animate-ease-linear">
          <div className="w-1/2 bg-gray-100 p-10 flex flex-col justify-center items-center rounded-l-xl shadow-[0_35px_35px_rgba(0,0,0,0.25)] ">
            <h2 className="text-3xl font-black mb-6 ">Iniciar sesión</h2>
            <div className="flex pb-4">
              <div className="border-none text[#ddd] rounded-[50%] inline-flex justify-center items-center mx-[5px] h-[40px] w-[40px]">
                <ButtonGoogle />
              </div>
            </div>
            <div className="mb-4">
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-[#00ad68be]"
                id="email"
                name="name"
                value={input.email}
                type="email"
                placeholder="Correo"
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-[#00ad68be]"
                id="password"
                type="password"
                name="password"
                value={input.password}
                onChange={handleInputChange}
                placeholder="Contraseña"
              />
            </div>
            <div className="space-y-4 flex flex-col justify-center items-center">
              <div className="mt-4 text-[#333] leading-[20px] tracking-[0.5px] text-[14px]">
                ¿Olvidaste tu constraseña?
              </div>
              <button
                className="min-w-[9rem] max-w-[9rem] bg-gradient-to-r from-[#ACD453] to-[#039D60] p-[1px] hover:from-[#8cad43] hover:to-[#006F43]  duration-200  rounded-[20px]"
                type="button"
                onClick={handleSubmit}
              >
                <div className="bg-white hover:bg-slate-100 duration-200 font-semibold h-full w-full px-4 py-2  rounded-[20px]">
                  Iniciar sesión
                </div>
              </button>

              <div>
                <Link href={"/register"}>
                  <button
                    className="bg-gradient-to-r from-[#ACD453] to-[#039D60] text-white hover:from-[#8cad43] hover:to-[#006F43]   min-w-[9rem] max-w-[9rem] duration-200  font-bold py-2 px-4 rounded-[20px] focus:outline-none focus:shadow-outline"
                    type="button"
                  >
                    Registrarse
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="w-1/2 relative">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white w-[90%]">
              <h1 className="text-3xl font-black">¡Bienvenido!</h1>
              <p className="leading-[20px] tracking-[0.5px] text-[14px] my-[20px]">
                Para mantenerse conectado con nosotros, inicie sesión con su
                información personal
              </p>
            </div>
            <Image
              src={logo}
              alt="Imagen"
              priority={true}
              className="h-full w-full object-cover rounded-r-xl shadow-[0_35px_35px_rgba(0,0,0,0.25)]"
            />
          </div>
        </div>
      </div>
    )
  }
}
