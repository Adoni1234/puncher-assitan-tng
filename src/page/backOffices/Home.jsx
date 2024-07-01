import { useEffect } from "react";
import { LayoutContainer } from "../../components/layaout.container";
import { useStateUser } from "../../utilitis/utils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Home(){
   const profile = useStateUser();
  
   useEffect(() => {
      if(!profile){
         window.location.href = '/';
         toast.success('Favor de Iniciar Session', 100);
      }
   })
   return(
    <div>
        <LayoutContainer />
        <ToastContainer />
        <div className="justify-items-center mt-[10rem]">
        <i class="fa-solid fa-shield-halved"></i>  <h1 className="text-center text-7xl">Bienvenidos</h1> 
            <h2 className="text-center text-4xl">A registro de asistencia Tng</h2> 
         </div>
    </div>
   )
}