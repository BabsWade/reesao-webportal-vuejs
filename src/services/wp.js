// src/services/wp.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://reesao.org/wp-json/wp/v2",
});

export const getPosts = () => api.get("/posts");
export const getPost = (id) => api.get(`/posts/${id}`);