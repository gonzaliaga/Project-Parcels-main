/* eslint-disable @next/next/no-img-element */
"use client"
// import Image from "next/image";
import Image from "next/image"
import { useEffect, useState } from "react"
import Other from "@/components/Other/Other"
import { PiPlantDuotone } from "react-icons/pi"
import VisibilitySensor from "react-visibility-sensor"

const ServiceSection = () => {
  const [image1, setImage1] = useState("")
  const [image2, setImage2] = useState("")
  const [image3, setImage3] = useState("")

  useEffect(() => {
    const fetchImage = async (fn: Function) => {
      try {
        let response = await fetch("http://picsum.photos/500/200")
        const imageUrl = response.url
        fn(imageUrl)
      } catch (error) {}
    }
    fetchImage(setImage1)
    fetchImage(setImage2)
    fetchImage(setImage3)
  }, [])

  return (
    <section className="flex flex-col items-center w-[300px] sm:w-[640px] md:w-[768px] lg:w-[1024px] xl:w-[1280px] 2xl:w-[1536px] mx-auto ">
      <div className="flex flex-col h-screen lg:flex-row items-center justify-center w-full">
        <div className="w-[50%] h-[400px] ">
          <VisibilitySensor partialVisibility>
            {({ isVisible }: { isVisible: boolean }) => (
              <div
                className={`max-w-[100%] h-[100%] rounded-3xl text-center overflow-hidden shadow-[0_35px_35px_rgba(0,0,0,0.25)] ${
                  isVisible
                    ? " animate-fade-right animate-once animate-delay-[200ms] animate-ease-in-out"
                    : "opacity-0"
                }`}
              >
                <iframe
                  title="Imagen 360"
                  width="100%"
                  height="500px"
                  src="https://momento360.com/e/u/412de8e5e53843419bca4bb7e11d8630?utm_campaign=embed&utm_source=other&heading=-13.2&pitch=0&field-of-view=81&size=medium&display-plan=true"
                  allowFullScreen
                ></iframe>
              </div>
            )}
          </VisibilitySensor>
        </div>
        <VisibilitySensor partialVisibility>
          {({ isVisible }: { isVisible: boolean }) => (
            <div
              className={`w-[40%] flex flex-col items-start space-y-4 py-4 px-8 text-justify ${
                isVisible
                  ? "animate-fade-left animate-once animate-delay-[200ms] animate-ease-in-out"
                  : "opacity-0"
              }`}
            >
              <div className="max-w-xl mb-4 md:mx-auto lg:max-w-2xl ">
                <div className="flex items-center justify-center w-10 h-10 rounded-full ">
                  <PiPlantDuotone className="h-[2rem] w-[2rem] text-[#039D60]" />
                </div>
                <h2 className="max-w-lg  text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
                  Buscamos evidenciar{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ACD453] to-[#039D60]">
                    el mejor vivir
                  </span>
                </h2>
              </div>
              <div className="text-start">
                <p>
                  ¡Oportunidad única! Parcelas amplias rodeadas de naturaleza y
                  tranquilidad.
                </p>
                <hr className="border-t-4 border-green-600 my-4 w-[50%]" />
                <p>
                  Invierte en tu futuro y disfruta de la vida excepcional que te
                  ofrecen estas parcelas.
                </p>
              </div>
            </div>
          )}
        </VisibilitySensor>
      </div>
      <VisibilitySensor partialVisibility>
        {({ isVisible }: { isVisible: boolean }) => (
          <div
            className={`mt-16 mb-16 px-4 ${
              isVisible
                ? "animate-fade-up animate-once animate-delay-[500ms] animate-ease-out"
                : "opacity-0"
            }`}
          >
            <Other />
          </div>
        )}
      </VisibilitySensor>
    </section>
  )
}

export default ServiceSection
