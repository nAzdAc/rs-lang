import { useCallback } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const useMessage = () => {
    return useCallback((text, code) => {
        if (!text) return
        const type = code === 200 ? 'success' : 'error'
        toast[type](text, {
            position: 'top-right',
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
    }, [])
}
