import { useQuery } from '@tanstack/react-query';
import { RestResponse } from '../../models/Global.model.ts';
import { authApiAxios } from '../../utils/api.ts';
import { useNavigate, useParams } from 'react-router-dom';
import { ProjectDetails } from '../../models/ProjectDetails.model.ts';
import { useEffect } from 'react';

export default function useDescriptionNav() {
  const { parentsId } = useParams<{ parentsId: string }>();

  const navigate = useNavigate();


  useEffect(() => {
    if (isNaN(Number(parentsId))) {
      navigate('/not-found');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parentsId]);

  const { data: projectDescription, isLoading: isProjectDescriptionLoading } = useQuery<RestResponse<ProjectDetails>>({
    queryKey: ['projectDescription', parentsId],
    queryFn: async () => {

      return await authApiAxios<RestResponse<ProjectDetails>>(
        {
          method: 'GET',
          url: `/api/v1/projects/parents/${parentsId}`,
        },
        localStorage.getItem('token')!
      )
    }
  })

  return {
    projectDescription,
    isProjectDescriptionLoading
  }
}