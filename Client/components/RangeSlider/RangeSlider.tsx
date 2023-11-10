"use client"
import React from "react"
import { useState, useEffect, useRef } from "react"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { filterPrice, updatePriceRange } from "@/redux/features/parcelSlice"

type sliderProps = {
  initialMin: number
  initialMax: number
  min: number
  max: number
  step: number
  priceCap: number
}

type CustomEvent = {
  target: HTMLInputElement
}

export const RangeSlider = ({
  initialMin,
  initialMax,
  min,
  max,
  step,
  priceCap
}: sliderProps) => {
  const progressRef = useRef(null as HTMLDivElement | null)
  const dispatch = useAppDispatch()
  const { minPrice, maxPrice } = useAppSelector(
    (state) => state.parcelas.priceRange,
    (prev, current) =>
      prev.minPrice === current.minPrice && prev.maxPrice === current.maxPrice
  )

  const [minValue, setMinValue] = useState("")
  const [maxValue, setMaxValue] = useState("")

  const handleValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target
    if (name === "max") {
      setMaxValue(value)
    }
    if (name === "min") {
      setMinValue(value)
    }
  }

  const handleMin = (e: CustomEvent) => {
    if (maxPrice - minPrice >= priceCap && maxPrice <= max) {
      if (parseInt(e.target.value) > maxPrice) {
      } else {
        dispatch(
          updatePriceRange({ min: parseInt(e.target.value), max: maxPrice })
        )
      }
    } else {
      if (parseInt(e.target.value) < minPrice) {
        dispatch(
          updatePriceRange({ min: parseInt(e.target.value), max: maxPrice })
        )
      }
    }
  }

  const handleMax = (e: CustomEvent) => {
    if (maxPrice - minPrice >= priceCap && maxPrice <= max) {
      if (parseInt(e.target.value) < minPrice) {
      } else {
        dispatch(
          updatePriceRange({ min: minPrice, max: parseInt(e.target.value) })
        )
      }
    } else {
      if (parseInt(e.target.value) > maxPrice) {
        dispatch(
          updatePriceRange({ min: minPrice, max: parseInt(e.target.value) })
        )
      }
    }
  }

  useEffect(() => {
    if (progressRef.current) {
      progressRef.current.style.left = (minPrice / max) * step + "%"
      progressRef.current.style.right = step - (maxPrice / max) * step + "%"
    }
  }, [minPrice, maxPrice, max, step])

  const handleFilterPrice = (event: any) => {
    const filterPriceRange = event?.target.value
    dispatch(filterPrice(filterPriceRange))
  }

  return (
    <div className="flex flex-col " onChange={handleFilterPrice}>
      <div className="flex justify-between items-center mb-6 mt-2 gap-2">
        <div className="rounded-md">
          <span className="p-2  text-sm font-medium">Min CLP $</span>
          <h3
            className="w-full rounded-md  p-[6px] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#039D60] text-sm font-medium pl-2"
          >{ minPrice.toLocaleString()}</h3>
        </div>
        <div className="rounded-md">
          <span className="p-2 text-sm font-medium">Max CLP $</span>
          <h3
            className="w-full rounded-md  p-[6px] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#039D60] text-sm font-medium pl-2"
          >{ maxPrice.toLocaleString()}</h3>

        </div>
      </div>

      <div className="mb-4">
        <div className="slider relative h-1 rounded-md bg-gray-300">
          <div
            className="progress absolute h-1 bg-[#039D60] rounded"
            ref={progressRef}
          ></div>
        </div>

        <div className="range-input relative  ">
          <input
            onChange={handleMin}
            type="range"
            min={min}
            step={step}
            max={max}
            value={minPrice}
            className="range-min absolute w-full -top-1  h-1 bg-transparent appearance-none pointer-events-none"
          />

          <input
            onChange={handleMax}
            type="range"
            min={min}
            step={step}
            max={max}
            value={maxPrice}
            className="range-max absolute w-full  -top-1 h-1  bg-transparent appearance-none  pointer-events-none"
          />
        </div>
      </div>
    </div>
  )
}
