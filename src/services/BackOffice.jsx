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
