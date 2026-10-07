import { Swiper, SwiperSlide } from 'swiper/react';
import SousProjectCard from '../SousProjectCard/SousProjectCard';
import './SousProject.scss';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Icon from '../Icomoon/Icomoon';
import { ProjectDetails } from '../../models/ProjectDetails.model.ts';
import { useId } from 'react';
import { Link, useLocation } from "react-router-dom";
import { getCleanPath } from '../../utils/getCleanPath.ts';

type SousProjectProps = {
  subProjects: ProjectDetails['subProjects'];
  region: string;
  country: string;
  city: string;
  startDateFormatted: ProjectDetails['startDateFormatted'];
  isLink?: boolean;
}

function SousProject({ subProjects, startDateFormatted, country, region, city, isLink }: SousProjectProps) {
  const id = useId();
  const location = useLocation();

  return (
    <div className='sousProject'>
      <h2 className="title-h2">Projets locaux</h2>

      <Swiper
        navigation={{
          nextEl: '.sousProject .custom-next',
          prevEl: '.sousProject .custom-prev'
        }}
        modules={[Pagination, Navigation]}
        className="swiperProject"
        spaceBetween={20}
        slidesPerView={'auto'}
        pagination={{
          el: '.sousProject .swiper-pagination-custom',
          type: 'fraction',
          renderFraction: (currentClass, totalClass) => {
            return `<span class="${currentClass}"></span> sur <span class="${totalClass}"></span>`;
          }
        }}
      >
        {
          subProjects.map((subProject, index) =>
          (
            <SwiperSlide key={`${id}-${index}`}>
              {
                isLink ? (<Link to={`${getCleanPath(location.pathname)}/sub-project/${subProject.id}`} >

                  <SousProjectCard
                    image={subProject.banner}
                    title={subProject.name}
                    region={region}
                    country={country}
                    city={city}
                    startDateFormatted={startDateFormatted}
                  />
                </Link>) : (<SousProjectCard
                  image={subProject.banner}
                  title={subProject.name}
                  region={region}
                  country={country}
                  city={city}
                  startDateFormatted={startDateFormatted}
                />)
              }

            </SwiperSlide>
          )
          )
        }
      </Swiper>

      <div className="swiperInfo">
        <button className="custom-prev"><Icon icon='arrow_right' size={13.5} color='#666666' /></button>
        <div className="swiper-pagination-custom"></div>
        <button className="custom-next"><Icon icon='arrow_right' size={13.5} color='#666666' /></button>
      </div>

    </div>
  )
}

export default SousProject;