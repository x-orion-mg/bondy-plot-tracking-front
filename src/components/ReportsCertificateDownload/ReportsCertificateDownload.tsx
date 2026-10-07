import Icon from '../Icomoon/Icomoon';
import './ReportsCertificateDownload.scss';

type ReportsCertificateDownloadProps = {
    setOpenPopupRaport: (open: boolean) => void
    setOpenPopupCertificate: (open: boolean) => void
    isCertificate: boolean
    isRapport: boolean
}

function ReportsCertificateDownload({ setOpenPopupRaport, setOpenPopupCertificate, isRapport, isCertificate }: ReportsCertificateDownloadProps) {
    return (
        <div className='reportsCertificateDownload'>
            <picture className='static_image'>
                <img src="/images/staff_bondy.jpg" alt="illustation" />
            </picture>

            <div className="button_container">
                <button className='btn btn-primary custom_btn' onClick={() => setOpenPopupRaport(true)} disabled={!isRapport}>
                    Télécharger les rapports
                    <Icon icon="download" size={16} color='#BE2321' />
                </button>

                <button className='btn btn-primary custom_btn' onClick={() => setOpenPopupCertificate(true)} disabled={!isCertificate}>
                    Télécharger le certificat
                    <Icon icon="download" size={16} color='#BE2321' />
                </button>
            </div>
        </div>
    )
}

export default ReportsCertificateDownload;