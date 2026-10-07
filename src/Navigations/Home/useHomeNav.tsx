import { useQuery } from '@tanstack/react-query';
import { RestResponse } from '../../models/Global.model.ts';
import { ProjectFilterType, ProjectParent } from '../../models/Project.model.ts';
import { authApiAxios } from '../../utils/api.ts';
import { useContext, useState } from 'react';
import { AuthContext } from '../../providers/auth/AuthContext.tsx';

export default function useHomeNav() {
  const [typeId, setTypeId] = useState<string>()
  const user = useContext(AuthContext)

  const { data: regions, isLoading: isRegionLoading } = useQuery<RestResponse<ProjectParent[]>>({
    queryKey: ['getRegions', typeId],
    queryFn: async () => {

      return await authApiAxios<RestResponse<ProjectParent[]>>(
        {
          method: 'GET',
          url: `/api/v1/projects/parents/partner/${user?.user?.uuid}/?typeId=${typeId}`,
        },
        localStorage.getItem('token')!
      )
    }
  })

  const { data: projectTypes, isLoading: isProjectTypesLoading } = useQuery<RestResponse<ProjectFilterType[]>>({
    queryKey: ['getProjectTypes'],
    queryFn: async () => {

      return await authApiAxios<RestResponse<ProjectFilterType[]>>(
        {
          method: 'GET',
          url: '/api/v1/projects/types',
        },
        localStorage.getItem('token')!
      )
    }
  })

  return {
    regions,
    isRegionLoading,
    projectTypes,
    isProjectTypesLoading,
    setTypeId
  }
}