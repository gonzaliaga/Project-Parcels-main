"use client"

import Image from "next/image"
import logo from "../../img/homePicture.jpg"
import Link from "next/link"
import { useEffect, useState } from "react"
import axios from "axios"
import Swal from "sweetalert2"
import { useRouter } from "next/navigation"

export default function Register() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [lastname, setLastname] = useState("")
  const [phone, setPhone] = useState("")
  const [date, setDate] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [repeatPassword, setRepeatPassword] = useState("")
  const [user, setUser] = useState("")
  const [error, setError] = useState("")

  const handleRegister = async () => {
    if (password !== repeatPassword) {
      // Las contraseñas no coinciden, muestra un mensaje de error
      console.error("Las contraseñas no coinciden")
      return
    }
    const data = {
      name: name,
      lastname: lastname,
      phone: phone,
      date: date,
      email: email,
      password: password
    }

    try {
      const response = await fetch(
        "https://parcels-backend.up.railway.app/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Origin": "*"
          },
          body: JSON.stringify(data)
        }
      )

      if (response.ok) {
        const responseData = await response.json()

        // ******** código base para implementar cualquier notificación en cualquier componente ***************
        // const datos = {
        //   "email": responseData.email,
        //   "asunto": 'Tu cuenta personal de Parcelas',
        //   "cuerpo": `${responseData.lastname}, ${responseData.name} bienvenido a Parcelas, la página donde podrás encontrar el lugar de tus sueños`
        // }

        // const email = await axios.post('pf-parcela-production.up.railway.app/emailNotification', datos)

        Swal.fire(
          `¡Gracias ${responseData.name}!`,
          "Te has registrado exitosamente",
          "success"
        )
        return router.push("/login")
      } else {
        const errorData = await response.json()
        if (errorData) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Parece que algo salió mal!",
            footer: '<a href="">Completaste los campos correctamente?</a>'
          })
        }
      }
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex w-[768px] h-[496px] mt-[5rem] animate-fade animate-once animate-duration-700 animate-delay-100 animate-ease-linear">
        <div className="w-1/2 relative">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white w-[90%] z-10">
            <h1 className="text-3xl font-black">Bienvenido/a</h1>
            <p className="leading-[20px] tracking-[0.5px] text-[14px] my-[20px]">
              Ingresa tus datos personales y comienza tu viaje con nosotros
            </p>
          </div>
          <Image
            src={logo}
            alt="Imagen"
            className="h-full w-full object-cover rounded-l-xl shadow-[0_35px_35px_rgba(0,0,0,0.25)] brightness-75"
          />
        </div>
        <div className="w-1/2 bg-gray-100 p-8 flex flex-col text-center justify-center items-center rounded-r-xl shadow-[0_35px_35px_rgba(0,0,0,0.25)]">
          <h2 className="text-3xl font-black mb-6 ">Crea tu cuenta</h2>
          <div className="gap-2 flex">
            <div>
              <div>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-[#00ad68be]"
                  id="name"
                  type="name"
                  placeholder="Nombre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mt-4">
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-[#00ad68be]"
                  id="lastname"
                  type="lastname"
                  placeholder="Apellido"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                />
              </div>
              <div className="mt-4">
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-[#00ad68be]"
                  id="phone"
                  type="phone"
                  placeholder="Telefono"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
            <div>
              <div>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-[#00ad68be]"
                  id="email"
                  type="email"
                  placeholder="Correo"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mt-4">
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-[#00ad68be]"
                  id="password"
                  type="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mt-4">
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-[#00ad68be]"
                  id="password"
                  type="password"
                  placeholder="Repetir Contraseña"
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="my-4">
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-[#00ad68be]"
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="space-y-4 flex flex-col justify-center text-center">
            <div>
              <button
                className="bg-gradient-to-r from-[#ACD453] to-[#039D60] text-white hover:from-[#8cad43] hover:to-[#006F43]   min-w-[9rem] max-w-[9rem] duration-200  font-bold py-2 px-4 rounded-[20px] focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleRegister}
              >
                Registrarse
              </button>
            </div>

            <div className="mt-4 text-[#333] leading-[20px] tracking-[0.5px] text-[14px]">
              ¿Ya posees una cuenta?
            </div>

            <div>
              <Link href={"/login"}>
                <button className="min-w-[9rem] max-w-[9rem] bg-gradient-to-r from-[#ACD453] to-[#039D60] p-[1px] hover:from-[#8cad43] hover:to-[#006F43]  duration-200  rounded-[20px]">
                  <div className="bg-white hover:bg-slate-100 duration-200 font-semibold h-full w-full px-4 py-2  rounded-[20px]">
                    Iniciar sesión
                  </div>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
