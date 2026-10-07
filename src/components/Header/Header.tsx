import './header.scss';
import Logo from '../../assets/images/logo.svg';
import { NavLink, useLocation } from 'react-router-dom';
import { useContext, useRef, useState } from 'react';
import Icon from '../Icomoon/Icomoon';
import { AuthContext } from '../../providers/auth/AuthContext';
import Language from '../Language/Language';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const authContext = useContext(AuthContext)


  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.classList.remove('body-overlay');
    }
  };

  const openMenu = (value: boolean) => {
    setIsOpen(value);
    if (value) {
      document.body.classList.add('body-overlay');
    } else {
      document.body.classList.remove('body-overlay');
    }
    document.addEventListener('mousedown', handleClickOutside);
  };

  const excludePaths = ['not-found', 'dashboard'];
  const location = useLocation();

  return (
    <>
      <header className='navBar'>
        <div className='header-container'>
          <NavLink
            title='Aller vers la page d’accueil'
            aria-label='Aller vers la page d’accueil'
            to='/'
          >
            <picture className='logo'>
              <img src={Logo} alt='Logo PlotTracking by Bondy' />
            </picture>
          </NavLink>

          <nav className='menu'>
            <ul className='menu-list'>
              <li>
                <NavLink
                  title='Aller vers la page d’accueil'
                  aria-label='Aller vers la page d’accueil'
                  className={`menu-link ${!excludePaths.some(path => location.pathname.includes(path)) ? 'active' : ''}`}
                  to='/'
                >
                  Mes projets
                </NavLink>
              </li>

              <li>
                <NavLink
                  title='Aller vers la page tableau de bord'
                  aria-label='Aller vers la page tableau de bord'
                  className="menu-link"
                  to='/dashboard'
                >
                  Tableau de bord
                </NavLink>
              </li>
            </ul>
          </nav>

          <div className='user'>
            <div className='profile'>
              <span className='profile-name'>Bonjour {authContext?.user?.lastName}</span>

              {
                authContext?.user?.logo ?
                  <picture className='profile-icon'>
                    <img src={`${authContext?.user?.logo}`} alt='profile avatar' />
                  </picture> :
                  <div className='no-image'>
                    <Icon
                      icon='image_off'
                      size={24}
                      color='var((--color-text)'
                      className='broken-image-icon'
                    />
                  </div>
              }

            </div>
            <Language />
          </div>

          <div className='menu-burger' onClick={() => openMenu(!isOpen)}>
            <Icon
              icon='Icon_menu_burger'
              size={24}
              color='var((--color-text)'
              className='menu-burger-icon'
            />
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        ref={menuRef}
        className={isOpen ? 'menu-mobile open' : 'menu-mobile'}
      >
        <div className='menu-close' onClick={() => openMenu(!isOpen)}>
          <Icon
            icon='close'
            size={16}
            color='var(--color-text)'
            className='menu-close-icon'
          />
        </div>

        <div className='menu-mobile-container'>
          <div className='menu-mobile-top'>
            <ul className='menu-list'>
              <li>
                <NavLink
                  onClick={() => openMenu(false)}
                  title='Aller vers la page d’accueil'
                  aria-label='Aller vers la page d’accueil'
                  className={`menu-link ${!excludePaths.some(path => location.pathname.includes(path)) ? 'active' : ''}`}
                  to='/'
                >
                  Mes projets
                </NavLink>
              </li>

              <li>
                <NavLink
                  onClick={() => openMenu(false)}
                  title='Aller vers la page tableau de bord'
                  aria-label='Aller vers la page tableau de bord'
                  className='menu-link'
                  to='/dashboard'
                >
                  Tableau de bord
                </NavLink>
              </li>
            </ul>
          </div>

          <div className='menu-mobile-bottom'>
            <div className='profile'>
              <span className='profile-name'>Bonjour {authContext?.user?.lastName}</span>

              {
                authContext?.user?.logo ?
                  <picture className='profile-icon'>
                    <img src={`${authContext?.user?.logo}`} alt='profile avatar' />
                  </picture> :
                  <div className='no-image'>
                    <Icon
                      icon='image_off'
                      size={24}
                      color='var((--color-text)'
                      className='broken-image-icon'
                    />
                  </div>
              }

            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
