import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { RestResponse } from "../../models/Global.model.ts";
import { useEffect, useState } from "react";
import { TreeDetailsType } from "../../models/TreeDetailsPartner.ts";
import axios from "axios";



export default function useTreeDetailsClient() {
    const { idUsers, treeId } = useParams<{
        idUsers: string,
        treeId: string,
    }>();

    const navigate = useNavigate();
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        if (
            idUsers?.length !== 36
        ) {
            setIsError(true);
        }
    }, [idUsers, treeId, navigate]);

    const {
        data: treeDetailsClient,
        isLoading: isTreeDetailsClientLoading,
    } = useQuery<RestResponse<TreeDetailsType>>({
        queryKey: ['treeDetailsClient', idUsers, treeId],
        queryFn: async () => {
            try {
                const response = await axios.get<RestResponse<TreeDetailsType>>(
                    `${import.meta.env.VITE_BACKEND_API_URL}/api/v1/users/${idUsers}/tree/${treeId}`
                );
                return response.data;
            } catch (err) {
                // Vérifie si l'erreur est une erreur 500
                if (axios.isAxiosError(err)) {
                    setIsError(true);
                }
                throw err;
            }
        },
    });
    return {
        treeDetailsClient,
        isTreeDetailsClientLoading,
        isError
    };
}