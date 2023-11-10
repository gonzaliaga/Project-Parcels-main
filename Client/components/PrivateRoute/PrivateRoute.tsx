/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useAppSelector } from "@/redux/hooks"
import { useAppSession } from "@/app/hook"

interface PrivateRouteProps {
  children: React.ReactNode
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const router = useRouter()

  const {user} = useAppSession();

  useEffect(() => {
    if (user) {
      if (!user.isAdmin && !user.isCompany) {
        router.push("/")
      }
    } else {
      router.push("/")
    }
  }, [ router, user])

  return <>{children}</>
}

export default PrivateRoute
