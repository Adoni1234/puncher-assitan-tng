import { useEffect, useState } from 'react';
import { GetSessionStore } from '../utilitis/utils';


export function LayoutContainer() {
  const [username, setUsername] = useState('') ;

  useEffect(() => {
    lookFor();
   }, []);

   const lookFor = () => {
    const profile = GetSessionStore();
      setUsername(profile) 
    }

    return (
      <div>
        <nav className="flex justify-between bg-gray-900 text-white w-screen">
          <div className="px-5 xl:px-12 py-6 flex w-full items-center">
            <a className="text-3xl font-bold font-heading" href="/">
             <img className="h-9" src={require('../Img/logo-backoffice.png')} alt="logo" />
            </a>
            <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
              <li><a href="/homen" className="hover:text-gray-200" >BackOffice</a></li>
              <li><a href="/history" className="hover:text-gray-200" >Historial</a></li>
              <li><a className="hover:text-gray-200" href="/agente">Adm. Empleados </a></li>
              <li><a className="hover:text-gray-200" href="/user">Adm. Usuarios </a></li>
              <li><a className="hover:text-gray-200" href="g">Contact Us</a></li>
            </ul>
            <p className='mr-1'>{username}</p>
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
  