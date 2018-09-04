import axios from 'axios';


//attaching a token (if exists) to every request
export function setTokenHeader(token) {
    if(token){
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
}


export function apiCall(method, path, data){
    return new Promise((resolve, reject) => { //so we can "throw" an error from the api call
                    axios[method.toLowerCase()](path, data)
                    .then( res => {
                        console.log(res);
                        return resolve(res.data);
                    })
                    .catch( err => {
                        return reject(err.response.data);
                    });
    });
}