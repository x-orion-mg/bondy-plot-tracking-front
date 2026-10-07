import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { RestResponse } from "../../models/Global.model.ts";
import { authApiAxios } from "../../utils/api.ts";
import { SubProjectData } from "../../models/Subproject.model.ts";
import { useEffect } from "react";

export default function useSubProjectDetails() {
  const { subProjectId } = useParams<{ descriptionId: string, userId: string, subProjectId: string }>();

  const navigate = useNavigate();

  useEffect(() => {
    if (isNaN(Number(subProjectId))) {
      navigate('/not-found');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subProjectId]);

  const { data: subProjectDetails, isLoading: isSubProjectDetailsLoading } = useQuery<RestResponse<SubProjectData>>({
    queryKey: ['subProjectDetails', subProjectId],
    queryFn: async () => {

      return await authApiAxios<RestResponse<SubProjectData>>(
        {
          method: 'GET',
          url: `/api/v1/subproject/${subProjectId}`,
        },
        localStorage.getItem('token')!
      )
    }
  })

  return {
    subProjectDetails,
    isSubProjectDetailsLoading
  }
}