import Icon from '../Icomoon/Icomoon';
import './GalerieCard.scss';

type GalerieCardProps = {
  mediaType: string;
  mediaUrl: string;
  altText?: string;
};

const GalerieCard: React.FC<GalerieCardProps> = ({ mediaType, mediaUrl, altText }) => {


  // const markerElement = document.createElement('div');
  // const root = createRoot(markerElement);
  // root.render();

  return (
    <div className="galerieCard">

      {/* Type image */}
      {mediaType === 'image' && (
        <picture className="galerieCard__image">
          <img src={mediaUrl} alt={altText || 'Galerie image'} className="galerieCard__media" />
        </picture>
      )}

      {/* Type video */}
      {mediaType === 'video' && (
        <div className="galerieCard__video">
          <video src={mediaUrl} className="galerieCard__media" poster={mediaUrl} />
          <button className="galerieCard_playButton"><Icon icon="play" size={30} color="#D9D9D9" /></button>
        </div>
      )}

      {/* Type image 360 */}
      {mediaType === 'image_360' && (
        <div className="galerieCard__video">
          <img src={mediaUrl} alt={altText || 'Galerie image'} className="galerieCard__media" />
          <button className="galerieCard_playButton">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 6C14 5.73478 13.8946 5.48043 13.7071 5.29289C13.5196 5.10536 13.2652 5 13 5H11C10.7348 5 10.4804 5.10536 10.2929 5.29289C10.1054 5.48043 10 5.73478 10 6V12C10 12.2652 10.1054 12.5196 10.2929 12.7071C10.4804 12.8946 10.7348 13 11 13H13C13.2652 13 13.5196 12.8946 13.7071 12.7071C13.8946 12.5196 14 12.2652 14 12V10C14 9.73478 13.8946 9.48043 13.7071 9.29289C13.5196 9.10536 13.2652 9 13 9H10M3 5H5.5C5.89782 5 6.27936 5.15804 6.56066 5.43934C6.84196 5.72064 7 6.10218 7 6.5V7.5C7 7.89782 6.84196 8.27936 6.56066 8.56066C6.27936 8.84196 5.89782 9 5.5 9M5.5 9H4M5.5 9C5.89782 9 6.27936 9.15804 6.56066 9.43934C6.84196 9.72064 7 10.1022 7 10.5V11.5C7 11.8978 6.84196 12.2794 6.56066 12.5607C6.27936 12.842 5.89782 13 5.5 13H3M3 16C3 17.657 7.03 19 12 19C16.97 19 21 17.657 21 16M17 7V11C17 11.5304 17.2107 12.0391 17.5858 12.4142C17.9609 12.7893 18.4696 13 19 13C19.5304 13 20.0391 12.7893 20.4142 12.4142C20.7893 12.0391 21 11.5304 21 11V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5C18.4696 5 17.9609 5.21071 17.5858 5.58579C17.2107 5.96086 17 6.46957 17 7Z" stroke="white" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round" />
            </svg>
          </button>
        </div>


      )}
    </div>
  );
};

export default GalerieCard;