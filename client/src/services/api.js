import axios from 'axios';


export function apiCall(method, path, data){
    return new Promise((resolve, reject) => { //so we can "throw" an error from the api call
            axios[method](path, data)
            .then( res => {
                console.log(res);
                return resolve(res.data);
            })
            .catch( err => {
                //console.log(err.response);
                return reject(err.response.data);
            })
    })
}