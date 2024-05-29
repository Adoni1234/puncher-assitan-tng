import { useCallback, useEffect, useState } from "react";
import { LayoutContainer } from "../../components/layaout.container";
import { CreateUser, GetUser, UpdateUser, UpdateUserStatus } from "../../services/BackOffice";
import Modal from "../../components/Modal.component";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useStateUser } from "../../utilitis/utils";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faRotate, faRotateRight } from "@fortawesome/free-solid-svg-icons";

export function UserPages() {
    const [userId, setUserId] = useState(''); 
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [providen, setProviden] = useState(''); 
    const Profile =  useStateUser()
    const [filter, SetFilter] = useState('')
    const initialFormData = {
        username: '',
        email: '',
        cedula: '',
        error: {}  
    };

    const [user, setUser] = useState([]);
    const [FormData, SetFormData] = useState(initialFormData);
    const set_filter = (event) => {
        SetFilter(event.target.value)
    }


    const reset_values = () =>{
        SetFormData(initialFormData)
        setIsModalOpen(false)
    }

    const Data_filter = useCallback(async () => {
        try { 
            const userData = await GetUser();
            if (filter) {
                const filtering = userData.filter(a => a.username.includes(filter)); 
                setUser(filtering);
            } else {
                setUser(userData);
            }
        } catch (error) {
            console.error("Error al obtener los Usuarios:", error);
        }
    }, [filter]);


    useEffect(() => {
        if (!Profile) {
            window.location.href = '/';
            toast.error('Favor de Iniciar Session', 100);
        }
        Data_filter();
    },[Profile, Data_filter]); 
  
    const handleChange = (event) => {
        const { name, value } = event.target;
        SetFormData((prevData) => ({
            ...prevData,
            [name]: value,
            error: {
                ...prevData.error,
                [name]: ""
            }
        }));
    };

    const validatorForm = () => {
        const error = {};

        if (!FormData.username) {
            error.username = "Usuario requerido";
        }

        if (!FormData.email) {
            error.email = "Email requerido";
        }

        if (!FormData.cedula) {
            error.cedula = "Cedula requerida";
        }

        SetFormData((prevData) => ({
            ...prevData,
            error,
        }));

        return Object.keys(error).length === 0;
    };

    const Origins = (origin, data) => {
        if(origin === 'creating'){
          setProviden('creating') 
          setIsModalOpen(true)
        }else if(origin === 'editing'){
          setProviden('editing') 
          edit(data)
          setIsModalOpen(true)
        }
      }

      const edit = (data) => {
        SetFormData({
          ...FormData,
          username: data.username,
          email: data.email,
          cedula : data.cedula,
        });
      }

      const editStatus = async (status, id) => {
        const response = await UpdateUserStatus(status, id);
        try {
            if (response.id) {
               toast.success('Usuario Actualizado', 200);
               Data_filter()
            } else {
               toast.error("Usuario invalido", 100);
            }
        } catch (error) {
            console.log(error);
            toast.error("There was an error during updateing",100);
        }
      }

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if (validatorForm()) {
           if(providen === "creating"){
             const response = await CreateUser(FormData);
             try {
                 if (response.password) {
                    toast.success(response.message, 100);
                    toast.success('Contraseña: ' + response.password, 200);
                    reset_values();
                    Data_filter();
                 } else {
                    toast.error("Usuario invalido", 100);
                 }
             } catch (error) {
                 console.log(error);
                 toast.error("There was an error during register",100);
             }
           }
           else{
            const response = await UpdateUser(FormData,userId);
            try {
                if (response.id) {
                    toast(response.message,100);
                    reset_values();
                    Data_filter();
                } else {
                    toast.error("Usuario invalido", 100);
                }
            } catch (error) {
                console.log(error);
                toast.error("There was an error during update", 100);
            }
           }
        } else {
           toast('Formulario Invalido',100);
        }
    };

    return (
        <div>
            <LayoutContainer />
            <ToastContainer />
            <div className="min-h-screen bg-gray-200 py-5">
            <button
                onClick={() => Origins('creating', 0)}
                class="inline-block w-1/12 mt-1 ml-3 mb-2 rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-sm uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                data-twe-ripple-init
                data-twe-ripple-color="light"
              >
                Crear Usuario
              </button>
              <form class="flex items-center max-w-xl mx-auto mb-3 -mt-10">   
                <label for="simple-search" class="sr-only">Search</label>
                 <div class="relative w-full">
                   <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                     <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                       <FontAwesomeIcon icon={faMagnifyingGlass} />
                     </svg>
                   </div>
                 <input type="text" id="filter" value={filter} onChange={set_filter} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search branch name..." required />
                </div>
               </form>
                <div className="overflow-x-auto w-full">
                    <table className="mx-auto max-w-4xl w-full whitespace-nowrap rounded-lg bg-white divide-y divide-gray-300 overflow-hidden">
                        <thead className="bg-gray-900">
                            <tr className="text-white text-left">
                                <th className="font-semibold text-sm uppercase px-6 py-4"> Name </th>
                                <th className="font-semibold text-sm uppercase px-6 py-4 text-center"> Status </th>
                                <th className="font-semibold text-sm uppercase px-6 py-4 text-center"> Cedula </th>
                                <th className="font-semibold text-sm uppercase px-6 py-4"> </th>
                                <th className="font-semibold text-sm uppercase px-6 py-4"> </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {user.map((c) => (
                                <tr key={c.id}>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="inline-flex w-10 h-10"> 
                                                <img className='w-10 h-10 object-cover rounded-full' alt='User avatar' src={require('../../Img/user.png')} /> 
                                            </div>
                                            <div>
                                                <p> {c.username} </p>
                                                <p className="text-gray-500 text-sm font-semibold tracking-wide">{c.email}</p>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4 text-center"> 
                                        <span className="text-white text-sm w-1/3 pb-1 bg-green-600 font-semibold px-2 rounded-full"> {c.status} </span> 
                                    </td>
                                    <td className="px-6 py-4 text-center"> {c.cedula}</td>
                                    <td className="px-6 py-4 text-center"> 
                                        <buttom onClick={() => [Origins('editing', c), setUserId(c.id)]} className="text-purple-800 hover:underline">Edit</buttom> 
                                    </td>
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
                formData={FormData}
                type={providen}
                handleChange={handleChange}
                origins={"user"}
            />
        </div>
    );
}
