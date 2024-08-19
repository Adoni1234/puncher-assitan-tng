import { useEffect } from "react";
import { LayoutContainer } from "../../components/layaout.container";
import { useStateUser } from "../../utilitis/utils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ChartComponent from "./ChartComponent ";
import CakeComponent from "./CakeComponent";


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
        <div className="justify-items-center ">
         <div className="mt-5">
            <h1 className="text-center text-7xl">Bienvenidos</h1> 
            <h2 className="text-center text-4xl">A registro de asistencia Tng</h2> 
          </div>

          <div className="flex">
            <section className=" hover:scale-105 ml-[8rem] mr-8 mt-[13rem] w-6/12 bg-gray-50 rounded-2xl" >
               <ChartComponent />
            </section>
            <section className=" hover:scale-105  mr-[7rem] mt-[13rem] w-6/12 bg-gray-50 rounded-2xl" >
               <CakeComponent />
            </section>
          </div>

         </div>
    </div>
   )
}