"use client"
import Image from "next/image"
import error from "@/img/error.png"
import { setError } from "@/redux/features/errorSlice"
import { useAppDispatch } from "@/redux/hooks"
import { useRouter } from "next/navigation"
export default function Error() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const handleButton = () => {
    dispatch(setError(false))
    router.push("/")
  }
  return (
    <div className="z-[1000] lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
      <div className="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
        <div className="">
          <h1 className="my-2 text-gray-800 text-3xl font-black">
            Oops! Pagina no encontrada
          </h1>
          <p className="my-2 text-gray-800 font-semibold">
            Lo lamentamos. Parece que la pagina no existe, pero puedes volver a
            nuestra pagina de inicio!
          </p>

          <button
            className="sm:w-full lg:w-auto my-2 border rounded md py-2 px-6 text-center bg-[#51a8a1] text-white hover:bg-[#126e67] duration-200"
            onClick={handleButton}
          >
            Volver!
          </button>
        </div>
      </div>
      <div>
        <Image src={error} priority={true} alt="#" />
      </div>
    </div>
  )
}
