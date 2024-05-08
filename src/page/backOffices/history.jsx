import { useEffect, useState } from 'react';
import { LayoutContainer } from "../../components/layaout.container";
import { GetHistory } from "../../services/BackOffice";

export function History() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Esperamos a que se resuelva la promesa
                const historyData = await GetHistory();
                // Ahora podemos acceder a los datos
                setData(historyData);
            } catch (error) {
                console.error("Error al obtener el historial:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <LayoutContainer />
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
                                    {a.idAngente}
                                </th>
                                <td className="px-6 py-4">
                                    {a.admissionDate}
                                </td>
                                <td className="px-6 py-4">
                                    {a.exitDate}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
