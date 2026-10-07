import { createBrowserRouter } from 'react-router-dom';
import Home from '../screens/Home/Home';
import Layout from '../Layout';
import MapboxProvider from '../providers/mapbox/MapboxProvider';
import Dashboard from '../screens/Dashboard/Dashboard';
import HomeNav from '../Navigations/Home/HomeNav';
import Parcelles from '../Navigations/Parcelles/Parcelles';
import SubProjectDetails from '../Navigations/SubProjectDetails/SubProjectDetails';
import NotFound from '../screens/NotFound/NotFound.tsx';
import { NotAuthorized } from '../screens/NotAuthorized/NotAuthorized';
import { AuthProvider } from '../providers/auth/AuthProvider.tsx';
import { ScrollToTop } from '../components/ScrollToTop/ScrollToTop';
import DetailsParcelles from '../Navigations/DetailsParcelles/DetailsParcelles';
import StorytellingProjets from '../Navigations/StorytellingProjets/StorytellingProjets';
import StorytellingParcelles from '../Navigations/StorytellingParcelles/StorytellingParcelles';
import DescriptionNav from '../Navigations/Description/DescriptionNav';
import ProjectPartner from '../Navigations/ProjectPartner/ProjectPartner';
import TreeDetailsPartner from '../Navigations/TreeDetailsPartner/TreeDetailsPartner.tsx';
import TreeDetailsClient from '../Navigations/TreeDetailsClient/TreeDetailsClient.tsx';
import ErrorPage from '../Navigations/ErrorPage/ErrorPage.tsx';
import NotFoundFinalUser from '../screens/NotFoundFinalUser/NotFoundFinalUser.tsx';

export const routes = createBrowserRouter([
  {
    path: '/',
    element:
      <AuthProvider>
        <Layout />
      </AuthProvider>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: (
          <MapboxProvider>
            <Home />
            <ScrollToTop />
          </MapboxProvider>
        ),
        children: [
          {
            path: '/',
            element: <HomeNav />,
          },
          {
            path: '/parents/:parentsId',
            element: <DescriptionNav />,
          },
          {
            path: '/parents/:parentsId/partners/:partnersId',
            element: <ProjectPartner />,
          },
          {
            path: '/parents/:parentsId/partners/:partnersId/sub-project/:subProjectId',
            element: <SubProjectDetails />,
          },
          {
            path: '/parents/:parentsId/partners/:partnersId/child/:childId',
            element: <Parcelles />,
          },
          {
            path: '/parents/:parentsId/partners/:partnersId/child/:childId/parcelle/:parcelleId',
            element: <DetailsParcelles />,
          },
          {
            path: '/parents/:parentsId/partners/:partnersId/storytellingprojet/:storytellingprojetId',
            element: <StorytellingProjets />,
          },
          {
            path: '/parents/:parentsId/partners/:partnersId/child/:childId/parcelle/:parcelleId/storytellingparcelles/:storytellingparcellesId',
            element: <StorytellingParcelles />,
          },
          {
            path: '/parents/:parentsId/partners/:partnersId/child/:childId/parcelle/:parcelleId/tree/:treeId',
            element: <TreeDetailsPartner />,
          }
        ],
      },
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
    ],
  },
  {
    path: '/:idUsers/:treeId',
    element:
      <MapboxProvider>
        <TreeDetailsClient />
      </MapboxProvider>
    ,
    errorElement: <NotFoundFinalUser />
  },
  {
    path: 'not-authorized',
    element: <NotAuthorized />,
  },
  {
    path: '*',
    element: <NotFound />,
  }
],
  {
    future: {
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);
