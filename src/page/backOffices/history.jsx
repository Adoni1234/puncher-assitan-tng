import { useEffect, useState } from 'react';
import { LayoutContainer } from "../../components/layaout.container";
import { GetAgente, GetHistory } from "../../services/BackOffice";

export function History() {
    const [agente, setAgente] = useState([])
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState({
        employee : 'employee',
        since : "2024-05-01",
        until : "2024-05-01",
    })
    
    const handleChanges = (event) => {
       const {name, value} = event.target
       setFilter((prevData) => ({
         ...prevData,
         [name] : value
       }))
    }
     
    const reset_variable = () => {
        setFilter({
         employee : "",
         since : "",
         until : "",
        })
    }

    const handleChangeAndQuery = (event) => {
        handleChanges(event);
        query();
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fromDate = new Date(filter.since);
                const toDate = new Date(filter.until);
                
                if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
                    throw new Error("Las fechas son inválidas");
                }   
                const historyData = await GetHistory(filter.employee, fromDate, toDate);
                const AgenteData = await GetAgente();
                setData(historyData);
                setAgente(AgenteData)
            } catch (error) {
                console.error("Error al obtener el historial:", error);
            }
        };
    
        fetchData();
    }, [filter]);
    

     const query = async () => {
        try{
            const fromDate = new Date(filter.since);
            const toDate = new Date(filter.until);
            
            if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
                throw new Error("Las fechas son inválidas");
            }
            
            const historyData = await GetHistory(filter.employee, fromDate, toDate);
            setData(historyData);

        }
        catch (error){
            console.error("Error al obtener el historial:", error);
        }
     }

    return (
        <div>
            <LayoutContainer />
            <div className="flex bg-gray-50 h-[5rem]  rounded-xl m-4">
               <div className="w-2/12 m-1 ml-4">
               <label for="countries" class="block  text-sm font-medium text-gray-900 dark:text-white">Filter</label>
                  <select id="countries" name='employee' value={filter.employee} onChange={handleChangeAndQuery} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="employee" selected>Empleados</option>
                    { agente.map((c) => (
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
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-5">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Nombre Del Empleado
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Fecha De Entrada
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Fecha De Salida
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((a, index) => (
                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {a.agentName}
                                </th>
                                <td className="px-6 py-4">
                                    {a.fecha_entrada}
                                </td>
                                <td className="px-6 py-4">
                                    {a.fecha_salida}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
