export async function AccessAgent(data) {
    try {
        const response = await fetch("https://puncher-backend.somee.com/api/Main/access", {
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
        throw new Error("Error al enviar la solicitud: " + error.message);
    }
}
