import HomeTitle from "../HomeTitle/HomeTitle"
import homeLogo from "@/img/homeLogo.png"
import Image from "next/image"

export default function HomeSection() {
  return (
    <div className="h-screen flex justify-between">
      <div>
        <HomeTitle />
      </div>
      <div className="w-[700px] animate-fade animate-delay-300">
        <Image src={homeLogo} alt="#" />
      </div>
    </div>
  )
}
