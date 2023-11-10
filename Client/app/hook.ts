"use client"
import { useSession } from "next-auth/react"
import { DefaultUser } from "next-auth"
import { useEffect } from "react"
import { Parcela } from "@/redux/services/parcelApi"
export interface NewUser extends DefaultUser {
  _id: string
  name: string
  lastname: string
  phone: number
  date: string
  email: string
  image: string
  password: string
  provider?: string
  accessToken?: string
  isAdmin: boolean
  isCompany: boolean
  wishes?: Parcela[]
}
const useAppSession = () => {
  const { data: session, status } = useSession()
  const user = session?.user as NewUser
  useEffect(() => {
    // Verificar si estamos en el lado del cliente
    if (typeof window !== "undefined") {
      // Acceder a los contextos de React aquí
    }
  }, [])
  return {
    user,
    session,
    status
  }
}

export { useAppSession }
