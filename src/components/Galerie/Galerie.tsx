import './Galerie.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import Fancybox from '../Fancybox/Fancybox';
import 'swiper/css';
import 'swiper/css/navigation';
import Icon from '../Icomoon/Icomoon';
import GalerieCard from '../GalerieCard/GalerieCard';
import { GalleryType } from '../../models/ProjectDetails.model';
import { useId } from 'react';
import PanoramaViewer from '../PanoramaViewer/PanoramaViewer';

type SousProjectProps = {
  galleries: GalleryType[];
}

function Gallery({ galleries }: SousProjectProps) {
  const id = useId();

  return (
    <section className='galerie'>
      <h2 className="title-h2">Galerie</h2>
      <Fancybox options={{
        dragToClose: false,
        Carousel: {
          Panzoom: {
            touch: false,
          },
        },
      }}>
        <Swiper
          navigation={{
            nextEl: '.galerie .custom-next',
            prevEl: '.galerie .custom-prev'
          }}
          modules={[Pagination, Navigation]}
          className="swiperProject"
          spaceBetween={20}
          slidesPerView={'auto'}
          pagination={{
            el: '.galerie .swiper-pagination-custom',
            type: 'fraction',
            renderFraction: (currentClass, totalClass) => {
              return `<span class="${currentClass}"></span> sur <span class="${totalClass}"></span>`;
            }
          }}
        >
          {galleries.map((gallery, index) => (

            <SwiperSlide key={`${id}-${index}`}>

              {/* type image, video */}
              {(gallery.type.toLowerCase() === "image" || gallery.type.toLowerCase() === "video") &&
                <a data-fancybox href={gallery.url}>
                  <GalerieCard mediaType={gallery.type.toLowerCase()} mediaUrl={gallery.thumbnailUrl} altText={gallery.caption} />
                </a>
              }


              {/* type image 360 */}
              {gallery.type.toLowerCase() === "image_360" && (
                <>
                  <a
                    data-fancybox
                    data-src={`#panorama-${index}`}
                    // data-type="html"
                    href="#"
                  >
                    <GalerieCard mediaType={gallery.type.toLowerCase()} mediaUrl={gallery.url} altText={gallery.caption} />
                  </a>

                  {/* Contenu caché pour Fancybox */}
                  <div className='d-none panorama' id={`panorama-${index}`}>
                    <PanoramaViewer imageUrl={gallery.url} />
                  </div>
                </>
              )}

            </SwiperSlide>

          ))}
        </Swiper>
      </Fancybox>

      <div className="swiperInfo">
        <button className="custom-prev"><Icon icon='arrow_right' size={13.5} color='#666666' /></button>
        <div className="swiper-pagination-custom"></div>
        <button className="custom-next"><Icon icon='arrow_right' size={13.5} color='#666666' /></button>
      </div>
    </section>
  )
}

export default Gallery;