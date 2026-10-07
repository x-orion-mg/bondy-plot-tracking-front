import { useEffect, useRef, useState } from 'react';
import Icon from '../Icomoon/Icomoon';
import './breadcrumb.scss';
import { NavLink, useLocation } from 'react-router-dom';

function convertToLabel(labelValue: string) {
  switch (labelValue) {
    case 'parents':
      return 'Contexte';

    case 'partners':
      return 'Histoire du partenariat';

    case 'sub-project':
      return 'Projets locaux';

    case 'child':
      return 'Vos parcelles';

    case 'storytellingprojet':
      return 'Les moments forts';

    case 'tree':
      return 'Fiche arbre';

    case 'parcelle':
      return null;

    default:
      return labelValue;
  }
}

function convertToBreadcrumbs(pathname: string) {
  const route = pathname.split('/').filter((val, index) => val !== '' && index % 2 !== 0);
  const data = pathname.split('/').filter((val, index) => val !== '' && index % 2 === 0);

  const breadcrumbs = [];
  let accumulatedPath = '';

  for (let i = 0; i < route.length; i++) {
    accumulatedPath += `/${route[i]}/${data[i]}`;

    if (route[i] != "parcelle") {
      breadcrumbs.push({
        label: route[i],
        link: accumulatedPath
      });
    }
  }
  return breadcrumbs;
}

function Breadcrumb() {
  const breadcrumbRef = useRef<HTMLUListElement | null>(null);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const breadcrumbWidth = breadcrumbRef.current?.offsetWidth;
  const location = useLocation();

  const [breadcrumbs, setBreadcrumbs] = useState(convertToBreadcrumbs(location.pathname));

  useEffect(() => {
    window.addEventListener('resize', () => {
      setViewportWidth(window.innerWidth);
    });

    if (breadcrumbWidth && breadcrumbWidth > viewportWidth) {
      // TODO: Implement a way to handle breadcrumb overflow
    }
  }, [viewportWidth, breadcrumbWidth]);

  useEffect(() => {
    setBreadcrumbs(() => convertToBreadcrumbs(location.pathname));
  }, [location.pathname]);


  return (
    <div className='breadcrumb'>
      <div className='header-container'>
        <ul className='breadcrumb-list' ref={breadcrumbRef}>
          <li className='breadcrumb-item'>
            <NavLink
              to={'/'}
              className={({ isActive, isPending }) =>
                isPending ? 'pending' : isActive ? 'breadcrumb-link active' : 'breadcrumb-link'
              }
            >
              Accueil
            </NavLink>
          </li>
          {
            breadcrumbs.map((breadcrumb, index) => {

              return convertToLabel(breadcrumb.label) != null && (
                <li key={breadcrumb.link} className='breadcrumb-item'>

                  {breadcrumbs.length >= 1 && index === 0 ? (
                    <Icon icon='arrow_right' size={10} color='#A0A0A9' />
                  ) : (
                    ''
                  )}


                  <NavLink
                    to={`${breadcrumb.link}`}
                    className={({ isActive, isPending }) =>
                      isPending ? 'pending' : isActive ? 'breadcrumb-link active' : 'breadcrumb-link'
                    }
                    end
                  >
                    {convertToLabel(breadcrumb.label)}
                  </NavLink>


                  {(index < breadcrumbs.length - 1) ? (
                    <Icon icon='arrow_right' size={10} color='#A0A0A9' />
                  ) : (
                    ''
                  )}


                </li>
              )
            }
            )
          }
        </ul>
      </div>
    </div>
  );
}

export default Breadcrumb;
