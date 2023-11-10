"use client"
import Card from "../../components/Card/Card"
import Filter from "@/components/Filters/Filter"
import "tailwindcss/tailwind.css"
import CustomPagination from "@/components/CustomPagination/CustomPagination"
import SearchNotFound from "@/components/SearchNotFound/SearchNotFound"
import { useGetParcelasQuery } from "@/redux/services/parcelApi"
import { setParcelas } from "@/redux/features/parcelSlice"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { useState, useEffect } from "react"
import Loading from "@/components/Loading/Loading"

export default function Parcelas() {
  const { data, error, isLoading, isFetching } = useGetParcelasQuery("")
  const dispatch = useAppDispatch()
  const parcels = useAppSelector((state) => state.parcelas.parcelas)
  const [page, setPage] = useState(1)
  const [porPage, setPorPage] = useState(6)
  const [inputPage, setInputPage] = useState(1)

  const ultimaParcelaenlapagina = page * porPage
  const primeraParcelaenlapagina = ultimaParcelaenlapagina - porPage

  const currentParcels = parcels.slice(
    primeraParcelaenlapagina,
    ultimaParcelaenlapagina
    // (page - 1) * porPage,
    // (page - 1) * porPage + porPage
  )
  useEffect(() => {
    setPage(1)
    setInputPage(1)
  }, [parcels])

  const max = Math.ceil(parcels.length / porPage)
  useEffect(() => {
    if (data && Array.isArray(data)) {
      dispatch(setParcelas(data))
    }
  }, [data, dispatch])

  if (isLoading || isFetching)
    return (
      <div>
        <Loading />
      </div>
    )
  if (error) return <p>Some error</p>
  if (!data || !Array.isArray(data)) return <p>no data</p>

  return (
    <div className="flex flex-col relative w-full pt-[4rem] ">
      <div className="">
        <div className="flex flex-col justify-center items-center pt-[1rem] px-[11rem]">
          <Filter />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center w-full animate-fade animate-once animate-delay-100 animate-ease-linear">
            {currentParcels.length ? (
              currentParcels.map((el, index) => {
                if (el.deleted === false) {
                  return (
                    <Card
                      key={index}
                      name={el.name}
                      precio={`CLP $${el.price?.toLocaleString()}`}
                      superficie={el.area}
                      description={el.description}
                      image={el.image[0]}
                      id={el._id}
                      status={el.status}
                    />
                  )
                }
              })
            ) : (
              <SearchNotFound />
            )}
          </div>
          {currentParcels.length ? (
            <CustomPagination
              max={max}
              page={page}
              setPage={setPage}
              inputPage={inputPage}
              setInputPage={setInputPage}
            />
          ) : null}
        </div>
      </div>
    </div>
  )
}
