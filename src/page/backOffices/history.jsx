import { useEffect, useState } from 'react';
import { LayoutContainer } from "../../components/layaout.container";
import { GetAgente, GetCompanies, GetHistory } from "../../services/BackOffice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DateFormatUs, TotalHoursByDay, before_date, formatDateString, parseDate, useStateUser } from '../../utilitis/utils';
import MyDocument from '../../components/document';
import { pdf } from '@react-pdf/renderer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faClock, faFilePdf } from '@fortawesome/free-solid-svg-icons';

export function History() {
    const [agente, setAgente] = useState([])
    const [companies, setCompanies] = useState([])
    const [data, setData] = useState([]);
    const Profile = useStateUser();
    const [total_hours , set_total_hours] = useState('');

    const downloadPdf = async () => {
        const blob = await pdf(<MyDocument data={data} totalHours={total_hours} />).toBlob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'document.pdf';
        a.click();
        URL.revokeObjectURL(url);
      };

    const [filter, setFilter] = useState({
        employee : 'employee',
        companies : 'companie',
        since :  before_date(),
        until : DateFormatUs(),
    })
    
    const handleChanges = (event) => {
       const {name, value} = event.target
       setFilter((prevData) => ({
         ...prevData,
         [name] : value
       }))
    }
     
    const handleChangeAndQuery = (event) => {
        handleChanges(event);
        query();
    }

    const TotalHours = (data) => {
        const totalHours = data.reduce((total, entry) => {
            if (!entry.fecha_entrada || !entry.fecha_salida) return total;
    
            const formattedStartDateString = formatDateString(entry.fecha_entrada);
            const formattedEndDateString = formatDateString(entry.fecha_salida);
    
            const startDate = parseDate(formattedStartDateString);
            const endDate = parseDate(formattedEndDateString);
    
            if (!startDate || !endDate) {
                console.error("Fecha inválida en la entrada:", entry);
                return total;
            }
    
            const differenceInMilliseconds = endDate - startDate;
            const hours = differenceInMilliseconds / (1000 * 60 * 60);
            return total + hours;
        },0);

        set_total_hours(Math.floor(totalHours));
    };
    
    useEffect(() => {
        if (!Profile) {
            window.location.href = '/';
            toast.error('Favor de Iniciar Session', 100);
        }
    
        const fetchData = async () => {
            try {
                const fromDate = new Date(filter.since);
                const toDate = new Date(filter.until);
    
                if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
                    toast.error("Las fechas son inválidas");
                    return;
                }
    
                const historyData = await GetHistory(filter.employee, filter.companies, fromDate, toDate);
                const AgenteData = await GetAgente();
                const CompanieData = await GetCompanies();
                setData(historyData);
                TotalHours(historyData);
                setAgente(AgenteData);
                setCompanies(CompanieData);

            } catch (error) {
                if (error.message.includes("Failed to fetch")) {
                    toast.error("Http Timeout", 200);
                }
                console.error("Error al obtener el historial:", error);
            }
        };
    
        fetchData();
    }, [filter, Profile]);

    

     const query = async () => {
        try{
            const fromDate = new Date(filter.since);
            const toDate = new Date(filter.until);
            
            if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
                throw new Error("Las fechas son inválidas");
            }
            const historyData = await GetHistory(filter.employee, filter.companies, fromDate, toDate);
            setData(historyData)
            TotalHours(historyData)
           

        }
        catch (error){
            if (error.message.includes("Failed to fetch")) {
                toast.error("Http Timeout", 200);
             }
            console.error("Error al obtener el historial:", error);

        }
     }

    return (
        <div>
            <LayoutContainer />
            <ToastContainer />
            <div className="flex bg-gray-50 h-[5rem]  rounded-xl m-4 overflow-x-auto">
               <div className="w-2/12 m-1 ml-4">
               <label for="countries" class="block  text-sm font-medium text-gray-900 dark:text-white">Filter</label>
                  <select id="countries" name='employee' value={filter.employee} onChange={handleChangeAndQuery} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="employee" selected>(seleccionar)</option>
                    { agente.map((c) => (
                        <option value={c.name}>{c.name}</option>
                    ))}
                  </select>
               </div>
               <div className="w-2/12 m-1 ml-4">
               <label for="countries" class="block  text-sm font-medium text-gray-900 dark:text-white">Compañias</label>
                  <select id="countries" name='companies' value={filter.companies} onChange={handleChangeAndQuery} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="companie" selected>(seleccionar)</option>
                    { companies.map((c) => (
                        <option value={c.name}>{c.name}</option>
                    ))}
                  </select>
               </div>
               <div className="w-2/12 m-1 ml-4">
                  <label for="countries" class="block  text-sm font-medium text-gray-900 dark:text-white">Desde</label>
                  <input type='date' name='since' value={filter.since} onChange={handleChangeAndQuery} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
               </div>
               <div className="w-2/12 m-1 ml-4">
                  <label for="countries"  class="block text-sm font-medium text-gray-900 dark:text-white">Hasta</label>
                  <input type='date' value={filter.until} onChange={handleChangeAndQuery} name='until' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
               </div>
               <button onClick={downloadPdf} className='bg-blue-700 text-white rounded-lg mt-5 ml-3 h-12 w-60'>Exportar PDF <FontAwesomeIcon  icon={faFilePdf} /></button>
            </div>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-5">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3 font-bold text-lg">
                                Nombre Del Empleado
                            </th>
                            <th scope="col" className="px-6 py-3 font-bold text-lg">
                                Fecha De Entrada
                            </th>
                            <th scope="col" className="px-6 py-3 font-bold text-lg">
                                Fecha De Salida
                            </th>
                            <th scope="col" className="px-6 py-3 font-bold text-lg">
                                Estado
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((a, index) => (
                            <tr
                                key={index}
                                className={`${
                                  TotalHoursByDay([{fecha_entrada: a.fecha_entrada, fecha_salida: a.fecha_salida}]) < 8 ? 'bg-red-300' : 'bg-white'
                                } border-b dark:bg-gray-800 dark:border-gray-700  dark:hover:bg-gray-600`}
                                >                               
                                <th scope="row" className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white">
                                    {a.agentName}
                                </th>
                                <td className="px-6 py-4">
                                    {a.fecha_entrada}
                                </td>
                                <td className="px-6 py-4">
                                    {a.fecha_salida}
                                </td>
                                {(TotalHoursByDay([{fecha_entrada: a.fecha_entrada, fecha_salida: a.fecha_salida}] ) < 8)? (

                                <td className="px-6 py-4 font-bold">
                                    Jornada laboral no completada
                                </td>
                                ) : (
                                <td className="px-6 py-4 font-bold">
                                    <div className='ml-[5%] space-x-2 text-lg'>
                                    <FontAwesomeIcon icon={faClock} color='black'  />
                                    <FontAwesomeIcon icon={faCheck} color='black'  />
                                    </div>
                                </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div  className='bg-gray-50 justify-end w-full '>
                     <span className='ml-[85%] font-bold text-lg'>Total de horas : {total_hours} </span>
                </div>
            </div>
        </div>
    );
}
