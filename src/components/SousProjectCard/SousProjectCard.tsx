import './SousProjectCard.scss';
import Icon from '../Icomoon/Icomoon';

type SousProjectCardProps = {
  image: string;
  title: string;
  region: string;
  startDateFormatted: string;
  country: string;
  city: string;
}

function SousProjectCard({image, title, region, startDateFormatted, country, city}: SousProjectCardProps) {
  return (
    <div className="sousProjectCard">
      <picture className="sousProjectCard-picture">
        <img src={image} alt={title}/>
      </picture>

      <div className="sousProjectCard-details">
        <h3 className="title-h3">{title}</h3>

        <div className="sousProjectCard-localisation">
          <figure className="icone">
            <Icon icon='earth' size={16.5} color='#666666'/>
          </figure>
          <div className="sousProjectCard-text">
            <span>{country}</span>
            <span>Région {region}</span>
            <span>{city}</span>
          </div>
        </div>

        <div className="sousProjectCard-startData">
          <figure className="icone">
            <Icon icon='calendar' size={16.5} color='#666666'/>
          </figure>
          {
            startDateFormatted && (<div className="sousProjectCard-text">
              <span>Début : </span>
              <span>{startDateFormatted}</span>
            </div>)
          }
        </div>
      </div>
    </div>
  )
}

export default SousProjectCard;