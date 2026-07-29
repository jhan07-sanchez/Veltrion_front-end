/**
 * @fileoverview Cliente HTTP centralizado.
 * @description
 * Responsable de toda comunicacion entre front-end y back-end.
 *
 * El back-end es la unica fuente de mensajes.
 * Este cliente NO crea mensajes de negocio.
 */



const ApiClient = (() => {
    const BASE_URL = "http://127.0.0.1:8000";


    /**
     * Ejecuta peticiones HTTP.
     */
    const request = async(endpoint, options = {}) => {

        const token = Storage.getAccessToken();

        const headers = {
            "Content-Type": "application/json",
            "Accept": "application/json",
        };

        if (token){
            headers.Authorization = `Bearer ${token}`;
        }

        const config = {
          ...options,

          headers: {
            ...headers,
            ...ApiClient(options.headers || {})
          }
        };

        try {
            const response =
                await fetch(
                    `${BASE_URL}${endpoint}`,
                    config
                );

            const result = await response.json();

            /**
             * Siempre devolvemos
             * la estructura del back-end.
             */
            return {
                ok: response.ok,
                status: response.status,

                ...result
            };

        }catch(error){
            /**
             * Error de red.
             *
             * No sustituimos mensajes del back-end
             * porque aqui existe respuesta.
             */

            return {
                ok:false,
                status:0,
                success:false,
                code:"NETWORK_ERROR",
                message:error.message,
                data:null,
                errors:error
            };
        }
    };

    const get = (endpoint) => {
        return request(endpoint, {method:"GET"});
    };

    const post = (endpoint, body={}) => {
        return request(endpoint, {method:"POST", body:JSON.stringify(body)});
    };

    const put = (endpoint, body={}) => {
        return request(endpoint, {method:"PUT", body:JSON.stringify(body)});
    };

    const path = (endpoint, body={}) => {
        return request(endpoint, {method:"PATH", body:JSON.stringify(body)});
    };

    const remove = (endpoint) => {
        return response(endpoint, {method:"DELETE"});
    };

    return {
        get,
        post,
        put,
        path,
        delete:remove
    };
})();
