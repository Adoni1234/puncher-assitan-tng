import { useEffect, useState } from "react";
import { DataRestorePass } from "../../models/BackOffice.model";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LayoutContainer } from "../../components/layaout.container";
import { restorePassword } from "../../services/Autheticantions";
import { useParams } from "react-router-dom";

function RestorePage(){
    const [formData, setFormData] = useState([DataRestorePass])
    const [password_confirmation, set_password_confirmation] = useState("")
    const { id } = useParams();

    const setConfirmationPassword = (event) =>{

        set_password_confirmation(event.target.value)
    }

    useEffect(() => {
        setFormData((prevData) => ({
          ...prevData,
          id: id,  
        }));
      }, [id]);

    const handleChange = (event) =>{
        const {name, value} = event.target;

        setFormData((prevData) => ({
            ...prevData,
            [name] : value,
            error : {
                ...prevData.error,
                [name] :""
            }
        }))
     }

     const validatorForm = () =>{
        const error = {}

        if(!formData.current_password){
            error.current_password = "Contraseña actual requeridad";
        }
        
        if(!formData.password){
            error.password = "Contraseña requeridad";
        }

        setFormData((prevData) => ({
            ...prevData,
            error,
        }))

        return Object.keys(error).length === 0;
     }

     const handleSubmit = async (event) =>{
        event.preventDefault();
        if(validatorForm()){
           if(formData.password === password_confirmation){
           const response = await restorePassword(formData)
           
           try {
             if(response.message){
                toast.success(response.message)
             }else{
                toast.error("No se pudo cambiar la contraseña")
             }
            
           } catch (error) {
            console.log(error);
            toast.error("There was an error during changing password", 200);
            toast.error("or check if password match", 200);
           }
         }else{
            toast.error("La contraseña no coinciden.")
         }
        }
        else{
            toast.error("Data Invalida")
        }
     } 

   return (
    <div>
    <LayoutContainer />
    <ToastContainer />
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-semibold mb-6">Cambiar Clave</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Confirmar contraseña actual</label>
          <input
            type="password"
            id="current_password"
            name="current_password"
            className="w-full mt-2 p-2 border border-gray-300 rounded-md"
            value={formData.current_password}
            onChange={handleChange}
          />
          {formData.error && formData.error.current_password && (
            <p className="text-sm text-red-500">{formData.error.current_password}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Nueva contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full mt-2 p-2 border border-gray-300 rounded-md"
            value={formData.password}
            onChange={handleChange}
          />
          {formData.error && formData.error.password && (
            <p className="text-sm text-red-500">{formData.error.password}</p>
          )}
        </div>
        <div className="mb-6">
          <label className="block text-gray-700">Confirmar nueva contraseña</label>
          <input
            type="password"
            className="w-full mt-2 p-2 border border-gray-300 rounded-md"
            value={password_confirmation}
            onChange={setConfirmationPassword}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Cambiar contraseña
        </button>
      </form>
    </div>
  </div>
  </div>
   );
}

export default RestorePage;