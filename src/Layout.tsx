import {Outlet} from 'react-router-dom';
import Header from './components/Header/Header';
import {useAuth} from './hooks/useAuth.tsx';
import Loader from './components/Loader/Loader.tsx';

function Layout() {
  const {isAuthenticated} = useAuth();

  if (!isAuthenticated) {
    return <div className="loader-container"><Loader/></div>
  }

  return (
    <>
      <Header/>
      <main>
        <Outlet/>
      </main>
    </>
  );
}

export default Layout;
