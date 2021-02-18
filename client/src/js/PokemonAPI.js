import { getRequest, resolveFetch } from "./util";

const POKEMON_API='http://localhost:3000';

export const searchAPI = async(textUrl,params={},headers)=>{
    const url=`${POKEMON_API}${textUrl}`;
    const resolve= await getRequest(url,{params,headers});
    const result = await resolveFetch(resolve);
    return result;
}