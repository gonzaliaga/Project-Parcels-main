"use client"
import {
  useDeleteParcelaMutation,
  useDesableParcelaMutation,
  useGetParcelasQuery
} from "@/redux/services/parcelApi"
import Button from "../Button/Button"
import Swal from "sweetalert2"
import { useAppDispatch } from "@/redux/hooks"
import Link from "next/link"
import { setParcelas } from "@/redux/features/parcelSlice"
import { BiPencil, BiTrash } from "react-icons/bi"

type Card = {
  name: string
  id: string
  deleted: boolean
}

const Card = ({ name, id, deleted }: Card) => {
  const [deleteParcela] = useDeleteParcelaMutation()
  const [desableParcela] = useDesableParcelaMutation()
  const dispatch = useAppDispatch()

  const parcelasQuery = useGetParcelasQuery("")
  const fetchData = async () => {
    const { data, error, isLoading } = await parcelasQuery.refetch()

    if (data && Array.isArray(data)) {
      dispatch(setParcelas(data))
    }
  }

  const deleteParcel = () => {
    Swal.fire({
      title: "Deseas eliminar esta parcela?",
      text: "Esta eliminacion no se puede revertir",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminalo",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Eliminado", "¡Tu parcela ha sido eliminada!", "success")
        deleteParcela({ id: id })
        fetchData()
      }
    })
  }

  const desableParcel = () => {
    Swal.fire({
      title: "Deseas deshabilitar esta parcela?",
      text: "si aceptas sera deshabilitada",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, deshabilita",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deshabilitada", "Tu parcela a sido inhabilitada", "success")
        desableParcela({ id: id })
        setTimeout(() => {
          fetchData()
        }, 1500)
      }
    })
  }
  const enableParcel = () => {
    Swal.fire({
      title: "Deseas habilitar esta parcela?",
      text: "si aceptas se habilitara la parcela",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, habilitala",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Habilitada", "Tu parcela a sido habilitada", "success")
        desableParcela({ id: id })
        setTimeout(() => {
          fetchData()
        }, 1500)
      }
    })
  }

  return (
    <>
      <tr className="hover:bg-gray-50">
        <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
          <div>{name}</div>
        </th>
        <td className="px-6 py-4">
          {deleted ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-xs font-semibold text-red-600">
              <span className="h-1.5 w-1.5 rounded-full bg-red-600"></span>
              Inactivo
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
              <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
              Activo
            </span>
          )}
        </td>
        <td className="px-6 py-4">Chile</td>
        <td className="px-6 py-4">
          <div className="flex gap-2">
            {deleted ? (
              <button
                className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-600"
                onClick={enableParcel}
              >
                Habilitar
              </button>
            ) : (
              <button
                className="inline-flex items-center gap-1 rounded-full bg-violet-50 px-2 py-1 text-xs font-semibold text-violet-600"
                onClick={desableParcel}
              >
                Deshabilitar
              </button>
            )}
          </div>
        </td>
        <td className="px-6 py-4">
          <div className="flex justify-end gap-4">
            <button onClick={deleteParcel}>
              <BiTrash className="h-6 w-6" />
            </button>
            <Link href={`/form/${id}`}>
              <BiPencil className="h-6 w-6" />
            </Link>
          </div>
        </td>
      </tr>
      {/* <div className="w-full flex justify-between m-2 bg-slate-50 p-4 rounded-lg">
        <h2>{name}</h2>
        <div className="flex gap-1">
          <Link href={`/form/${id}`}>
            <div className="[&>button]:rounded-md">
              <Button text={"Editar"}></Button>
            </div>
          </Link>
          <div className="[&>button]:rounded-md" onClick={deleteParcel}>
            <Button text={"Eliminar"} />
          </div>

          {deleted ? (
            <div className="[&>button]:rounded-md" onClick={enableParcel}>
              <Button text={"Habilitar"} />
            </div>
          ) : (
            <div className="[&>button]:rounded-md" onClick={desableParcel}>
              <Button text={"Deshabilitar"} />
            </div>
          )}
        </div>
      </div> */}
    </>
  )
}

export default Card
