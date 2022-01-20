

import axios from 'axios';

const URL = 'http://localhost:8000';

export const createPost = async (post) => {
    try {
        return await axios.post(`${URL}/create`,post);
    }catch(error){
        console.log('Error while calling createPost Api',error)
    }
}


export const getAllPosts = async (param) => {
    try {
        let response = await axios.get(`${URL}/posts${param}`);
        return response.data;
    }catch(error){
        console.log('Error while calling getAllPost Api',error)
    }
}

export const getPost = async (id) => {
    try {
        let response = await axios.get(`${URL}/post/${id}`);
        return response.data;
    }catch(error){
        console.log('Error while calling getPost Api',error)
    }
}

export const updatePost = async (id,post) => {
    try {
        return await axios.post(`${URL}/update/${id}`,post);
    }catch(error){
        console.log('Error while calling updatePost Api',error)
    }
}

export const deletePost = async (id) => {
    try {
        return await axios.delete(`${URL}/delete/${id}`);
    }catch(error){
        console.log('Error while calling deletePost Api',error)
    }
}

export const uploadFile = async (data) => {
    console.log(data);
    try {
        return await axios.post(`${URL}/file/upload`, data);
    } catch (error) {
        console.log('Error while calling uploadFile API ', error);
    }
}
