"use client"

import { Provider } from "react-redux"
import { store } from "./store"
import { useAppSession } from "@/app/hook"
import Loading from "@/components/Loading/Loading"
interface Props {
  children: React.ReactNode
}

export default function Providers({ children }: Props) {
  const { status } = useAppSession()

  if (status === "loading") {
    return <Loading />
  } else {
    return <Provider store={store}>{children}</Provider>
  }
}
