import Image from "next/image"
import loadingPlant from "@/public/loadingPlant.gif"

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div>
        <Image
          src={loadingPlant}
          alt="Imagen"
          priority={true}
          className="h-[8rem] w-[8rem]"
        />
      </div>
    </div>
  )
}
