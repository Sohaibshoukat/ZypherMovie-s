import axios from "axios";

const BASE_URL ="https://api.themoviedb.org/3";

const TMBD_TOKEN=import.meta.env.VITE_APP_SMOVIX;

const headers={
    Authorization:"bearer "+TMBD_TOKEN,
}

export const FetchFromApi= async (url,params)=>{
    try{
        let {data}= await axios.get(BASE_URL+url,{
            headers,
            params,
        })
        return data;
    }
    catch(err){
        console.log(err);
        return err;
    }
}