import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { RestResponse } from "../../models/Global.model.ts";
import { authApiAxios } from "../../utils/api.ts";
import { DetailsParcellesType } from "../../models/DetailsParcelles.models.ts";
import { useEffect } from "react";
import { TreesSpeciesList } from "../../models/TreesSpeciesList.models.ts";



export default function useDetailsParcelles() {
    const { parentsId, partnersId, childId, parcelleId } = useParams<{
        parentsId: string,
        partnersId: string,
        childId: string,
        parcelleId: string
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
    }, [parentsId, partnersId, childId, parcelleId, navigate]);

    const { data: detailsParcelles, isLoading: isDetailsParcellesLoading } = useQuery<RestResponse<DetailsParcellesType>>({
        queryKey: ['detailsParcelles', parentsId, partnersId, childId, parcelleId],
        queryFn: async () => {
            return await authApiAxios<RestResponse<DetailsParcellesType>>(
                {
                    method: 'GET',
                    url: `/api/v1/projects/parents/${parentsId}/partners/${partnersId}/child/${childId}/parcel/${parcelleId}`,
                },
                localStorage.getItem('token')!
            );
        }
    });

    const { data: treesSpeciesList, isLoading: isTreesSpeciesListLoading } = useQuery<RestResponse<TreesSpeciesList>>({
        queryKey: ['treesSpeciesList', parentsId, partnersId, childId, parcelleId],
        queryFn: async () => {

            return await authApiAxios<RestResponse<TreesSpeciesList>>(
                {
                    method: 'GET',
                    url: `/api/v1/projects/parents/${parentsId}/partners/${partnersId}/child/${childId}/parcel/${parcelleId}/trees`,
                },
                localStorage.getItem('token')!
            )
        }
    })

    return {
        detailsParcelles,
        isDetailsParcellesLoading,
        treesSpeciesList,
        isTreesSpeciesListLoading
    };
}