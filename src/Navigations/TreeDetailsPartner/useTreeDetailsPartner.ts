import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { RestResponse } from "../../models/Global.model.ts";
import { authApiAxios } from "../../utils/api.ts";
import { useEffect } from "react";
import { TreeDetailsType } from "../../models/TreeDetailsPartner.ts";



export default function useTreeDetailsPartner() {
    const { parentsId, partnersId, childId, parcelleId, treeId } = useParams<{
        parentsId: string,
        partnersId: string,
        childId: string,
        parcelleId: string,
        treeId: string
    }>();

    const navigate = useNavigate();

    // Vérifier si tous les IDs sont des nombres
    useEffect(() => {
        if (
            isNaN(Number(parentsId)) ||
            isNaN(Number(partnersId)) ||
            isNaN(Number(childId)) ||
            isNaN(Number(parcelleId))
        ) {
            navigate('/not-found');
        }
    }, [parentsId, partnersId, childId, parcelleId, navigate, treeId]);

    const { data: treeDetailsPartner, isLoading: isTreeDetailsPartnerLoading } = useQuery<RestResponse<TreeDetailsType>>({
        queryKey: ['treeDetailsPartner', parentsId, partnersId, childId, parcelleId, treeId],
        queryFn: async () => {
            return await authApiAxios<RestResponse<TreeDetailsType>>(
                {
                    method: 'GET',
                    url: `/api/v1/projects/parents/${parentsId}/partners/${partnersId}/child/${childId}/parcel/${parcelleId}/trees/${treeId}`,
                },
                localStorage.getItem('token')!
            );
        }
    });


    return {
        treeDetailsPartner,
        isTreeDetailsPartnerLoading
    };
}