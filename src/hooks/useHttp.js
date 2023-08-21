import axios from "axios";
import { useState } from "react";

export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const request = async (url, method = "get", body = null) => {
        try {
            setLoading(true)
            const res = await axios[method](url, body)
            if (res.data === 200 || 201) {
                setLoading(false)
                return res.data
            }
        } catch (e) {
            setLoading(false)
            setError(true)
            return e.message
        }
    }

    return {request, loading, error}
}