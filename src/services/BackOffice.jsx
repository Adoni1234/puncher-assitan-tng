
import config from '../config';

export async function GetHistory(employee, from, to) {
    try {
        const url = new URL(`${config.apiUrl}/api/Backoffice/History?employee=${employee}&from=${from.toISOString()}&to=${to.toISOString()}`);

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error("Error en la solicitud: " + response.status);
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        throw new Error("Error en la solicitud: " + error.message);
    }
}

export async function GetHistoryByHours() {
    try {
        const url = new URL(`${config.apiUrl}/api/Backoffice/history/hours`);

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error("Error en la solicitud: " + response.status);
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        throw new Error("Error en la solicitud: " + error.message);
    }
}

export async function GetHistoryVis(employee, from, to) {
    try {
        const url = new URL(`${config.apiUrl}/api/Backoffice/History?employee=${employee}&from=${from }&to=${to}`);

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error("Error en la solicitud: " + response.status);
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        throw new Error("Error en la solicitud: " + error.message);
    }
}

export async function GetAgente(){
    try{
        const response =  await fetch(`${config.apiUrl}/api/Backoffice/agente`, {
          method : "GET",
          headers: {
            "Content-Type": "application/json"
          }
        })
        if (!response.ok) {
            throw new Error("Error en la solicitud: " + response.status);
        }

        const responseData = await response.json();
        return responseData;
    }
    catch (error) {
        throw new Error("Error en la solicitud: " + error.message);
    }
}

export async function CreateEmployee(data) {
        try{
            const response = await fetch(`${config.apiUrl}/api/Backoffice/agente/crear`, {
                method : "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body : JSON.stringify(data)
            })

            if(!response.ok){
                throw new Error("Error en la solicitud: " + response.status);
            }

            const responseData = await (response).json()
            return responseData
        }
        catch(error){
            throw new Error("Error en la solicitud: " + error.message);
        }
    }

    export async function GetUser() {
        try {
            const response = await fetch(`${config.apiUrl}/api/Backoffice/user`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include' 
            });
    
            if (!response.ok) {
                const errorText = await response.text();
                console.error("Error en la solicitud:", response.status, errorText);
                throw new Error(`Error en la solicitud: ${response.status} ${errorText}`);
            }
    
            const responseData = await response.json();
            return responseData;
        } catch (error) {
            console.error("Error en la solicitud:", error);
            throw new Error("Error en la solicitud: " + error.message);
        }
    }
    
    

export async function CreateUser(data){
    try{
        const response = await fetch(`${config.apiUrl}/api/Backoffice/createuser`, {
          method : "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body : JSON.stringify(data)
        })
        if(!response.ok){
          throw new Error("Error en la solicitud: " + response.status);
        }
  
        const responseData = await (response).json()
        return responseData
      }
      catch(error){
          throw new Error("Error en la solicitud: " + error.message);
      }
}

export async function UpdateUser(data, id){
   try{
      const response = await fetch(`${config.apiUrl}/api/Backoffice/update/user?id=${id}`,{
        method : "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body : JSON.stringify(data)
      })

      if(!response.ok){
        throw new Error("Error en la solicitud: " + response.status);
      }

      const responseData = await(response).json()
      return responseData
   }
   catch(error){
      throw new Error("Error en la solicitud: " + error.message);
   }    
}


export async function UpdateEmployee(data, id){
    try{
       const response = await fetch(`${config.apiUrl}/api/Backoffice/update/agente?id=${id}`,{
        method : "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body : JSON.stringify(data)
       })

       if(!response.ok){
          throw Error("Error en la solicitud: " + response.status)
       }

       const responseData = await(response).json()
       return responseData
    }
    catch(error){
        throw new Error("Error en la solicitud: " + error.message);
    }
}

export async function UpdateUserStatus(status, id){
    try{
       const response = await fetch(`${config.apiUrl}/api/Backoffice/update/status?id=${id}`,{
        method : "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(status)    
       })

       if(!response.ok){
          throw Error("Error en la solicitud: " + response.status)
       }

       const responseData = await(response).json()
       return responseData
    }
    catch(error){
        throw new Error("Error en la solicitud: " + error.message);
    }
}
   

    export async function UpdateEmployeeStatus(status, id){
        try{
           const response = await fetch(`${config.apiUrl}/api/Backoffice/update/status/employee?id=${id}`,{
            method : "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(status)    
           })
    
           if(!response.ok){
              throw Error("Error en la solicitud: " + response.status)
           }
    
           const responseData = await(response).json()
           return responseData
        }
        catch(error){
            throw new Error("Error en la solicitud: " + error.message);
        }
    }


    export async function GetCodeAccess(){
        try{
         const response = await fetch(`${config.apiUrl}/api/Backoffice/code/access`, {
            method : "GET",
            headers: {
                "Content-Type": "application/json"
            },
         })

         if(!response.ok){
            throw Error("Error en la solicitud: " + response.status)
         }
         const response_data = await response.json();
         return response_data
        }
        catch(error){
            throw new Error("Error en la solicitud: " + error.message)
        }
    }

    export async function GetCompanies(){
        try{
           const response = await fetch(`${config.apiUrl}/api/Backoffice/compnies`, {
             method : "GET",
             headers: {
                "Content-Type": "application/json"
            }
           })

           if(!response.ok){
            throw Error("Error en la solicitud: " + response.status)
           }

           const responseData = await (response).json();
           return responseData
        }
        catch(error){
            throw new Error("Error en la solicitud: " + error.message)
        }
    }

    export async function CreateCompanie(data){
        try{
           const response = await fetch(`${config.apiUrl}/api/Backoffice/create/companie`, {
             method : "POST",
             headers: {
                "Content-Type": "application/json"
            },
            body : JSON.stringify(data)
           })

           if(!response.ok){
            throw Error("Error en la solicitud: " + response.status)
           }

           const responseData = await (response).json();
           return responseData
        }
        catch(error){
            throw new Error("Error en la solicitud: " + error.message)
        }
    }
    export async function UpdateCompanie(data, id){
        try{
           const response = await fetch(`${config.apiUrl}/api/Backoffice/update/companie?id=${id}`,{
            method : "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)    
           })
    
           if(!response.ok){
              throw Error("Error en la solicitud: " + response.status)
           }
    
           const responseData = await(response).json()
           return responseData
        }
        catch(error){
            throw new Error("Error en la solicitud: " + error.message);
        }
    }





