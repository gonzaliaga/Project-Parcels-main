/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react"
import Axios from "axios"
import { Image, Transformation } from "cloudinary-react"
import { useAppDispatch } from "@/redux/hooks"
import { setImageCloud } from "@/redux/features/coordenadaSlice"

const urlUpload = process.env.NEXT_PUBLIC_CLOUDINARY

export default function UploadImage() {
  const [imagesSelected, setImagesSelected] = useState<File[]>([])
  const [uploadedImages, setUploadedImages] = useState<string[]>([])
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setImageCloud(uploadedImages))
  }, [uploadedImages])

  // console.log(uploadedImages);

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
          formData.append("public_id", "parcelas/" + image.name)

          const response = await Axios.post(`${urlUpload}`, formData)
          return response.data.secure_url
        } catch (error) {
          console.log("Error uploading image to Cloudinary", error)
          throw error
        }
      })

      const uploadedImageUrls = await Promise.all(uploadPromises)
      setUploadedImages([...uploadedImages, ...uploadedImageUrls])
      setUploadSuccess(true)
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

  return (
    <div className="flex flex-col justify-center items-start text-black">
      <div className=" flex flex-col items-center justify-center rounded-lg cursor-pointer w-[100%] mb-[1rem] ">
        <button
          className=" bg-gradient-to-r from-[#ACD453] to-[#039D60] p-[1px] hover:from-[#8cad43] hover:to-[#006F43]  duration-200  rounded-lg"
          type="button"
          onClick={handleButtonClick}
        >
          <div className="bg-white hover:bg-slate-100 duration-200 font-semibold h-full w-full px-3 py-1 rounded-lg">
            Añadir imagen
          </div>
        </button>

        {uploadSuccess ? (
          <p className="text-green-500">Subida correctamente</p>
        ) : (
          imagesSelected.length > 0 && (
            <p>{imagesSelected.length} Imagen seleccionada</p>
          )
        )}
      </div>
    </div>
  )
}
