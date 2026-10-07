import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { RestResponse } from "../../models/Global.model.ts";
import { authApiAxios } from "../../utils/api.ts";
import { StorytellingData } from "../../models/Storytelling.model.ts";
import { useEffect } from "react";

export default function useStorytelling() {
  const { storytellingprojetId } = useParams<{ storytellingprojetId: string }>();

  const navigate = useNavigate();

  useEffect(() => {
    if (isNaN(Number(storytellingprojetId))) {
      navigate('/not-found');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storytellingprojetId]);

  const { data: storytelling, isLoading: isStorytellingLoading } = useQuery<RestResponse<StorytellingData>>({
    queryKey: ['projectDescription', storytellingprojetId],
    queryFn: async () => {

      return await authApiAxios<RestResponse<StorytellingData>>(
        {
          method: 'GET',
          url: `/api/v1/storytelling/${storytellingprojetId}`,
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