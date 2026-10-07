import { useQuery } from '@tanstack/react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { apiAxios } from '../utils/api';
import { RestResponse } from '../models/Global.model.ts';
import { useContext } from 'react';
import { AuthContext } from '../providers/auth/AuthContext.tsx';
import { GetUserResponse } from '../models/GetUserResponse.ts';

export function useAuth() {

  const token = localStorage.getItem('token');
  const [searchParams] = useSearchParams();
  const tokenFromUrl = searchParams.get('token');
  const navigate = useNavigate();
  const authContext = useContext(AuthContext)

  const validateToken = async () => {

    if (!token && !tokenFromUrl) {
      navigate('/not-authorized');
      return null;
    }

    try {
      const response = await apiAxios<RestResponse<GetUserResponse>>({
        method: 'GET',
        url: `/api/v1/partner/check-token?token=${tokenFromUrl || token}`,
      });


      if (tokenFromUrl) {
        localStorage.removeItem('token');
        localStorage.setItem('token', tokenFromUrl!);
      }

      if (response.data.user) {
        authContext?.login(response.data.user);
      } else {
        navigate('/not-found/?name=user');
      }

      return response.data.user;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      localStorage.removeItem('token')
      navigate('/not-authorized');
      return null;
    }

  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ['validateToken'],
    queryFn: validateToken,
    refetchOnWindowFocus: false
  });

  return {
    isAuthenticated: !!data && !isError,
    user: data || null,
    isLoading,
  };
}
