/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import Link from "next/link"
import Image from "next/image"
import logo from "../../img/logoIcon.png"
import Button from "../Button/Button"
import { AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai"
import UserMenu from "../UserMenu/UserMenu"
import React, { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { setUserData } from "@/redux/features/userSlice"
import { useAppDispatch } from "@/redux/hooks"
import { useRouter } from "next/navigation"
import { signOut } from "next-auth/react"
import { NewUser, useAppSession } from "@/app/hook"
import { useGetUsersQuery } from "@/redux/services/userApi"

export default function Navbar() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [navbarBackground, setNavbarBackground] = useState(false)
  const { user: info, status } = useAppSession()
  const { data: dataUser } = useGetUsersQuery({ name: "" })
  const user = dataUser?.find((el) => el.email === info?.email) as NewUser

  const activeLink =
    "border-b-2  border-[#039D60] text-[#039D60] duration-200 cursor-pointer font-semibold"
  const inactiveLink =
    "border-b-2  border-[#039D60] font-semibold border-opacity-0 hover:border-opacity-100 hover:text-[#039D60] duration-200 cursor-pointer"
  const pathName = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      const isTop = window.scrollY < 2
      if (isTop !== navbarBackground) {
        setNavbarBackground(isTop)
      }
    }

    document.addEventListener("scroll", handleScroll)
    return () => {
      document.removeEventListener("scroll", handleScroll)
    }
  }, [navbarBackground])

  const handleLogout = async () => {
    const closeSession = await signOut()
    if (closeSession) {
      dispatch(setUserData(null))
    }
  }

  useEffect(() => {
    if (pathName === "/admin" && !user?.isAdmin && !user?.isCompany) {
      router.push("/")
    }
  }, [pathName, router])

  return (
    <nav
      className={`flex fixed  items-center justify-between p-[0.50rem] px-[3rem] z-[50] w-full shadow-md ${
        navbarBackground
          ? "bg-transparent"
          : "bg-white ease-in-out duration-300"
      }`}
    >
      <div className="flex items-center gap-[3rem]">
        <Image src={logo} alt="#" className="w-[6rem] h-[3rem]" />
        <ul className="flex justify-end gap-[2rem] items-center">
          <li className=" pr-[22px] py-[20px]">
            <Link
              href="/"
              className={pathName === "/" ? activeLink : inactiveLink}
            >
              Inicio
            </Link>
          </li>
          <li className="px-[22px] py-[20px]">
            <Link
              className={pathName === "/parcelas" ? activeLink : inactiveLink}
              href="/parcelas"
            >
              Parcelas
            </Link>
          </li>
          {/* <li className="px-[22px] py-[20px]">
          <Link
            className={pathName === "/about" ? activeLink : inactiveLink}
            href="/about"
          >
            Nosotros
          </Link>
        </li> */}
          <li className="px-[22px] py-[20px]">
            <Link
              className={pathName === "/contact" ? activeLink : inactiveLink}
              href="/contact"
            >
              Contacto
            </Link>
          </li>
          {user?.isAdmin || user?.isCompany ? (
            <li className="px-[22px] py-[20px]">
              <Link
                className={pathName === "/admin" ? activeLink : inactiveLink}
                href="/admin"
              >
                Administrador
              </Link>
            </li>
          ) : null}
        </ul>
      </div>

      {!user ? (
        <>
          {status === "authenticated" ? (
            //  {userLoggedIn ? (
            <div className="w-3/12 flex items-center justify-end gap-4">
              {/* <AiOutlineSearch className="h-9 w-9 p-1 hover:text-[#51a8a1] duration-200 text-white" />
              <AiOutlineShoppingCart className="h-9 w-9 p-1 hover:text-[#51a8a1] duration-200 text-white" />
              <BiSolidUserCircle className="h-12 w-12 p-1 hover:text-[#51a8a1] duration-200 text-white" /> */}
              <UserMenu user={user} handleLogout={handleLogout} />
            </div>
          ) : (
            <div className="w-3/12 flex gap-2 items-center justify-end">
              <Link href={"/login"}>
                <button className="bg-gradient-to-r from-[#ACD453] to-[#039D60] p-[1px] hover:from-[#8cad43] hover:to-[#006F43]  duration-200  rounded-md">
                  <div className="bg-white h-full w-full px-3 py-[5px]  rounded-md">
                    Iniciar sesión
                  </div>
                </button>
              </Link>

              <div>
                <Link href={"/register"}>
                  <Button text="Inscribirse" />
                </Link>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="w-3/12 flex items-center justify-end gap-4">
          <UserMenu user={user} handleLogout={handleLogout} />
        </div>
      )}
    </nav>
  )
}
