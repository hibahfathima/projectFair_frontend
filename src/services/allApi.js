import { base_url } from "./base_url"
import { comonApi } from "./comonApi"

//api to register user
export const registerApi=async(userData)=>{
    return await comonApi("POST",`${base_url}/user/register`,userData,"")
}

//api to login user

export const loginApi=async(loginData)=>{
    return await comonApi("POST",`${base_url}/user/login`,loginData,"")
}


//add project

export const addProjectApi =async(data,reqHeader)=>{
    return await comonApi("POST",`${base_url}/project/add`,data,reqHeader)
}

//to get homeProjects
export const getHomeProjectsApi=async()=>{
    return await comonApi("GET",`${base_url}/project/homeProject`,"","")
}

//get all projects
export const getAllProjectApi=async(searchKey,reqHeader)=>{
    return await comonApi("GET",`${base_url}/project/allProject?search=${searchKey}`,"",reqHeader)
}

//get user project
export const getUserProjectApi=async(reqHeader)=>{
    return await comonApi("GET",`${base_url}/project/userProject`,"",reqHeader)
}


//to update project api
export const updateProjectApi=async(projectId,reqBody,reqHeader)=>{
    return await comonApi("PUT",`${base_url}/project/edit/${projectId}`,reqBody,reqHeader)
}


//to delete project api
export const deleteProjectApi=async(projectId,reqHeader)=>{
    return await comonApi("DELETE",`${base_url}/project/delete/${projectId}`,{},reqHeader)
}

//add profile
export const updateProfileApi=async(reqBody,reqHead)=>{
    return await comonApi("PUT",`${base_url}/updateProfile`,reqBody,reqHead)
}
