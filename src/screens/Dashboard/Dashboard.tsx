import "./Dashboard.scss";
import BannerDashboard from '../../components/BannerDashboard/BannerDashboard';
import CarbonSequestration from '../../components/CarbonSequestration/CarbonSequestration';
import PlantedTreeTypes from '../../components/PlantedTreeTypes/PlantedTreeTypes';
import ProjectStateOverview from '../../components/ProjectStateOverview/ProjectStateOverview';
import ReportsCertificateDownload from '../../components/ReportsCertificateDownload/ReportsCertificateDownload';
import Footer from '../../components/Footer/Footer.tsx';
import useDashboard from "./useDashboard.ts";
import Loader from "../../components/Loader/Loader.tsx";
import { DashboardType } from "../../models/Dashboard.ts";
import Icon from "../../components/Icomoon/Icomoon.tsx";
import { useContext, useEffect, useRef, useState } from "react";
import usePost from "./usePost.ts";
import { AuthContext } from "../../providers/auth/AuthContext.tsx";


export default function Dashboard() {
  const authContext = useContext(AuthContext)


  const popupRef = useRef<HTMLDivElement | null>(null);
  const { dashboardData, isDashboardDataLoading } = useDashboard(authContext?.user?.uuid as string);
  const [openPopupRaport, setOpenPopupRaport] = useState(false);
  const [openPopupCertificate, setOpenPopupCertificate] = useState(false);
  const [code, setCode] = useState<string>('');

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest(".button_container")
      ) {
        setOpenPopupRaport(false);
        setOpenPopupCertificate(false);
        setCode('');
      }
    }

    if (openPopupRaport || openPopupCertificate) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.body.classList.add("body-overlay");
    } else {
      document.body.classList.remove("body-overlay");
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.body.classList.remove("body-overlay");
    };
  }, [openPopupRaport, openPopupCertificate]);


  const { postData, error } = usePost(import.meta.env.VITE_BACKEND_API_URL + '/api/v1/download');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await postData(
      {
        "uuid": authContext?.user?.uuid as string,
        "code": Number(code),
        "type": openPopupRaport ? "report-history" : "certificate"
      }
    );

    if (response.data?.url) {
      setCode('');
      window.location.href = response.data.url;
      setOpenPopupRaport(false);
      setOpenPopupCertificate(false);
    } else {
      console.error("URL de téléchargement non trouvée");
    }

  }

  if (isDashboardDataLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  const { projectStatus, treeSpecies, totalTreeCount, TCO2Sequestered, keyNumber, isCertificate, isRapport } =
    dashboardData?.data as DashboardType;



  return (
    <>
      <div className="dashboard">
        <BannerDashboard totalTreeCount={totalTreeCount || 0} keyMetrics={keyNumber} />
        <div className="dashboard_container">
          <PlantedTreeTypes
            treeSpecies={treeSpecies}
            totalTreeCount={totalTreeCount || 0}
          />
          <ProjectStateOverview projectStatus={projectStatus} />
          <CarbonSequestration tonCo2={TCO2Sequestered} />
          <ReportsCertificateDownload setOpenPopupCertificate={setOpenPopupCertificate} setOpenPopupRaport={setOpenPopupRaport} isRapport={isRapport} isCertificate={isCertificate} />
        </div>
        <Footer />
      </div>

      {(openPopupRaport || openPopupCertificate) && (
        <div ref={popupRef} className="popup_download open">
          <h2 className="title-h2">Entrez votre code</h2>
          <p>Un code à 4 chiffres est requis pour télécharger ce fichier</p>



          <form className="form" onSubmit={handleSubmit}>
            <label htmlFor="code">
              <input
                type="number"
                id="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
              {error && <span className="error">{error}</span>}
            </label>


            <button type="submit" className="btn btn-primary">
              Télécharger le fichier
            </button>
          </form>

          <button
            type="button"
            className="close-popup"
            onClick={() => {
              setOpenPopupRaport(false);
              setOpenPopupCertificate(false);
            }}
          >
            <Icon icon="close" size={14} color="var(--text-color)" />
          </button>
        </div>
      )}
    </>
  );
}
