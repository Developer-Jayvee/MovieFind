import createApiConfig from '../config/axios.config.js';

export default function generateRequest(){
    const request = createApiConfig();

    async function getRequest({
        path,
        params = {},
        headers = {}
    } = {}) {

        let newParams  = {};
        if(!path){
            throw new Error("Path is required for GET request");
        }
        const apiClient = await request.get(path, {
            params: { ...params },
            headers:{
                ...headers
            }
        });
        return apiClient;
    }
    
    return {
        getRequest
    }
}