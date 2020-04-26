import axios from 'axios'

export const getposts = ()=>{
    const token = localStorage.getItem("token")
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return axios.get(`api/posts/list`)
}

export const getoldposts = (id)=>{
    const token = localStorage.getItem("token")
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return axios.get(`api/posts/list/`+id)
}

export const getpost =(postId)=>{
    const token = localStorage.getItem("token")
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return axios.get(`/api/posts/get?postId=${postId}`)
}
export const addpost = post =>{
    const token = localStorage.getItem("token")
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return axios.post("/api/posts/add",post)
}
export const deletepost = id =>{
    const token = localStorage.getItem("token")
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return axios.post(`/api/posts/delete/${id}`)
}

export const likepost = id =>{
    const token = localStorage.getItem("token")
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return axios.post("/api/posts/like/"+id)
}

export const dislikepost = id =>{
    const token = localStorage.getItem("token")
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return axios.post("/api/posts/dislike/"+id)
}