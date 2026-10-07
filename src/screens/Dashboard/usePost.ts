import { useState } from "react";
import axios, { AxiosError } from "axios";

interface Payload {
    uuid: string;
    code: number;
    type: string;
}

export default function usePost(url: string) {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const postData = async (payload: Payload) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post(url, payload);
            return response.data;
        } catch (err) {
            const axiosError = err as AxiosError;

            setError(
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (axiosError.response?.data as any)?.data?.error ||
                axiosError.message ||
                "Une erreur est survenue"
            );

            return null;
        } finally {
            setLoading(false);
        }
    };

    return { postData, error, loading };
}