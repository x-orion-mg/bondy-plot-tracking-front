import { useQuery } from "@tanstack/react-query";
import { RestResponse } from "../../models/Global.model.ts";
import { authApiAxios } from "../../utils/api.ts";
import { DashboardType } from "../../models/Dashboard.ts";


export default function useDashboard(key: string) {
    // const { parentsId, partnersId, childId } = useParams<{ parentsId: string, partnersId: string, childId: string }>();

    // const navigate = useNavigate();

    // useEffect(() => {
    //     if (isNaN(Number(parentsId)) || isNaN(Number(partnersId)) || isNaN(Number(childId))) {
    //         navigate('/not-found');
    //     }

    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [parentsId, partnersId, childId]);

    const { data: dashboardData, isLoading: isDashboardDataLoading } = useQuery<RestResponse<DashboardType>>({
        queryKey: ['dashboard'],
        queryFn: async () => {

            return await authApiAxios<RestResponse<DashboardType>>(
                {
                    method: 'GET',
                    url: `/api/v1/dashboard/${key}/user`,
                },
                localStorage.getItem('token')!
            )
        }
    })

    return {
        dashboardData,
        isDashboardDataLoading
    }
}