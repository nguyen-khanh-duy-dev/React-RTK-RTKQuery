import { useDispatch, useSelector } from "react-redux"

import { selectList as selectProductsList } from "./selectors"
import { useEffect } from "react"
import { getList as getProductList } from "@/services/products"

export const useFetchProductsList = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProductList())
    }, [dispatch])
}

// Lấy ra danh sách sản phẩm sử dụng useSelector
export const useProductsList = () => {
    const products = useSelector(selectProductsList)
    return products.items
}
