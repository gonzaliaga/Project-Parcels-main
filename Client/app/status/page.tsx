import React from "react"
import Button from "@/components/Button/Button"
import { PiPlantDuotone } from "react-icons/pi"
import Link from "next/link"

const status: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-6 md:mx-auto">
        <svg
          viewBox="0 0 24 24"
          className="text-green-600 w-16 h-16 mx-auto my-6"
        >
          <path
            fill="currentColor"
            d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
          ></path>
        </svg>
        <div className="text-center">
          <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
            ¡Pago completado!
          </h3>
          <p className="text-gray-600 my-2">
            Muchas gracias por confiar sus sueños y realizar su compra con
            nosotros.
          </p>
          <p className="text-gray-600 my-2">
            La documentación y los detalles se enviarán a nuestro notario /
            escribano para el contrato de compraventa.
          </p>
          <p> ¡Que tenga un buen día! </p>
          <div className="py-8 text-center">
            <Link href={"/parcelas"}>
              <button
                className="min-w-[9rem] max-w-[9rem] bg-gradient-to-r from-[#ACD453] to-[#039D60] p-[1px] hover:from-[#8cad43] hover:to-[#006F43]  duration-200  rounded-lg"
                type="button"
              >
                <div className="bg-white hover:bg-slate-100 duration-200 font-semibold h-full w-full px-4 py-2  rounded-lg">
                  Volver
                </div>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
    // <div className='flex justify-center items-center h-screen'>
    //   <div className="w-1/2 bg-gray-100 p-10 rounded-lg shadow-[0_35px_35px_rgba(0,0,0,0.25)]">
    //     <h1 className="text-4xl"><strong className="underline decoration-sky-500 decoration-dotted">Detalle de pago</strong></h1>
    //     <PiPlantDuotone className="h-[2rem] w-[2rem] text-[#51a8a1]" />
    //     <main>
    //       <section>
    //         <br />
    //         <h2 className="text-lg">Status:  <strong className="text-lime-500 ">Aprobado</strong> </h2>
    //         <br />
    //         <p className='text-justify'>
    //           Muchas gracias por confiar sus sueños y realizar su compra con nosotros, se esta preparando la Documentación Digital y se enviarán los detalles a nuestro Notario / Escribano para el contrato de Compraventa.
    //         </p>
    //         <p className='text-left'>
    //           Estamos muy Emocionados por su Proyecto!
    //         </p>
    //         <br />
    //         <hr />
    //         <p>Cualquier duda puede comunicarse con nosotros de la siguiente forma:<br />
    //           <br />
    //           <p className="list-outside ">
    //           Teléfono: +56 9 5665 9732<br />
    //           Email: parcela@casolutions.cl<br />
    //           En nuestras Oficinas:<br />
    //           Calle Los Radales, Parcela 374<br /> Club de Campo Residencial | Puerto Varas<br />
    //           Región de los Lagos | Chile<br />
    //           </p>
    //         </p>
    //         <br />
    //         <div className="flex justify-center items-center">
    //         <a href={"/"}>
    //           <Button text={"Volver al Inicio"} ></Button>
    //         </a>
    //         </div>

    //       </section>
    //     </main>
    //     <footer>
    //       <p>© {new Date().getFullYear()} CA.Solutions </p>
    //     </footer>
    //   </div>
    // </div>
  )
}

export default status
