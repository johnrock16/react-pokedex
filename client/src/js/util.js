export const getRequest=(url,{params={},headers={}}={})=>{
    return fetch(url+'?'+queryString(params),{
        method:'GET',
        // mode:'cors',
        headers:{
            'content-type':'application/json',
            'accept':'application/json',
            // 'Access-Control-Allow-Origin':'http://localhost:8000/',
            ...headers
        }
    }).catch((e)=>{
        console.log(e);
    })
}

export const resolveFetch= async(resolve,format='json')=>{
    if(resolve?.status===200 || resolve?.status===304){
        const result = await resolve[format]();
        return {result};
    }
    return {status:resolve.status, error:'error on resolve'}
}

export const queryString =(params)=> Object.keys(params).map((key) => {
    return encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
}).join('&');

export const validateCEP=(cep)=>{
   const regex=/[0-9]{5}-[\d]{3}/g;
   return regex.test(cep); 
}