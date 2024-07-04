import { useEffect, useState } from 'react';
import { GetSessionStore, closedSections } from '../utilitis/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDoorClosed, faLock, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

export function LayoutContainer() {
  const [username, setUsername] = useState('');
  const [id, setId] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [adminMenuOpen, setAdminMenuOpen] = useState(false);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/password/${id}`);
  };

  useEffect(() => {
    lookFor();
  }, []);

  const lookFor = () => {
    const profile = GetSessionStore();
    setUsername(profile[0]);
    setId(profile[1]);
  };

  const closed = () => {
    closedSections();
    window.location.href = '/';
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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
            <li><a href="/home" className="hover:text-gray-200">BackOffice</a></li>
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
            <li><a href="https://transnegrd.com" className="hover:text-gray-200">Contacto</a></li>
          </ul>
          <button onClick={handleClick} title='Cambiar Contraseña' className="relative inline-block mr-4">
            <FontAwesomeIcon icon={faLock} className="text-blue-500" />
            <FontAwesomeIcon icon={faPencilAlt} className="absolute top-0 right-0 text-red-500 text-xs" />
          </button>
          <p className='mr-1'>{username}</p>/
          <button className='ml-1' onClick={closed}>Cerrar Sesión <FontAwesomeIcon icon={faDoorClosed} /></button>
        </div>
        <div className="flex justify-between items-center">
          <a href className="navbar-burger self-center mr-12 xl:hidden" onClick={toggleMenu}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </a>
        </div>
      </nav>
      <ul className={`mt-4 space-y-2 ${isMenuOpen ? 'block' : 'hidden'} xl:flex px-4 mx-auto font-semibold font-heading space-x-12`}>
        <li><a href="/home" className="hover:text-gray-200">BackOffice</a></li>
        <li><a href="/history" className="hover:text-gray-200">Historial</a></li>
        <li className="relative">
          <button onClick={toggleAdminMenu} className="hover:text-gray-200">Administración</button>
          {adminMenuOpen && (
            <ul className='bg-gray-50'>
              <li><a href="/agente" className="block px-4 py-2 hover:bg-gray-100">Adm. Empleados</a></li>
              <li><a href="/user" className="block px-4 py-2 hover:bg-gray-100">Adm. Usuarios</a></li>
              <li><a href="/companie" className="block px-4 py-2 hover:bg-gray-100">Adm. Compañias</a></li>
            </ul>
          )}
        </li>
        <li><a href="https://transnegrd.com" className="hover:text-gray-200">Contacto</a></li>
      </ul>
    </div>
  );
}
