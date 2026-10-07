import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { RestResponse } from "../../models/Global.model.ts";
import { authApiAxios } from "../../utils/api.ts";
import { ProjectPartner } from "../../models/ProjectPartner.model.ts";
import { useEffect } from "react";

export default function useProjectPartner() {
  const { parentsId, partnersId } = useParams<{ parentsId: string, partnersId: string }>();

  const navigate = useNavigate();

  useEffect(() => {
    if (isNaN(Number(parentsId)) || isNaN(Number(partnersId))) {
      navigate('/not-found');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parentsId, partnersId]);

  const { data: projectPartner, isLoading: isProjectPartnerLoading } = useQuery<RestResponse<ProjectPartner>>({
    queryKey: ['projectPartner', parentsId, partnersId],
    queryFn: async () => {

      return await authApiAxios<RestResponse<ProjectPartner>>(
        {
          method: 'GET',
          url: `/api/v1/projects/parents/${parentsId}/partners/${partnersId}/child`,
        },
        localStorage.getItem('token')!
      )
    }
  })

  return {
    projectPartner,
    isProjectPartnerLoading
  }
}