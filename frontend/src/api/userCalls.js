import axios from 'axios'


export const getuser = (username) =>{
    const token = localStorage.getItem("token")
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return axios.get(`/api/users/get?username=${username}`)
}
export const getuserwithfollowers = (username) =>{
    const token = localStorage.getItem("token")
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return axios.get(`/api/users/getfollowers?username=${username}`)
}

export const getusers = ()=>{
    return axios.get("/api/users/list");
}


export const updateuser =(user) =>{
    return axios.post(`/api/users/update`,user)
}
export const signup = (user)=>{
    return axios.post("/api/auth/sign-up",user)
}

export const login= (user) =>{
    return axios.post("/api/auth/login",user)
}

