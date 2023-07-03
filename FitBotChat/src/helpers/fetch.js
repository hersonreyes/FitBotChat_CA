// URL base para hacer las peticiones a la API
const baseUrl = 'http://localhost:8080';

// Función para hacer las peticiones a la API sin token
export const fetchWithoutToken = async(endpoint, data, method='GET') => {

    // Se crea la url con el endpoint
    const url = `${baseUrl}/${endpoint}`;

    // Si el método es GET, se hace la petición con el método GET y se retorna la respuesta en formato JSON
    if(method === 'GET'){
        const resp = await fetch(url);
        return await resp.json();
        // Si el método no es GET, se hace la petición con el método que se haya recibido y se retorna la respuesta en formato JSON
    } else{
        const resp = await fetch(url, {
            method,
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        return await resp.json();
    }
}

// Función para hacer las peticiones a la API con token
export const fetchWithToken = async(endpoint, data, method='GET') => {

    // Se crea la url con el endpoint
    const url = `${baseUrl}/${endpoint}`;
    // Se obtiene el token del local storage
    const token = localStorage.getItem('token') || '';

    // Si el método es GET, se hace la petición con el método GET y se retorna la respuesta en formato JSON
    if(method === 'GET'){
        const resp = await fetch(url, {
            headers: {
                'x-token': token
            }
        });
        return await resp.json();
        // Si el método no es GET, se hace la petición con el método que se haya recibido y se retorna la respuesta en formato JSON
    } else{
        const resp = await fetch(url, {
            method,
            headers: {
                'Content-type': 'application/json',
                'x-token': token
            },
            body: JSON.stringify(data)
        });

        return await resp.json();
    }
}