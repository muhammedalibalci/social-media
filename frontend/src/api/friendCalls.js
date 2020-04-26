import axios from "axios"



export const getFriendsOfUser = (id)=>{
    const token = localStorage.getItem("token")
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return axios.get(`/api/friends/get?id=${id}`)
}

export const follow = (id)=>{
    const token = localStorage.getItem("token")
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return axios.post("/api/friends/follow/"+id)
}

export const getUsersWithoutFriends = (id)=>{
    const token = localStorage.getItem("token")
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return axios.get("/api/friends/list/"+id);
}