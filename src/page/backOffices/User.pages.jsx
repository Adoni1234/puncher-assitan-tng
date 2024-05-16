import { useEffect, useState } from "react";
import { LayoutContainer } from "../../components/layaout.container";
import { CreateUser, GetUser } from "../../services/BackOffice";
import Modal from "../../components/Modal.component";

export function UserPages() {
    const [editing, setEditing] = useState(false);
    const [creating, setCreating] = useState(false);
  
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [providen, setProviden] = useState(''); 

    const [user, setUser] = useState([]);
    const [FormData, SetFormData] = useState({
        username: '',
        email: '',
        cedula: '',
        error: {}  
    });

    useEffect(() => {
        const FetchData = async () => {
            try {
                const userData = await GetUser();
                setUser(userData);
            } catch (error) {
                console.error("Error al obtener los Empleados:", error);
            }
        };
        FetchData();
    }, []);  // Añadido un array vacío para evitar llamadas infinitas a FetchData
  
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
          setCreating(true)
          setIsModalOpen(true)
          setProviden('creating') 
        }else if(origin === 'editing'){
          edit(data)
          setEditing(true)
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if (validatorForm()) {
            const response = await CreateUser(FormData);
            try {
                if (response.password) {
                    alert(response.message);
                    alert(response.password)
                } else {
                    alert("Usuario invalido");
                }
            } catch (error) {
                console.log(error);
                alert("There was an error during register");
            }
        } else {
            console.log('Formulario Invalido');
        }
    };

    return (
        <div>
            <LayoutContainer />
            <div className="min-h-screen bg-gray-200 py-5">
            <button
                onClick={() => setIsModalOpen(true)}
                class="inline-block w-1/12 mt-1 ml-3 mb-2 rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-sm uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                data-twe-ripple-init
                data-twe-ripple-color="light"
              >
                Crear Usuario
              </button>
                <div className="overflow-x-auto w-full">
                    <table className="mx-auto max-w-4xl w-full whitespace-nowrap rounded-lg bg-white divide-y divide-gray-300 overflow-hidden">
                        <thead className="bg-gray-900">
                            <tr className="text-white text-left">
                                <th className="font-semibold text-sm uppercase px-6 py-4"> Name </th>
                                <th className="font-semibold text-sm uppercase px-6 py-4 text-center"> Status </th>
                                <th className="font-semibold text-sm uppercase px-6 py-4 text-center"> Cedula </th>
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
                                        <span className="text-white text-sm w-1/3 pb-1 bg-green-600 font-semibold px-2 rounded-full"> Active </span> 
                                    </td>
                                    <td className="px-6 py-4 text-center"> {c.cedula}</td>
                                    <td className="px-6 py-4 text-center"> 
                                        <buttom onClick={() => [Origins('editing', c)]} className="text-purple-800 hover:underline">Edit</buttom> 
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
            />
        </div>
    );
}
