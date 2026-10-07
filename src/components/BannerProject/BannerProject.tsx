import './BannerProject.scss';
import Icon from '../Icomoon/Icomoon';
import {LocalisationType, ProjectStatus, ProjectType} from "../../models/Project.model.ts";

type BannerProjectProps = {
  bannerImage: string;
  localisation: LocalisationType;
  projectType?: ProjectType;
  startDateFormatted: string;
  projectStatus?: ProjectStatus;
  city: string;
}

function BannerProject({
                         bannerImage,
                         localisation,
                         projectType,
                         startDateFormatted,
                         projectStatus,
                         city
                       }: BannerProjectProps) {

  const {country, region} = localisation;
  const {label} = projectType || {label: ''};

  return (
    <section className="bannerProject">
      <picture className="bannerProject-picture">
        <img src={bannerImage} alt={label}/>
      </picture>

      <div className="bannerProject-description">
        <div className="bannerProject-localisation">
          <figure className="icone">
            <Icon icon='earth' size={20} color='#666666'/>
          </figure>
          <div className="bannerProject-text">
            <span>{country}</span>
            <span>Région {region}</span>
            <span>{city}</span>
          </div>
        </div>
        {
          startDateFormatted && (<div className="bannerProject-startData">
            <figure className="icone">
              <Icon icon='calendar' size={20} color='#666666'/>
            </figure>
            <div className="bannerProject-text">
              Début {startDateFormatted}
            </div>
          </div>)
        }

        {/*<div className="bannerProject-tree">*/}
        {/*  <figure className="icone">*/}
        {/*    <Icon icon='tree_10' size={20} color='#666666'/>*/}
        {/*  </figure>*/}
        {/*  <div className="bannerProject-text">*/}
        {/*    <span>300.000</span>*/}
        {/*    <span>arbres</span>*/}
        {/*  </div>*/}
        {/*</div>*/}

        {
          projectStatus && projectStatus.label &&
          (<div className="bannerProject-status">
            <figure className="icone">
              <Icon icon='graph' size={20} color='#666666'/>
            </figure>
            <div className="bannerProject-text">
              <span>{projectStatus.label}</span>
            </div>
          </div>)
        }

      </div>
    </section>
  )
}

export default BannerProject;