import { LayoutContainer } from "../../components/layaout.container";
import { useCallback, useEffect, useState } from 'react';
import { CreateEmployee, GetAgente, GetCompanies, UpdateEmployee, UpdateEmployeeStatus } from "../../services/BackOffice";
import Modal from "../../components/Modal.component";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useStateUser } from "../../utilitis/utils";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRotate, faRotateRight, faMagnifyingGlass, faUserTie } from "@fortawesome/free-solid-svg-icons";
import { initialFormData } from "../../models/BackOffice.model";

export function Employee() {
    const [agente, setAgente] = useState([])
    const [dataCompanie, setDataCompanie] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [providen, setProviden] = useState(''); 
    const [id , setId] = useState(0)
    const Profile =  useStateUser()
    const [filter, SetFilter] = useState('')
    const [filter_companie, setFilterCompanie] = useState('')

    const [formData, setFormData] = useState(initialFormData)
     
    const set_filter = (event) => {
        SetFilter(event.target.value)
    }
         
    const set_filter_companie = (event) => {
        setFilterCompanie(event.target.value)
    }

    const Data_filter = useCallback(async () => {
        try { 
            const AgenteData = await GetAgente();
            const companie_data = await GetCompanies();
            setDataCompanie(companie_data);
                const filtering = (filter) ? 
                    AgenteData.filter(a => a.name.includes(filter)) 
                     :(filter_companie) ?  AgenteData.filter(a => a.name_companie.includes(filter_companie) ) 
                       :(filter_companie && filter) ?  AgenteData.filter(a => a.name.includes(filter) && a.name_companie.includes(filter_companie)) 
                          : AgenteData;

                setAgente(filtering)
        } catch (error) {
            if (error.message.includes("Failed to fetch")) {
                toast.error("Http Timeout", 200);
             }
            console.error("Error al obtener los Empleados:", error);
        }
    }, [filter, filter_companie]);

    const reset_value = () =>{
       formData.name = ""
       setFormData(initialFormData)
       setIsModalOpen(false)
    }

    useEffect(() => {
        if (!Profile) {
            window.location.href = '/';
            toast.success('Favor de Iniciar Session', 100);
        }
        Data_filter();
    }, [Profile, Data_filter]);

    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormData((data) => ({
            ...data,
            [name] : value,
            error : {
                ...data.error,
                [name] : "",
            }
        }))
    }

    const validatorForm = () =>{
        const error = {}

        if(!formData.name){
            error.name = "name requiered"
        }
        if(!formData.lastName){
            error.lastName = "LastName requiered"
        }
        if(!formData.correo){
            error.correo = "Correo requiered"
        }
        if(!formData.cedula){
            error.cedula = "Cedula requiered"
        }
        if(!formData.designation){
            error.designation = "Designatio requiered"
        }
        if(!formData.id_companie){
            error.id_companie = "Companie requiered"
        }

        setFormData((prevData) => ({
            ...prevData,
            error,
        }))

        return Object.keys(error).length === 0
    }

    const edit = (data) => {
        setFormData({
          ...FormData,
          name: data.name,
          lastName: data.lastname,
          id_companie : data.id_companie,
          correo : data.correo,
          cedula : data.cedula,
          designation : data.designation
        });
        setId(data.id)
      }

    const Origins = (origin, data) =>{
        if(origin === 'creating'){
            setProviden('creating') 
            setIsModalOpen(true)
          }else if(origin === 'editing'){
            edit(data)
            setProviden('editing') 
            setIsModalOpen(true)
          }
    }

    const editStatus = async (status, id) => {
        const response = await UpdateEmployeeStatus(status,id);
        try {
            if (response.id) {
               Data_filter()
               toast.success('Agente Actualizado', 200);
            } else {
               toast.error("Agente invalido", 100);
            }
        } catch (error) {
            console.log(error);
            toast.error("There was an error during updateing",100);
        }
    }
      

    const handleSubmit = async (event) =>{
        event.preventDefault();
        if(validatorForm()){
            if(providen === "creating"){
                const response = await CreateEmployee(formData);
                try{
                    if(response.data){
                        toast.success(response.message, 200)
                        Data_filter();
                        reset_value()
                      }else{
                        toast.success(response.message, 200)
                      }
                }
                catch(error){
                    console.log(error);
                    toast.error("There was an error during creating", 200);
                }
            }else{
                const response = await UpdateEmployee(formData,id);
                try{
                    if(response.id){
                        toast(response.message, 200)
                       Data_filter();
                        reset_value()
                      }else{
                        toast(response.message, 200)
                      }
                }
                catch(error){
                    console.log(error);
                    toast.error("There was an error during creating", 200);
                }
            }

        }
        else{
            toast.error('invalid Data')
        }

    }

    return (
        <div>
        <LayoutContainer />
         <div className="min-h-screen   bg-gray-200 py-5">
            <ToastContainer />

            <div className="items-center w-12/12 px-8 m-8 bg-gray-300 rounded-lg mb-8  ">

              <div className="flex items-center space-x-2 p-3">
                <div className=" w-2/12 md:w-auto ml-[12rem] lg:ml-0">
                  <select id="countries" name='filter_companie' value={filter_companie}  onChange={set_filter_companie} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="" selected>(seleccionar)</option>
                    { dataCompanie.map((c) => (
                    <option value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>
              
                <form className="flex items-center max-w-2xl w-6/12 mx-auto ">   
                  <label for="simple-search" className="sr-only">Search</label>
                  <div className="relative w-full">

                    <input type="text" id="filter" value={filter} onChange={set_filter} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." required />
                    <div className="absolute inset-y-0 start-[30rem] flex items-center ps-3 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                      </svg>
                    </div>
                  </div>
                </form>
              
              <button
                onClick={() => Origins('creating', 0)}
                className="inline-block mt-1  mb-2 rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-sm uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
              >
                Crear Agente
              </button>
            </div>
          </div>

        <div className='overflow-x-auto w-full px-7 '>
            <table className='mx-auto max-w-8xl w-full whitespace-nowrap rounded-lg bg-white divide-y divide-gray-300 overflow-hidden'>
                <thead className="bg-gray-900">
                    <tr className="text-white text-left">
                        <th className="font-semibold text-sm uppercase px-6 py-4"> Name </th>
                        <th className="font-semibold text-sm uppercase px-6 py-4 text-center"> Empresa </th>
                        <th className="font-semibold text-sm uppercase px-6 py-4"> Designation </th>
                        <th className="font-semibold text-sm uppercase px-6 py-4 text-center"> status </th>
                        <th className="font-semibold text-sm uppercase px-6 py-4 text-center"> cedula </th>
                        <th className="font-semibold text-sm uppercase px-6 py-4 text-center"> Codigo De Acceso </th>
                        <th className="font-semibold text-sm uppercase px-6 py-4"> </th>
                        <th className="font-semibold text-sm uppercase px-6 py-4"> </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {agente.map((c) => (
                      <tr>
                          <td className="px-6 py-4">
                              <div className="flex items-center space-x-3">
                                  <div className="inline-flex w-10 h-10"><FontAwesomeIcon icon={faUserTie} className='w-8 h-8 object-cover rounded-full' /> </div>
                                  <div>
                                      <p> {c.name} {c.lastname} </p>
                                      <p className="text-gray-500 text-sm font-semibold tracking-wide">{c.correo}</p>
                                  </div>
                              </div>
                          </td>
                          <td className="px-6 py-4 text-center">
                              <p className="text-gray-500 text-sm font-semibold tracking-wide"> {c.name_companie} </p>
                          </td>
                          <td className="px-6 py-4">
                              <p className="text-gray-500 text-sm font-semibold tracking-wide"> {c.designation} </p>
                          </td>
                          <td className="px-6 py-4 text-center"> <span className="text-white text-sm w-1/3 pb-1 bg-green-600 font-semibold px-2 rounded-full"> {c.status} </span> </td>
                          <td className="px-6 py-4 text-center"> {c.cedula} </td>
                          <td className="px-6 py-4 text-center"> {c.codigo} </td>
                          <td onClick={() => Origins('editing', c)} className="px-6 py-4 text-center">Edit</td>
                          <td className="px-6 py-4 text-center"> 
                            {c.status === 'Activo'? (
                             <buttom onClick={() => editStatus('Inactivo', c.id)}><FontAwesomeIcon icon={faRotateRight} /></buttom>  
                            ) : <button onClick={() => editStatus('Activo', c.id)}><FontAwesomeIcon icon={faRotate} /></button>} 
                                            
                         </td>
                      </tr>
                   ))}
                </tbody>
            </table>
        </div>
    </div>
    <Modal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      onSubmit={handleSubmit}
      formData={formData}
      type={providen}
      handleChange={handleChange}
      origins={"employee"}
      dataSelect={dataCompanie}
    />
  </div>
    );
}