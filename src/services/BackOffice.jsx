

export async function GetHistory(employee, from, to) {
    try {
        const url = new URL(`https://localhost:7090/api/Backoffice/History?employee=${employee}&from=${from.toISOString()}&to=${to.toISOString()}`);

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
        const response =  await fetch("https://localhost:7090/api/Backoffice/agente", {
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
            const response = await fetch("https://localhost:7090/api/Backoffice/agente/crear", {
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
        const username = '11181540'; 
        const password = '60-dayfreetrial';
        const credentials = btoa(`${username}:${password}`);
    
        try {
            const response = await fetch("http://adonimartinezb-001-site1.jtempurl.com/api/Backoffice/user", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Basic ${credentials}`
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
        const response = await fetch("https://localhost:7090/api/Backoffice/createuser", {
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
      const response = await fetch(`https://localhost:7090/api/Backoffice/update/user?id=${id}`,{
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
       const response = await fetch(`https://localhost:7090/api/Backoffice/update/agente?id=${id}`,{
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
       const response = await fetch(`https://localhost:7090/api/Backoffice/update/status?id=${id}`,{
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
           const response = await fetch(`https://localhost:7090/api/Backoffice/update/status/employee?id=${id}`,{
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
         const response = await fetch("https://localhost:7090/api/Backoffice/code/access", {
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
           const response = await fetch("https://localhost:7090/api/Backoffice/compnies", {
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
           const response = await fetch("https://localhost:7090/api/Backoffice/create/companie", {
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
           const response = await fetch(`https://localhost:7090/api/Backoffice/update/companie?id=${id}`,{
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





