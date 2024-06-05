import { LayoutContainer } from "../../components/layaout.container";
import { useCallback, useEffect, useState } from 'react';
import { CreateEmployee, GetAgente, GetCompanies, UpdateEmployee, UpdateEmployeeStatus } from "../../services/BackOffice";
import Modal from "../../components/Modal.component";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useStateUser } from "../../utilitis/utils";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRotate, faRotateRight, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export function Employee() {
    const [agente, setAgente] = useState([])
    const [dataCompanie, setDataCompanie] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [providen, setProviden] = useState(''); 
    const [id , setId] = useState(0)
    const Profile =  useStateUser()
    const [filter, SetFilter] = useState('')

    const initialFormData = {
        name: "",
        lastName: "",
        id_companie : "",
        correo: "",
        cedula: "",
        designatio : "",
        error: {}
    };

    const [formData, setFormData] = useState(initialFormData)
     
    const set_filter = (event) => {
        SetFilter(event.target.value)
    }


    const Data_filter = useCallback(async () => {
        try { 
            const AgenteData = await GetAgente();
            const companie_data = await GetCompanies();
            setDataCompanie(companie_data);
            if (filter) {
                const filtering = AgenteData.filter(a => a.name.includes(filter)); 
                setAgente(filtering);
            } else {
                setAgente(AgenteData);
            }
        } catch (error) {
            if (error.message.includes("Failed to fetch")) {
                toast.error("Http Timeout", 200);
             }
            console.error("Error al obtener los Empleados:", error);
        }
    }, [filter]);

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
        if(!formData.designatio){
            error.designatio = "Designatio requiered"
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
          lastName: data.lastName,
          id_companie : data.id_companie,
          correo : data.correo,
          cedula : data.cedula
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
         <div class="min-h-screen bg-gray-200 py-5">
            <ToastContainer />

            <div class=" justify-center bg-gray-300 rounded-lg m-3">

              <div class="flex items-center space-x-3">
                <div class="w-2/12 ml-[12rem]">
                  <select id="countries" name='employee' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="employee" selected>(seleccionar)</option>
                    { dataCompanie.map((c) => (
                    <option value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>
              
                <form class="flex items-center max-w-xl w-5/12 mx-auto ">   
                  <label for="simple-search" class="sr-only">Search</label>
                  <div class="relative w-full">
                    <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                      </svg>
                    </div>
                    <input type="text" id="filter" value={filter} onChange={set_filter} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search branch name..." required />
                  </div>
                </form>
              
              <button
                onClick={() => Origins('creating', 0)}
                class="inline-block mt-1  mb-2 rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-sm uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
              >
                Crear Agente
              </button>
            </div>
          </div>

        <div class='overflow-x-auto w-full'>
            <table class='mx-auto max-w-4xl w-full whitespace-nowrap rounded-lg bg-white divide-y divide-gray-300 overflow-hidden'>
                <thead class="bg-gray-900">
                    <tr class="text-white text-left">
                        <th class="font-semibold text-sm uppercase px-6 py-4"> Name </th>
                        <th class="font-semibold text-sm uppercase px-6 py-4 text-center"> Empresa </th>
                        <th class="font-semibold text-sm uppercase px-6 py-4"> Designation </th>
                        <th class="font-semibold text-sm uppercase px-6 py-4 text-center"> status </th>
                        <th class="font-semibold text-sm uppercase px-6 py-4 text-center"> cedula </th>
                        <th class="font-semibold text-sm uppercase px-6 py-4 text-center"> Codigo De Acceso </th>
                        <th class="font-semibold text-sm uppercase px-6 py-4"> </th>
                        <th class="font-semibold text-sm uppercase px-6 py-4"> </th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                    {agente.map((c) => (
                      <tr>
                          <td class="px-6 py-4">
                              <div class="flex items-center space-x-3">
                                  <div class="inline-flex w-10 h-10"><img className='w-10 h-10 object-cover rounded-full' alt='User avatar' src={require('../../Img/employee.png')} /> </div>
                                  <div>
                                      <p> {c.name} {c.lastName} </p>
                                      <p class="text-gray-500 text-sm font-semibold tracking-wide">{c.correo}</p>
                                  </div>
                              </div>
                          </td>
                          <td class="px-6 py-4 text-center">
                              <p class="text-gray-500 text-sm font-semibold tracking-wide"> {c.name_companie} </p>
                          </td>
                          <td class="px-6 py-4">
                              <p class="text-gray-500 text-sm font-semibold tracking-wide"> {c.designatio} </p>
                          </td>
                          <td class="px-6 py-4 text-center"> <span class="text-white text-sm w-1/3 pb-1 bg-green-600 font-semibold px-2 rounded-full"> {c.status} </span> </td>
                          <td class="px-6 py-4 text-center"> {c.cedula} </td>
                          <td class="px-6 py-4 text-center"> {c.codigo} </td>
                          <td onClick={() => Origins('editing', c)} class="px-6 py-4 text-center">Edit</td>
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