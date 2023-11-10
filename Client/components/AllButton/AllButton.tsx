"use client"
import { useGetParcelasQuery } from "@/redux/services/parcelApi"
import { setParcelas } from "@/redux/features/parcelSlice"
import { useAppDispatch } from "@/redux/hooks"

export default function AllButton() {
  const dispatch = useAppDispatch()

  const { data } = useGetParcelasQuery("")

  const reset = () => {
    if (data) {
      dispatch(setParcelas(data))
    }
  }

  return (
    <button
      className=" text-green-600 hover:text-gray-400 duration-200 text-[0.80rem] font-semibold"
      onClick={reset}
    >
      TODAS
    </button>
  )
}
