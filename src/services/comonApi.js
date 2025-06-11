import axios from "axios"

export const comonApi=async(httpRequest,url,reqBody,reqHeader)=>{
    const reqConfig={
        method:httpRequest,
        url:url,
        data:reqBody,
        headers:reqHeader?reqHeader:{
            "content-type":"application/json"
        }
    }
    return await axios(reqConfig).then((result)=>{
        return result
    }).catch((err)=>{
        return err
    })
}