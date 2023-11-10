"use client"
import { signIn } from "next-auth/react"
import { FcGoogle } from "react-icons/fc"

export default function ButtonGoogle() {
  return (
    <div>
      <button onClick={() => signIn("google")} type="button">
        <FcGoogle className="text-center sm:w-10 sm:h-10 " />
      </button>
    </div>
  )
}
