import StorytellingCard from '../StorytellingCard/StorytellingCard';
import './Storytelling.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Icon from '../Icomoon/Icomoon';
import { ProjectPartner } from "../../models/ProjectPartner.model.ts";
import { useId } from "react";

type StorytellingProps = {
  storytelling: ProjectPartner['storyTelling'];
  path: string
}

function Storytelling({ storytelling, path }: StorytellingProps) {
  const id = useId();


  if (!storytelling) {
    return null;
  }

  return (
    <section className='storytelling'>
      <h2 className="title-h2">Storytelling</h2>
      <Swiper
        navigation={{
          nextEl: '.storytelling .custom-next', // Bouton suivant personnalisé
          prevEl: '.storytelling .custom-prev'  // Bouton précédent personnalisé
        }}
        modules={[Pagination, Navigation]}
        className="swiperStorytelling"
        spaceBetween={(window.innerWidth <= 460) ? 0 : 20}
        slidesPerView={'auto'}
        breakpoints={{
          992: {
            slidesPerView: 1,
          },
        }}
        pagination={{
          el: '.storytelling .swiper-pagination-custom',
          type: 'fraction',
          renderFraction: (currentClass, totalClass) => {
            return `<span class="${currentClass}"></span> sur <span class="${totalClass}"></span>`;
          }
        }}

      >
        {
          storytelling?.map((story) => (
            <SwiperSlide key={`${id} ${story.id}`}>
              <StorytellingCard path={path} title={story.title} description={story.description} id={story.id} />
            </SwiperSlide>
          ))
        }
      </Swiper>

      <div className="swiperInfo">
        <button className="custom-prev"><Icon icon='arrow_right' size={13.5} color='#666666' /></button>
        <div className="swiper-pagination-custom"></div>
        <button className="custom-next"><Icon icon='arrow_right' size={13.5} color='#666666' /></button>
      </div>


    </section>
  )
}

export default Storytelling;