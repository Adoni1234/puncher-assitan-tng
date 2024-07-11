import config from "../config";

export async function AccessAgent(data) {
    try {
        const response = await fetch(`${config.apiUrl}/api/Main/access`, {
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
        console.error("Error al enviar la solicitud:", error.message);
        return { error: true, message: error.message, status: error.status || 500 };
    }
}
