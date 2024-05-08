export async function GetHistory() {
    try {
        const response = await fetch("https://localhost:7090/api/Backoffice/History", {
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
