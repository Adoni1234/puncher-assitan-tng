import { useCallback, useEffect, useState } from "react";
import { CreateCompanie, GetCompanies, UpdateCompanie } from "../../services/BackOffice";
import { LayoutContainer } from "../../components/layaout.container";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Modal from "../../components/Modal.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useStateUser } from "../../utilitis/utils";
import { DataCompanies } from "../../models/BackOffice.model";

export function CompaniePage(){
    const [dataC, setDataC] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [providen, setProviden] = useState(''); 
    const [filter, SetFilter] = useState('')
    const [id , setId] = useState(0)
    const Profile =  useStateUser()

    const [formData, setFormData] = useState(DataCompanies)

    useEffect(() => {
      if (!Profile) {
        window.location.href = '/';
        toast.success('Favor de Iniciar Session', 100);
      }
        fetchData();
    }, [Profile])

    const filtered = (event) =>{
       SetFilter(event.target.value)
       fetchData();
    }

    const handleChange = (event) =>{
        const {name, value} = event.target

        setFormData((data) => ({
            ...data,
            [name] : value,
            error : {
                ...data.error,
                [name] : ""
            }
        }))
    }

    const fetchData = useCallback(async () =>  {
        try{
           const data = await GetCompanies()
           if(filter != null | undefined | ""){
             const filtered =  data.filter(d => d.name.includes(filter))
             setDataC(filtered)
           }else{
            setDataC(data)
           }
        }
        catch(error){
            if (error.message.includes("Failed to fetch")) {
                toast.error("Http Timeout", 200);
             }
            console.error("Error al obtener las compañia:", error);
        }
    }, [filter])

    const validatorForm = () => {
        const error = {}

        if(!formData.name){
            error.name = "Nombre requerido"
        }
        if(!formData.code_identification){
            error.code_identification = "Codigo de identificacion requerido"
        }

        setFormData((data) => ({
            ...data,
            error
        }))

        return Object.keys(error).length === 0;
    }
    const edit = (data) => {
        setFormData({
          ...FormData,
          name: data.name,
          code_identification: data.code_identification,

        });
        setId(data.id)
      }


    const handleSubmit = async (event) =>{
         event.preventDefault();
         if(validatorForm()){
             if(providen === "creating"){
                 const response = await CreateCompanie(formData);
                 try{
                     if(response.data){
                         toast.success(response.message, 200)
                         fetchData();
                         setIsModalOpen(false)
                       }else{
                         toast.success(response.message, 200)
                       }
                 }
                 catch(error){
                     console.log(error);
                     toast.error("There was an error during creating", 200);
                 }
             }else{
                 const response = await UpdateCompanie(formData, id);
                 try{
                     if(response.id){
                         toast(response.message, 200)
                         fetchData();
                         setIsModalOpen(false)
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


    return (
        <div>
          <LayoutContainer />
          <ToastContainer />
          <div className="flex justify-center items-center"> 
            <div className="m-5 bg-gray-100 h-[4rem] w-8/12 rounded-xl">
              <div className="ml-[10rem] flex h-[80%] w-8/12 mt-2 ">
                <button
                  onClick={() => Origins('creating', 0)}
                  className="mr-2 h-[80%] text-xs inline-block rounded bg-sky-500 px-6 pb-2 pt-1   uppercase leading-normal text-white shadow-warning-3 transition duration-150 ease-in-out hover:bg-warning-accent-300 hover:shadow-warning-2 focus:bg-warning-accent-300 focus:shadow-warning-2 focus:outline-none focus:ring-0 active:bg-warning-600 active:shadow-warning-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong">
                  Crear Compañia
                </button>
      
                <div  className="w-full  px-4">
                  <div className="relative">
                    <input 
                     type="text" 
                     id="filter" 
                     value={filter} 
                     onChange={filtered}
                     className="w-full border h-10 shadow p-4 rounded-full dark:text-gray-800 dark:border-gray-700 dark:bg-gray-200" placeholder="search" />
                    <div>
                      <svg className="text-teal-400 h-5 w-5 absolute top-3 right-3 fill-current dark:text-teal-300"
                        version="1.1"
                        x="0px" y="0px" viewBox="0 0 56.966 56.966"
                        xmlSpace="preserve">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      
          <div className="ml-[25%] mt-12 relative overflow-x-auto shadow-md sm:rounded-lg m-5 w-6/12">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-white uppercase bg-gray-900 dark:bg-gray-900 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Nombre
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Nomenclatura de codigo
                  </th>
                  <th scope="col" className="px-6 py-3 text-center"></th>
                </tr>
              </thead>
              <tbody>
                {dataC.map((a, index) => (
                  <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {a.name}
                    </th>
                    <td className="px-6 py-4 text-center">
                      {a.code_identification}
                    </td>
                    <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => Origins('editing', a)}
                      className="mr-2 h-[80%] text-xs inline-block rounded bg-sky-500 px-6 pb-2 pt-1   uppercase leading-normal text-white shadow-warning-3 transition duration-150 ease-in-out hover:bg-warning-accent-300 hover:shadow-warning-2 focus:bg-warning-accent-300 focus:shadow-warning-2 focus:outline-none focus:ring-0 active:bg-warning-600 active:shadow-warning-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong">
                      editar
                    </button>
      
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
           <Modal
             isOpen={isModalOpen}
             onClose={() => setIsModalOpen(false)}
             onSubmit={handleSubmit}
             formData={formData}
             type={providen}
             handleChange={handleChange}
             origins={"companie"}
           />
        </div>
      );
      
}