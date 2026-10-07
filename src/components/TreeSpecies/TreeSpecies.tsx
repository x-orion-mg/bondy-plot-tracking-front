import TreeSpeciesCard from "../TreeSpeciesCard/TreeSpeciesCard";
import "./TreeSpecies.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Icon from "../Icomoon/Icomoon";
import { TreeSpeciesList } from "../../models/TreeSpecies.model";
import { useEffect } from "react";

type TreeSpeciesProps = {
  TreeSpeciesItems: TreeSpeciesList;
  selectedStory?: number | undefined;
  setSelectedStory: React.Dispatch<React.SetStateAction<number | undefined>>;
};

function TreeSpecies({
  TreeSpeciesItems,
  setSelectedStory,
  selectedStory,
}: TreeSpeciesProps) {
    
  useEffect(() => {
    if (TreeSpeciesItems[0].id) {
      setSelectedStory(TreeSpeciesItems[0].id);
    }
  }, [TreeSpeciesItems]);

  return (
    <section className="treeSpecies">
      <h2 className="title-h2">Espèces d’arbres</h2>
      <Swiper
        navigation={{
          nextEl: ".treeSpecies .custom-next", // Bouton suivant personnalisé
          prevEl: ".treeSpecies .custom-prev", // Bouton précédent personnalisé
        }}
        modules={[Pagination, Navigation]}
        className="swipertreeSpecies"
        spaceBetween={20}
        slidesPerView={2}
        pagination={{
          el: ".treeSpecies .swiper-pagination-custom",
          type: "fraction",
          renderFraction: (currentClass, totalClass) => {
            return `<span class="${currentClass}"></span> sur <span class="${totalClass}"></span>`;
          },
        }}
      >
        {TreeSpeciesItems.map((item) => {
          return (
            <SwiperSlide
              onClick={() => setSelectedStory(item.id)}
              key={item.id}
            >
              <TreeSpeciesCard
                TreeSpeciesProps={item}
                selectedStory={selectedStory}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>

      <div className="swiperInfo">
        <button className="custom-prev">
          <Icon icon="arrow_right" size={13.5} color="#666666" />
        </button>
        <div className="swiper-pagination-custom"></div>
        <button className="custom-next">
          <Icon icon="arrow_right" size={13.5} color="#666666" />
        </button>
      </div>
    </section>
  );
}

export default TreeSpecies;
