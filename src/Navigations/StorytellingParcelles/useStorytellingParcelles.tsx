import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { RestResponse } from "../../models/Global.model.ts";
import { authApiAxios } from "../../utils/api.ts";
import { StorytellingData } from "../../models/Storytelling.model.ts";
import { useEffect } from "react";

export default function useStorytelling() {
  const { storytellingparcellesId } = useParams<{ storytellingparcellesId: string }>();

  const navigate = useNavigate();

  useEffect(() => {
    if (isNaN(Number(storytellingparcellesId))) {
      navigate('/not-found');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storytellingparcellesId]);

  const { data: storytelling, isLoading: isStorytellingLoading } = useQuery<RestResponse<StorytellingData>>({
    queryKey: ['projectDescription', storytellingparcellesId],
    queryFn: async () => {

      return await authApiAxios<RestResponse<StorytellingData>>(
        {
          method: 'GET',
          url: `/api/v1/storytelling/${storytellingparcellesId}`,
        },
        localStorage.getItem('token')!
      )
    }
  })

  return {
    storytelling,
    isStorytellingLoading
  }
}