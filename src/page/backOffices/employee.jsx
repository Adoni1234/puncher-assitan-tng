import { LayoutContainer } from "../../components/layaout.container";
import { useEffect, useState } from 'react';
import { CreateEmployee, GetAgente } from "../../services/BackOffice";
import Modal from "../../components/Modal.component";

export function Employee() {
    const [agente, setAgente] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [providen, setProviden] = useState(''); 

    const [formData, setFormData] = useState({
        name : "",
        lastName : "",
        correo : "",
        cedula : "",
        error : {}
    })

    useEffect(() => {
        const fetchData = async () => {
            try { 
                const AgenteData = await GetAgente();
                setAgente(AgenteData)
            } catch (error) {
                console.error("Error al obtener los Empleados:", error);
            }
        };

        fetchData();
    });

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
          email : data.correo,
          cedula : data.cedula
        });
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


    const handleSubmit = async (event) =>{
        event.preventDefault();
        if(validatorForm()){
            const response = await CreateEmployee(formData);
            try{
                if(response.data){
                    alert(response.message)
                  }else{
                    alert(response.message)
                  }
            }
            catch(error){
                console.log(error);
                alert("There was an error during creating");
            }
        }
        else{
            console.log('invalid Data')
        }

    }



    return (
        <div>
        <LayoutContainer />
        <div class="min-h-screen bg-gray-200 py-5">
        <div class='overflow-x-auto w-full'>
            <table class='mx-auto max-w-4xl w-full whitespace-nowrap rounded-lg bg-white divide-y divide-gray-300 overflow-hidden'>
                <thead class="bg-gray-900">
                    <tr class="text-white text-left">
                        <th class="font-semibold text-sm uppercase px-6 py-4"> Name </th>
                        <th class="font-semibold text-sm uppercase px-6 py-4"> Designation </th>
                        <th class="font-semibold text-sm uppercase px-6 py-4 text-center"> status </th>
                        <th class="font-semibold text-sm uppercase px-6 py-4 text-center"> cedula </th>
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
                          <td class="px-6 py-4 text-center"> <span class="text-white text-sm w-1/3 pb-1 bg-green-600 font-semibold px-2 rounded-full"> Active </span> </td>
                          <td class="px-6 py-4 text-center"> {c.cedula} </td>
                          <td onClick={() => Origins('editing', c)} class="px-6 py-4 text-center">Edit</td>
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