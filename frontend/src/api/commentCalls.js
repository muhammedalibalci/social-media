import axios from "axios"


export const getcomments = (postId)=>{
    return axios.get(`/api/comments/list/${postId}`)
}

export const addcomment = (comment,postId)=>{
    return axios.post(`/api/comments/add/${postId}`,comment)
}