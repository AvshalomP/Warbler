import axios from 'axios';


export function apiCall(method, path, data){
    return axios[method](path, data)
            .then( res => {
                console.log(res);
                return res;
                //return resolve(res.data);
            })
            .catch( err => {
                console.log(err);
                //return reject(err.response.data.error);
            })
}