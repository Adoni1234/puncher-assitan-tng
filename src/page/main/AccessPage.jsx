import React, { useEffect, useState } from 'react';
import { AccessAgent } from '../../services/Main';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function AccessPage() {
    const [code, setCode] = useState('');
    const [debouncedValue, setDebouncedValue] = useState(code);

    useEffect(() => {
      let modifiedCode = code;

        const pattern = /^(.*)([A-Z])(\d+)$/;
        const match = modifiedCode.match(pattern);
        
        if (match) {
          modifiedCode = `${match[1]}${match[2]}${match[3]}`;
        }
        
        const handler = setTimeout(() => {
          setDebouncedValue(modifiedCode);
        }, 500); 
    
        return () => {
          clearTimeout(handler);
        };
      }, [code]);
    
      useEffect(() => {
        if (debouncedValue) {
          handleSubmit(debouncedValue);
        }
      }, [debouncedValue]);
      
  
    const handleSubmit = async (value) => {
      try {
        const response = await AccessAgent({ code: value });

        if(response.message && !response.name){
          if(response.status === 500 && response.message.includes("400")){
            toast.error("El codigo del empleado esta Inactivo.")
          }else{
            toast.error(response.message)
          }
          setCode("")
        }
        
        if(response.name){
          toast('Asistencia registrada correctamente de: ' + response.name, 200);
          setCode("")
        }

      } catch (error) {
        console.error("Error al enviar la solicitud:", error);
      }
    };

    return (
        <div className="relative sm:flex-row lg:flex">
            <ToastContainer />
            <img className='w-[100%] lg:w-[50%] mt-[3rem]' src={require("../../Img/ImagenAss.jpg")} alt="" />
            <div className="mt-[0rem] w-[90%] md:w-[80%] items-center flex-row md:flex ">
                <div className="ml-[15.5%]  md:ml-[30%] lg:ml-0 md:10/12 lg:w-8/12">
                    <h1 className='text-center text-2xl m-10'>Bienvenidos</h1>
                    <label htmlFor="number-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ingreso Codigo De empleado:</label>
                    <input type="text" value={code} onChange={(e) => setCode(e.target.value)} aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 " placeholder="90210" required />
                    <p className="text-left rtl:text-right text-gray-500 dark:text-gray-400 text-sm mt-1">Debe ingresar su código asignado para registrar su entrada y salida de la empresa.</p>
                </div>
            </div>
        </div>
    );
}
