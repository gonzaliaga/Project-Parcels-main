"use client"
import UserSettings from "@/components/UserSettings/UserSettings"
import { useAppSession } from "../hook"
import Home from "../page"

const UserDataRegister = ({ children }: { children: React.ReactNode }) => {
  const { status } = useAppSession()
  if (status === "unauthenticated") {
    return <Home />
  }
  return (
    <div className="flex pt-[7rem]">
      <UserSettings />
      <section className="w-full lg:w-8/12 px-4 mx-auto">{children}</section>
    </div>
  )
}

export default UserDataRegister
