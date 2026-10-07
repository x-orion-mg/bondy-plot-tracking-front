import { useContext, useEffect, useState } from 'react';
import Map from '../../components/Map/Map';
import './home.scss';
import { MapboxContext } from '../../providers/mapbox/MapboxProvider';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import { Outlet } from 'react-router-dom';
import Icon from '../../components/Icomoon/Icomoon';
import Footer from '../../components/Footer/Footer.tsx';

function Home() {
  const context = useContext(MapboxContext);
  const [view, setView] = useState(false);

  if (!context) {
    throw new Error('Home must be used within a MapboxProvider');
  }

  const { mapContainerRef } = context;

  const [openSidebar, setOpenSidebar] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setView(openSidebar);
    }, 200);

    return () => clearTimeout(timer);
  }, [openSidebar]);

  return (
    <>
      <Breadcrumb />
      <div className='home-container'>
        <div className={openSidebar ? 'sidebar open' : 'sidebar'}>
          <Outlet />
        </div>
        <div className='mapContainer'>
          <Map ref={mapContainerRef} />
          <Footer />
        </div>
        <button className={`toggleSidebar ${openSidebar ? 'carte' : ''}`} onClick={() => setOpenSidebar(!openSidebar)}
          aria-label='Ouvrir le menu latéral'>
          {openSidebar ? <span className='inside'>{view ? 'Voir la carte' : ''}</span> : <Icon icon='toggle' size={22} color='#ffffff' />}
        </button>
      </div>
    </>
  );
}

export default Home;
