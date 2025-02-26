import axios from "axios";
let api = axios.create({
    baseURL:"https://jsonplaceholder.typicode.com"
});


//Get the API Data
export const getData = ()=>{
    return api.get("/posts");
}

//Delete the API Data
export const deleteData=(id)=>{
    return api.delete(`/posts/${id}`);
}

//Add data
export const addData=(post)=>{
    return api.post("/posts",post)
}

//Update Data
export const putData=(id,post)=>{
    return api.put(`/posts/${id}`,post);
}