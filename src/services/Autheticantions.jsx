export async function LoginAuth(data) {
   try {
      const response = await fetch("http://puncher-backend.somee.com/api/Backoffice/user", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data) 
      });

      if (!response.ok) {
        throw new Error("Error en la solicitud: " + response.status);
      }

      const responseData = await response.json(); 
      return responseData;
   } catch (error) {
      throw new Error('Hubo un error en la autenticación: ' + error.message);
   }
}

export async function RegisterAuth (data){
  try {
    const response = await fetch("http://puncher-backend.somee.com/api/Authentication/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });


     if(!response.ok){
      throw new Error("Error en la solicitud: " + response.status);
     }

     const responseData = await response.json();
     return responseData
  }
   catch (error) {
   throw new Error("Error al registrarce: ", error)
  }
}
