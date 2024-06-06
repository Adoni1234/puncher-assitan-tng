import { useEffect, useState } from 'react';
import { GetSessionStore, closedSections } from '../utilitis/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDoorClosed } from '@fortawesome/free-solid-svg-icons';


export function LayoutContainer() {
  const [username, setUsername] = useState('') ;

  useEffect(() => {
    lookFor();
   }, []);

   const lookFor = () => {
    const profile = GetSessionStore();
      setUsername(profile) 
    }

    const closed = () => {
       closedSections();
       window.location.href = '/'
      }

      const [adminMenuOpen, setAdminMenuOpen] = useState(false);

  const toggleAdminMenu = () => {
    setAdminMenuOpen(!adminMenuOpen);
  };

    return (
      <div>
        <nav className="flex justify-between bg-gray-900 text-white w-screen">
          <div className="px-5 xl:px-12 py-6 flex w-full items-center">
            <a className="text-3xl font-bold font-heading" href="/">
             <img className="h-9" src={require('../Img/logo-backoffice.png')} alt="logo" />
            </a>
            <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
              <li><a href="/homen" className="hover:text-gray-200">BackOffice</a></li>
              <li><a href="/history" className="hover:text-gray-200">Historial</a></li>
              <li className="relative">
              <button onClick={toggleAdminMenu} className="hover:text-gray-200">Administración</button>
              {adminMenuOpen && (
                <ul className="absolute left-0 mt-2 w-48 bg-gray-800 shadow-lg rounded-lg z-20">
                  <li><a href="/agente" className="block px-4 py-2 hover:bg-gray-100">Adm. Empleados</a></li>
                  <li><a href="/user" className="block px-4 py-2 hover:bg-gray-100">Adm. Usuarios</a></li>
                  <li><a href="/companie" className="block px-4 py-2 hover:bg-gray-100">Adm. Compañias</a></li>
                </ul>
              )}
            </li>
            <li><a href="/contact" className="hover:text-gray-200">Contacto</a></li>
            <li><a href="/about" className="hover:text-gray-200">Acerca de</a></li>
           </ul>
            <p className='mr-1'>{username}</p>
            /
            <button className='ml-1' onClick={closed}>Cerrar Session <FontAwesomeIcon icon={faDoorClosed} /> </button>
          </div>
          <a className="navbar-burger self-center mr-12 xl:hidden" href="\g">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </a>
        </nav>
      </div>
    );
  }
  