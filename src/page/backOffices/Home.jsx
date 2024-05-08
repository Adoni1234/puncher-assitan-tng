import { LayoutContainer } from "../../components/layaout.container";

export function Home(){
   return(
    <div>
        <LayoutContainer />
        <div className="justify-items-center mt-[10rem]">
            <h1 className="text-center text-7xl">Bienvenidos</h1> 
            <h2 className="text-center text-4xl">A registro de asistencia Tng</h2> 
         </div>
    </div>
   )
}