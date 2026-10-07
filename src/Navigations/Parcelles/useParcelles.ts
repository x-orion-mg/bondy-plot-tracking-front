import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { RestResponse } from "../../models/Global.model.ts";
import { authApiAxios } from "../../utils/api.ts";
import { Parcelles } from "../../models/Parcelles.models.ts";
import { useEffect } from "react";



export default function useParcelles() {
    const { parentsId, partnersId, childId } = useParams<{ parentsId: string, partnersId: string, childId: string }>();

    const navigate = useNavigate();

    useEffect(() => {
        if (isNaN(Number(parentsId)) || isNaN(Number(partnersId)) || isNaN(Number(childId))) {
            navigate('/not-found');
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [parentsId, partnersId, childId]);

    const { data: parcelles, isLoading: isParcellesLoading } = useQuery<RestResponse<Parcelles>>({
        queryKey: ['parcelles', parentsId],
        queryFn: async () => {

            return await authApiAxios<RestResponse<Parcelles>>(
                {
                    method: 'GET',
                    url: `/api/v1/projects/parents/${parentsId}/partners/${partnersId}/child/${childId}/parcel`,
                },
                localStorage.getItem('token')!
            )
        }
    })

    return {
        parcelles,
        isParcellesLoading
    }
}