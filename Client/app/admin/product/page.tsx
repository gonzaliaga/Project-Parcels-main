"use client"
import Card from "@/components/Admin/Card"
import ProductSection from "@/components/product/Product"
import { setParcelas } from "@/redux/features/parcelSlice"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { useGetParcelasQuery } from "@/redux/services/parcelApi"
import { useEffect } from "react"


const Product = () => {
    return (
        <>
            <ProductSection />
        </>
    )
}

export default Product;
