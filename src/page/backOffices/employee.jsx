import { LayoutContainer } from "../../components/layaout.container";
import { useEffect, useState } from 'react';
import { CreateEmployee, GetAgente, UpdateEmployee, UpdateEmployeeStatus } from "../../services/BackOffice";
import Modal from "../../components/Modal.component";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useStateUser } from "../../util/utils";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRotate, faRotateRight } from "@fortawesome/free-solid-svg-icons";

export function Employee() {
    const [agente, setAgente] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [providen, setProviden] = useState(''); 
    const [id , setId] = useState(0)
    const Profile =  useStateUser()
    const initialFormData = {
        name: "",
        lastName: "",
        correo: "",
        cedula: "",
        error: {}
    };

    const [formData, setFormData] = useState(initialFormData)

    const fetchData = async () => {
        try { 
            const AgenteData = await GetAgente();
            setAgente(AgenteData)
        } catch (error) {
            console.error("Error al obtener los Empleados:", error);
        }
    };

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
        fetchData();
    }, [Profile]);

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
                fetchData();
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
                        fetchData();
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
                        fetchData();
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
        <button
           onClick={() => Origins('creating', 0)}
           class="inline-block w-1/12 mt-1 ml-3 mb-2 rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-sm uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
           data-twe-ripple-init
           data-twe-ripple-color="light"
           >
           Crear Agente
        </button>
        <div class='overflow-x-auto w-full'>
            <table class='mx-auto max-w-4xl w-full whitespace-nowrap rounded-lg bg-white divide-y divide-gray-300 overflow-hidden'>
                <thead class="bg-gray-900">
                    <tr class="text-white text-left">
                        <th class="font-semibold text-sm uppercase px-6 py-4"> Name </th>
                        <th class="font-semibold text-sm uppercase px-6 py-4"> Designation </th>
                        <th class="font-semibold text-sm uppercase px-6 py-4 text-center"> status </th>
                        <th class="font-semibold text-sm uppercase px-6 py-4 text-center"> cedula </th>
                        <th class="font-semibold text-sm uppercase px-6 py-4"> </th>
                        <th class="font-semibold text-sm uppercase px-6 py-4"> </th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                    {agente.map((c) => (
                      <tr>
                          <td class="px-6 py-4">
                              <div class="flex items-center space-x-3">
                                  <div class="inline-flex w-10 h-10"> <img class='w-10 h-10 object-cover rounded-full' alt='User avatar' src='https://i.imgur.com/siKnZP2.jpg' /> </div>
                                  <div>
                                      <p> {c.name} {c.lastName} </p>
                                      <p class="text-gray-500 text-sm font-semibold tracking-wide">{c.correo}</p>
                                  </div>
                              </div>
                          </td>
                          <td class="px-6 py-4">
                              <p class=""> Software Developer </p>
                              <p class="text-gray-500 text-sm font-semibold tracking-wide"> Development </p>
                          </td>
                          <td class="px-6 py-4 text-center"> <span class="text-white text-sm w-1/3 pb-1 bg-green-600 font-semibold px-2 rounded-full"> {c.status} </span> </td>
                          <td class="px-6 py-4 text-center"> {c.cedula} </td>
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
    />
  </div>
    );
}