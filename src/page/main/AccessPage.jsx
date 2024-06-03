import React, { useState } from 'react';
import { AccessAgent } from '../../services/Main';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function AccessPage() {
    const [code, setCode] = useState('');

    const handleChange = (event) => {
        setCode(event.target.value);
    }

    const handleSubmit = async () => {
        try {
            const response = await AccessAgent({ code: code });
            toast('Asistencia registrada correctamente de: ' + response.name, 200);
            console.log(response)
        } catch (error) {
            console.error("Error al enviar la solicitud:", error);
        }
    }

    return (
        <div className="relative flex">
            <ToastContainer />
            <img className='w-[50%] mt-[3rem]' src={require("../../Img/ImagenAss.jpg")} alt="" />
            <div className="mt-[0rem] w-[50%] items-center flex">
                <div className="w-8/12">
                    <h1 className='text-center text-2xl m-10'>Bienvenidos</h1>
                    <label htmlFor="number-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ingreso Codigo De empleado:</label>
                    <input type="text" value={code} onChange={handleChange} aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 " placeholder="90210" required />
                    <p className="text-left rtl:text-right text-gray-500 dark:text-gray-400 text-sm mt-1">Debe ingresar su código asignado para registrar su entrada y salida de la empresa.</p>
                </div>
                <button type="button" onClick={handleSubmit} className="ml-2 mt-[5.5rem] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Ingresar</button>
            </div>
        </div>
    );
}