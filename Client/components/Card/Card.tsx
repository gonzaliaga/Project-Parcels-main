"use client"
import axios from "axios"
import "tailwindcss/tailwind.css"
import { useEffect, useState } from "react"
import { CloudinaryContext, Image } from "cloudinary-react"
import Link from "next/link"
import style from "./card.module.css"
import Button from "../Button/Button"

interface CardProps {
  name: string
  precio: number | string | null
  superficie?: number | null
  image: string[] | string
  id: string
  description?: string
  status?: string
}

function Card({ name, precio, superficie, image, id, status }: CardProps) {
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const [click, setClick] = useState(false)

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          "https://api.cloudinary.com/v1_1/parcelas/resources",
          {
            params: {
              type: "upload",
              prefix: "Parcelas/"
            }
          }
        )
        const images = response.data.resources.map(
          (image: { secure_url: string }) => image.secure_url
        )
        setImageUrls(images)
      } catch (error) {
        // console.log("Error al obtener las imágenes de Cloudinary", error);
      }
    }

    fetchImages()
  }, [])

  const onClick = () => {
    setClick(!click)
  }

  return (
    <div className="flex-1 h-[20rem] justify-center min-w-full text-white overflow-hidden shadow rounded-md border-solid border-5 border-black-500 transform hover:scale-[101%] transition duration-300 ease-in-out relative mb-4 ">
      <div
        className="flex-end m-auto absolute right-6 items-end"
        onClick={onClick}
      ></div>

      <div className="h-auto min-w-full rounded-lg">
        <Image
          src={image}
          alt=""
          className="absolute -z-10 w-full h-full object-cover"
        />

        {/* Rest of the code */}

        {/* <CloudinaryContext cloudName="parcelas">
      {imageUrls.map((imageUrl, index) => (
        <div key={index}>
        <Image
          publicId={imageUrl}
          alt="Img Parcela"
          crop="fill"
          className="absolute w-full top-0 left-0 z-[-1]"
        />
        </div>
        ))}
      </CloudinaryContext> */}
      </div>

      <div className="w-auto transition duration-300 bg-transparent z-30 p-2 h-full  border-black flex flex-col justify-between">
        <div className="hover:opacity-100">
          <h1 className={`${style.textShadow} font-bold opacity-100 `}>
            Nombre: {name}
          </h1>
          <h2 className={`${style.textShadow} font-bold opacity-100 `}>
            Precio: {precio?.toLocaleString()}
          </h2>
          <h5 className={`${style.textShadow} font-bold opacity-100 `}>
            Superficie: {superficie?.toLocaleString()}
          </h5>
          <h6 className={`${style.textShadow} font-bold opacity-100 `}>
            Estado: {status?.toLocaleString()}
          </h6>
        </div>

        <Link href={`/detail/${id}`} className=" [&>button]:my-5 ">
          <button className="bg-[#039D60]  text-white duration-200 px-4 py-[5px] rounded-md ">
            Ver mas
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Card
