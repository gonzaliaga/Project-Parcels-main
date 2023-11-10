/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client"
import { PiShoppingCart } from "react-icons/pi"
import {
  AiOutlineHeart,
  AiOutlineSetting,
  AiOutlineCamera
} from "react-icons/ai"
import { BsPencil } from "react-icons/bs"
import Swal from "sweetalert2"
import { IoLogOutOutline } from "react-icons/io5"
import Link from "next/link"
import { GoHome } from "react-icons/go"
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useAppSession } from "@/app/hook"
import { useGetUsersQuery } from "@/redux/services/userApi"
import { useState, useEffect } from "react"
import { useAppDispatch } from "@/redux/hooks"
import { setNewImageCloud } from "@/redux/features/coordenadaSlice"
import { useUpdateUserMutation } from "@/redux/services/userApi"
import axios from "axios"

export default function UserSettings() {
  const { user: info } = useAppSession()
  const [updateUser] = useUpdateUserMutation()
  const { data: dataUser } = useGetUsersQuery({ name: "" })
  const user = dataUser?.find((el) => el.email === info?.email)
  const refetchUser = useGetUsersQuery({ name: "" })
  const router = useRouter()
  const [imagesSelected, setImagesSelected] = useState<File[]>([])
  const [uploadedImages, setUploadedImages] = useState<string>("")
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setNewImageCloud(uploadedImages))
  }, [uploadedImages])

  const uploadImg = async () => {
    if (imagesSelected.length === 0) {
      console.log("No image has been selected")
      return
    }

    try {
      const uploadPromises = imagesSelected.map(async (image) => {
        try {
          const formData = new FormData()
          formData.append("file", image)
          formData.append("upload_preset", "parcelas")
          formData.append("public_id", "avatars/" + image.name)

          const response = await axios.post(
            "https://api.cloudinary.com/v1_1/parcelas/image/upload",
            formData
          )
          return response.data.secure_url
        } catch (error) {
          console.log("Error uploading image to Cloudinary", error)
          throw error
        }
      })

      const uploadedImageUrls = await Promise.all(uploadPromises)
      setUploadedImages(uploadedImages)
      setUploadSuccess(true)
      if (user) {
        const {
          _id,
          name,
          lastname,
          phone,
          image,
          date,
          email,
          password,
          isAdmin,
          isCompany
        } = user
        const data = {
          name,
          lastname,
          phone,
          image: uploadedImageUrls[0],
          date,
          email,
          password,
          isAdmin,
          isCompany
        }
        await updateUser({ id: _id, data })
        refetchUser.refetch()
        Swal.fire(`¡Listo!`, "Has cambiado tu foto", "success")
      }
    } catch (error) {
      console.log("Error uploading images to Cloudinary", error)
    }
  }

  const handleButtonClick = () => {
    const input = document.createElement("input")
    input.type = "file"
    input.multiple = true
    input.accept = "image/*"

    input.onchange = (event: any) => {
      const files = (event.target as HTMLInputElement).files
      if (files && files.length > 0) {
        const selectedImages = Array.from(files)
        setImagesSelected(selectedImages)
      }
    }

    input.click()
  }

  useEffect(() => {
    uploadImg()
  }, [imagesSelected])

  const handleLogout = async () => {
    const closeSession = await signOut()
    if (closeSession) {
      router.push("/")
    }
  }

  return (
    <section>
      <div className="w-full px-4 mx-auto">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
          <div className="px-6">
            <div className="flex flex-wrap justify-center">
              <div className="w-full px-4 flex justify-center animate-fade animate-once animate-delay-50 animate-ease-linear">
                <div className="rounded-full absolute overflow-hidden w-[7rem] h-[7rem] top-[-18%]">
                  <img
                    src={user?.image ?? "default-image-url"}
                    alt="not found"
                    className="object-cover object-center w-full h-full"
                  />
                </div>
                <button
                  className="absolute top-2 right-[36%]"
                  onClick={handleButtonClick}
                >
                  <AiOutlineCamera className="h-7 w-7 stroke-current text-black bg-[#dbdade] rounded-full p-1" />
                </button>
              </div>
            </div>
            <div className="text-center mt-12">
              <h3 className="text-xl font-semibold leading-normal mb-2 flex justify-center items-center gap-2">
                {user?.name} {user?.lastname}
                <Link rel="stylesheet" href="/userDataRegister/nameUpdate">
                  <BsPencil className="h-4 w-4 hover:text-[#039D60] duration-200" />
                </Link>
              </h3>
              <div className="text-sm leading-normal  mt-0 mb-2  ">
                {user?.email}
              </div>
            </div>
            <div className="mt-8 py-4 border-t text-center">
              <div className="w-full px-2">
                <Link rel="stylesheet" href="/">
                  <div className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-[#00ad68be] hover:text-white ">
                    <GoHome className="h-6 w-6 stroke-current" />
                    <span className="ml-2 text-sm font-medium">Inicio</span>
                  </div>
                </Link>

                <Link rel="stylesheet" href="/userDataRegister/wishes">
                  <div className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-[#00ad68be] hover:text-white">
                    <AiOutlineHeart className="h-6 w-6 stroke-current" />
                    <span className="ml-2 text-sm font-medium">Deseos</span>
                  </div>
                </Link>
                <Link rel="stylesheet" href="/userDataRegister">
                  <div className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-[#00ad68be] hover:text-white">
                    <AiOutlineSetting className="h-6 w-6 stroke-current" />
                    <span className="ml-2 text-sm font-medium">Ajustes</span>
                  </div>
                </Link>
                <button
                  className="relative flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-[#00ad68be] hover:text-white"
                  onClick={handleLogout}
                >
                  <IoLogOutOutline className="h-6 w-6 stroke-current" />
                  <span className="ml-2 text-sm font-medium">
                    Cerrar sesion
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
