import { useDispatch, useSelector } from "react-redux"

import { selectList as selectProductsList } from "./selectors"
import { useEffect } from "react"
import { getCurrentUser } from "@/services/auth/authServices"

export const useFetchCurrentUser = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCurrentUser())
    }, [dispatch])
}

// Lấy ra danh sách sản phẩm sử dụng useSelector
export const useCurrentUser = () => {
    const currentUser = useSelector(selectProductsList)
    return currentUser
}
