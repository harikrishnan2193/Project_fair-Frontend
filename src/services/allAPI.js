import { BASE_URL } from "./baseurl"
import { commonAPI } from "./commonAPI"



//register API
export const registerAPI =async(users)=>{
    return await commonAPI('POST',`${BASE_URL}/users/register`,users,'')
}


//login API
export const loginAPI =async(users)=>{
    return await commonAPI('POST',`${BASE_URL}/users/login`,users,'')
}

//logic to add project
export const addProjectAPI = async(reqBody,reqHeader)=>{
    return await commonAPI('POST',`${BASE_URL}/project/add`,reqBody,reqHeader)
}

//homeProject
export const homeprojectAPI = async()=>{
    return await commonAPI('GET',`${BASE_URL}/project/home-project`)
}

//allProject
export const allprojectAPI = async(searchKey,reqHeader)=>{
    //quary parameter = path?key=value
    return await commonAPI('GET',`${BASE_URL}/project/all-project?search=${searchKey}`,"",reqHeader)
}

//userProject
export const userprojectAPI = async(reqHeader)=>{
    return await commonAPI('GET',`${BASE_URL}/user/allproject`,"",reqHeader)
} 

//edit project
export const editprojectAPI = async(projectId,reqBody,reqHeader)=>{
    //id is passed as path parameter
    return await commonAPI('PUT',`${BASE_URL}/project/edit/${projectId}`,reqBody,reqHeader)
} 

//delete project
export const deleteUserprojectAPI = async(projectId,reqHeader)=>{
    return await commonAPI('DELETE',`${BASE_URL}/project/remove/${projectId}`,{},reqHeader)
} 

//edit profile
export const editProfileAPI = async(reqBody,reqHeader)=>{
    //id is passed as path parameter
    return await commonAPI('PUT',`${BASE_URL}/user/edit`,reqBody,reqHeader)
}