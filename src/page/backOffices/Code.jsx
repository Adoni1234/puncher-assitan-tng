import { useEffect, useState } from "react";
import { LayoutContainer } from "../../components/layaout.container";
import { GetCodeAccess } from "../../services/BackOffice";

export function CodePage(){
    const [data, setData] = useState([]);

    useEffect(()=>{
            const fechData = async () =>{
                const GetCode = await GetCodeAccess()
                setData(GetCode)
            }
            fechData();
    })
    return(
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
                           Cedula
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Codigo de Acesso
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((a, index) => (
                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {a.name}
                            </th>
                            <td className="px-6 py-4">
                                {a.cedula}
                            </td>
                            <td className="px-6 py-4">
                                {a.code}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
    )
}